import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { IMaskModule } from 'angular-imask';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IMaskModule,
    RouterModule

  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    IMaskModule,
    BreadCrumbComponent,
    RouterModule
  ]
})
export class SharedModule { }
