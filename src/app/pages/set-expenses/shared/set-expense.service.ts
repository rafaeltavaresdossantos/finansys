import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { SetExpense } from './set-expenses.model';

@Injectable({
  providedIn: 'root',
})
export class SetExpenseService extends BaseResourceService<SetExpense> {
  constructor(protected override injector: Injector) {
    super('api/setExpenses', injector, SetExpense.fromJson);
  }
}
