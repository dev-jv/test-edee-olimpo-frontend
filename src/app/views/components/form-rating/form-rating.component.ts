import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RatingsService } from '../../../core/services/ratings.service';
import { AlertService } from '../../../data/services/alert.service';
import { RecordInt } from '../../../data/schema/record.model';

export interface DialogData {
  isEdit: boolean;
  recordInt: RecordInt;
}

@Component({
  selector: 'app-form-rating',
  templateUrl: './form-rating.component.html',
  styleUrls: ['./form-rating.component.css']
})
export class FormRatingComponent implements OnInit {

  ratings = [
    '1', '2', '3', '4', '5'
  ];

  record: FormGroup;

  constructor(public formBuild: FormBuilder,
              public dialogRef: MatDialogRef<FormRatingComponent>,
              public ratingsService: RatingsService,
              public alertService: AlertService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  ngOnInit(): void {
    this.record = this.formBuild.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      movie: ['', Validators.required],
      rating: ['', Validators.required],
    });
    this.loadDataToEdit();
  }

  loadDataToEdit(): void {
    this.record.setValue({
      name: this.data.recordInt.name,
      email: this.data.recordInt.email,
      movie: this.data.recordInt.movie,
      rating: this.data.recordInt.rating,
    });
  }

  UpdRating() {
    this.data.recordInt.rating = this.record.getRawValue().rating;
    console.log('data', this.data.recordInt);
    this.ratingsService.updateRating(this.data.recordInt).subscribe((resp) => {
      console.log(resp);
      this.dialogRef.close(resp.record);
    }, error => {
      console.error(error);
      // this.alertService.errorDialog(error.error.message);
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
