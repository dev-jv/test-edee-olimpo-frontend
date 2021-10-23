import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../../../data/services/alert.service';
import { RatingsService } from '../../../../core/services/ratings.service';
import { FormRatingComponent } from '../../../components/form-rating/form-rating.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieCls } from '../../../../data/schema/movie.model';
import { RatingCls } from '../../../../data/schema/rating.model';
import {RecordInt} from '../../../../data/schema/record.model';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  displayedColumns: string[] = ['codeRecord', 'name', 'email', 'movie', 'rating', 'edit'];

  dataSource: any;
  records: RatingCls[] = [];

  movies: MovieCls[] = [];
  selected = new MovieCls();

  value: number;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  record: RecordInt;

  constructor(public dialog: MatDialog,
              public alertService: AlertService,
              public ratingsService: RatingsService,
              private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.ratingsService.getRatings().subscribe(resp => {
      console.log(resp);
      this.records = resp.records;
      this.dataSource = this.records;
      for (const element of this.dataSource) {
        element.rating = Number(element.rating);
      }
      console.log(this.dataSource);

    }, error => {
      console.error(error);
      // this.alertService.errorDialog('Ocurrio un error inesperado');
    });

    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      movie: ['', Validators.required],
      rating: ['', Validators.required]
    });

    this.ratingsService.getMovies().subscribe(resp => {
      console.log(resp.movies);
      this.movies = resp.movies;

    }, error => {
      console.error(error);
      // this.alertService.errorDialog('Ocurrio un error inesperado');
    });
  }

  filter(selectedRtg) {
    console.log('selectedRtg: ', selectedRtg);
    this.ratingsService.getRatings(selectedRtg).subscribe(resp => {
      console.log(resp);
      this.records = resp.records;
      this.dataSource = this.records;

      for (const element of this.dataSource) {
        element.rating = Number(element.rating);
      }
      console.log(this.dataSource);

    }, error => {
      console.error(error);
      // this.alertService.errorDialog('Ocurrio un error inesperado');
    });
  }

  createRecord() {
    const rtg = this.value.toString();
    const newRec: RatingCls = {
      name : this.firstFormGroup.getRawValue().name,
      email : this.firstFormGroup.getRawValue().email,
      movie : this.secondFormGroup.getRawValue().movie.title,
      rating : rtg
    };
    // console.log('newRec', newRec);
    this.ratingsService.saveRating(newRec).subscribe((resp) => {
      console.log(resp);
      this.record = resp.record; // ... Pending > error
      const upRecords = [...this.dataSource];
      upRecords.push(this.record);
      this.dataSource = upRecords;
      this.alertService.tryToRegister('Se ha registrado correctamente su calificación', 'success');
    }, error => {
      console.error(error);
      this.alertService.tryToRegister('Verifique sus datos y vuelva a intentarlo', 'error');
    });
  }

  editRating(element) {
    // console.log(element);
    element.rating = element.rating.toString();
    console.log(element);
    const dialogRef = this.dialog.open(FormRatingComponent, {
      width: '500px',
      data: {
        recordInt: element
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.alertService.tryToRegister('Se ha registrado correctamente su nueva puntuación', 'success');
      this.record = result;
      console.log(this.record._id);
      const newRecords = [...this.dataSource];
      newRecords[newRecords.findIndex(el => el.id === this.record._id)] = this.record;
      this.dataSource = newRecords;
    });
  }

  valueChange() {
    console.log(this.value);
  }

  test() {
    console.log(this.selected);
  }

}
