import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetExpenseFormComponent } from './set-expense-form/set-expense-form.component';
import { SetExpensesComponent } from './set-expenses.component';

const routes: Routes = [
  {path: '', component: SetExpensesComponent},
  {path: 'new', component: SetExpenseFormComponent},
  {path: ':id/edit', component: SetExpenseFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetExpensesRoutingModule { }
