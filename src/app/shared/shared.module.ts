import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { IMaskModule } from 'angular-imask';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IMaskModule

  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    IMaskModule
  ]
})
export class SharedModule { }
