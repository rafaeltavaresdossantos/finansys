import { Component, Injector} from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { SetExpenseService } from '../shared/set-expense.service';
import { SetExpense } from '../shared/set-expenses.model';

@Component({
  selector: 'app-set-expense-form',
  templateUrl: './set-expense-form.component.html',
  styleUrls: ['./set-expense-form.component.scss']
})
export class SetExpenseFormComponent extends BaseResourceFormComponent<SetExpense> {

  constructor(
    protected setExpenseService: SetExpenseService,
    protected override injector: Injector
  ) {
    super(injector, new SetExpense(), setExpenseService, SetExpense.fromJson);
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      cpfCnpj: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
    });
  }

  protected override createPageTitle(): string{
    return 'Cadastro de Cenário';
  }

  protected override editionPageTitle(): string {
    return `Editando Cenário: ${this.resource.name || ''}`
  }

}
