import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { PrimeNGConfig } from 'primeng/api';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-Entry-form',
  templateUrl: './Entry-form.component.html',
  styleUrls: ['./Entry-form.component.scss'],
})
export class EntryFormComponent
  extends BaseResourceFormComponent<Entry>
  implements OnInit
{

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '.',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ',',
  };

  optionTypes = [
    { value: 'revenue', text: 'Receita' },
    { value: 'expense', text: 'Despesa' },
  ];
  categories: Category[] = [];

  ptBr = {
    firstDayOfWeek: 0,
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    today: 'Hoje',
    clear: 'Limpar',
  };

  constructor(
    protected entryservice: EntryService,
    protected categoryService: CategoryService,
    protected override injector: Injector,
    private primeNgConfig: PrimeNGConfig
  ) {
    super(injector, new Entry(), entryservice, Entry.fromJson);
  }

  override ngOnInit(): void {
    this.setLangBr();
    this.loadCategories();
    super.ngOnInit();
  }

  // Private

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

  private setLangBr() {
    this.primeNgConfig.setTranslation(this.ptBr);
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe(
      (categories) => (this.categories = categories),
      (erro) => console.log(erro)
    );
  }
  protected override createPageTitle(): string{
    return 'Cadastro de Novo Lançamento';
  }

  protected override editionPageTitle(): string {
    return `Editando Lançamento: ${this.resource.name || ''}`
  }
}
