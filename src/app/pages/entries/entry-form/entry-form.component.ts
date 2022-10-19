import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import * as toaster from 'toastr';
import { PrimeNGConfig } from 'primeng/api'
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

@Component({
  selector: 'app-Entry-form',
  templateUrl: './Entry-form.component.html',
  styleUrls: ['./Entry-form.component.scss']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currencyAction: string = '';
  entryForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl('')
  });
  pageTitle: string = '';
  serverErrorMessages: string[] | null = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry();

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '.',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  }

  optionTypes = [{value: 'revenue', text: 'Receita'}, {value: 'expense', text: 'Despesa'}];
  categories: Category[] = [];


    ptBr = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
    private entryservice: EntryService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private primeNgConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
    this.setLangBr();
    this.loadCategories();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;
    if(this.currencyAction == 'new') {
      this.createEntry();
    }
    else{
      this.updateEntry();
    }
  }



  // Private

  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == 'new') {
      this.currencyAction = 'new'
    }else {
      this.currencyAction = 'edit'
    }
  }

  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id:[null],
      name:[null, [Validators.required, Validators.minLength(2)]],
      description:[null],
      type:['expense', [Validators.required]],
      amount:[null, [Validators.required]],
      date:[null, [Validators.required]],
      paid:[true, [Validators.required]],
      categoryId:[null, [Validators.required]],
    })
  }
  private loadEntry(){
    if(this.currencyAction == 'edit'){
      this.route.paramMap.pipe(
        switchMap(params => this.entryservice.getById(+params.get('id')!))

      )
      .subscribe(entry => {
        this.entry = entry;
        this.entryForm.patchValue(entry);
      },
      (erro) => alert('Ocorreu um erro no servidor, tente mais tarde!')
      )
    }
  }

  private setPageTitle(){
    if(this.currencyAction == 'new'){
      this.pageTitle = 'Cadastro de Novo Lançamento'
    }else {
      this.pageTitle = `Editando Lançamento ${this.entry.name || ''}`
    }
  }

  private createEntry(){
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryservice.create(entry)
      .subscribe(
        Entry => this.actionForSuccess(Entry),
        error => this.actionForError(error)
      )
  }
  private updateEntry(){
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryservice.update(entry)
    .subscribe(
      Entry => this.actionForSuccess(Entry),
      error => this.actionForError(error)
    )
  }
  private actionForSuccess(entry: Entry){
    toaster.success('Solicitação processada com sucesso!');
    // redirect/reload component page
    this.router.navigateByUrl('entries', {skipLocationChange: true}).then(
      () => this.router.navigate(['entries', entry.id, 'edit'])
    )
  }
  private actionForError(erro: any) {
    toaster.error('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false;
    if(erro.status === 422){
      this.serverErrorMessages= JSON.parse(erro._body).errors;
    }else {
      this.serverErrorMessages = ['falha na comunicação com o servidor, por favor tente mais tarde!'];
    }
  }

  private setLangBr(){
    this.primeNgConfig.setTranslation(this.ptBr);
  }

  private loadCategories(){
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      erro => console.log(erro)
    )
  }

}
