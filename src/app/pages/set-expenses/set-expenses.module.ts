import { NgModule } from '@angular/core';
import { SetExpensesRoutingModule } from './set-expenses-routing.module';

import { SetExpenseFormComponent } from './set-expense-form/set-expense-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetExpensesComponent } from './set-expenses.component';


@NgModule({
  declarations: [
    SetExpensesComponent,
    SetExpenseFormComponent
  ],
  imports: [
    SetExpensesRoutingModule,
    SharedModule
  ]
})
export class SetExpensesModule { }
