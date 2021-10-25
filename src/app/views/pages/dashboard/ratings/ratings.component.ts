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

  value = 0;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  rtg: string;

  record: RecordInt;

  constructor(public dialog: MatDialog,
              public alertService: AlertService,
              public ratingsService: RatingsService,
              private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.ratingsService.getRatings().subscribe(resp => {
      this.records = resp.records;
      this.dataSource = this.records;
      for (const element of this.dataSource) {
        element.rating = Number(element.rating);
      }
    }, error => {
      console.error(error);
      this.alertService.errorDialog('Ocurrió un error inesperado');
    });

    this.firstFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
    this.secondFormGroup = this.formBuilder.group({
      movie: ['', Validators.required],
      rating: ['', Validators.required]
    });

    this.ratingsService.getMovies().subscribe(resp => {
      this.movies = resp.movies;
    }, error => {
      console.error(error);
      this.alertService.errorDialog('Ocurrió un error inesperado');
    });
  }

  invalidField(field: string): boolean {
    return this.firstFormGroup.get(field)?.invalid
      && this.firstFormGroup.get(field)?.touched;
  }

  get errorNameMsg(): string {
    const errors = this.firstFormGroup.get('name')?.errors;
    if ( errors?.required ) {
      return 'Este campo es obligatorio';
    } else if ( !(errors?.minLength < 2) ) {
      return 'Mínimo 2 caracteres';
    }
  }

  get errorEmailMsg(): string {
    const errors = this.firstFormGroup.get('email')?.errors;
    if ( errors?.required ) {
      return 'Este campo es obligatorio';
    } else if ( errors?.pattern ) {
      return 'Email inválido';
    }
  }

  filter(selectedRtg): any {
    this.ratingsService.getRatings(selectedRtg).subscribe(resp => {
      this.records = resp.records;
      this.dataSource = this.records;
      for (const element of this.dataSource) {
        element.rating = Number(element.rating);
      }
    }, error => {
      console.error(error);
      this.alertService.errorDialog('Ocurrio un error inesperado');
    });
  }

  createRecord(): any {
    this.rtg = this.value.toString();
    const newRec: RatingCls = {
      name : this.firstFormGroup.getRawValue().name,
      email : this.firstFormGroup.getRawValue().email,
      movie : this.secondFormGroup.getRawValue().movie.title,
      rating : this.rtg
    };
    this.ratingsService.saveRating(newRec).subscribe((resp) => {
      this.record = resp.record;
      const upRecords = [...this.dataSource];
      upRecords.push(this.record);
      this.dataSource = upRecords;
      this.alertService.tryToRegister('Se ha registrado correctamente su calificación', 'success');
      this.isLinear = false;
    }, error => {
      console.error(error);
      this.alertService.tryToRegister('La puntuación mínima es 1, vuelva a intentarlo', 'error');
    });
  }

  editRating(element): void {
    element.rating = element.rating.toString();
    const dialogRef = this.dialog.open(FormRatingComponent, {
      width: '300px',
      data: {
        recordInt: element
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.record = result;
        console.log(this.record._id);
        const newRecords = [...this.dataSource];
        newRecords[newRecords.findIndex(el => el.id === this.record._id)] = this.record;
        this.dataSource = newRecords;
        this.alertService.tryToRegister('Se ha registrado correctamente su nueva calificación', 'success');
      } else {
        this.alertService.tryToRegister('Se ha cancelado la edición del registro', 'warning');
      }
    });
  }

  valueChange(): any {
  }

  submitFirstFormGroup(): any {
    this.firstFormGroup.markAllAsTouched();
    this.isLinear = false;
  }

  submitSecondFormGroup(): any {
    this.secondFormGroup.markAllAsTouched();
  }
}
