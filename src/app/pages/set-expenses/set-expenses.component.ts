import { Component } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { SetExpenseService } from './shared/set-expense.service';
import { SetExpense } from './shared/set-expenses.model';

@Component({
  selector: 'app-set-expenses',
  templateUrl: './set-expenses.component.html',
  styleUrls: ['./set-expenses.component.scss']
})
export class SetExpensesComponent extends BaseResourceListComponent<SetExpense> {

  constructor(
    protected setExpenseService: SetExpenseService
  ) { super(setExpenseService) }

}
