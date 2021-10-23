import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingsRoutingModule } from './ratings-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RatingsComponent } from './ratings.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { SvStarRatingModule } from 'sv-star-rating';

@NgModule({
  declarations: [ RatingsComponent ],
  imports: [
    CommonModule,
    RatingsRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatSelectModule,
    SvStarRatingModule
  ]
})
export class RatingsModule { }
