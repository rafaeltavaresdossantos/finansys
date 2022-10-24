import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { IMaskModule } from 'angular-imask';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { FormControlPipe } from './pipes/form-control.pipe';



@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    FormControlPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IMaskModule,
    RouterModule,


  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    IMaskModule,
    BreadCrumbComponent,
    RouterModule,
    PageHeaderComponent,
    FormFieldErrorComponent,
    FormControlPipe
  ]
})
export class SharedModule { }
