import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import * as toaster from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currencyAction: string = '';
  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl('')
  });
  pageTitle: string = '';
  serverErrorMessages: string[] | null = null;
  submittingForm: boolean = false;
  category: Category = new Category();


  constructor(
    private categoryservice: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;
    if(this.currencyAction == 'new') {
      this.createCategory();
    }
    else{
      this.updateCategory();
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

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id:[null],
      name:[null, [Validators.required, Validators.minLength(2)]],
      description:[null]
    })
  }
  private loadCategory(){
    if(this.currencyAction == 'edit'){
      this.route.paramMap.pipe(
        switchMap(params => this.categoryservice.getById(+params.get('id')!))

      )
      .subscribe(category => {
        this.category = category;
        this.categoryForm.patchValue(category);
      },
      (erro) => alert('Ocorreu um erro no servidor, tente mais tarde!')
      )
    }
  }

  private setPageTitle(){
    if(this.currencyAction == 'new'){
      this.pageTitle = 'Cadastro de Nova Categoria'
    }else {
      this.pageTitle = `Editando Categoria ${this.category.name || ''}`
    }
  }

  private createCategory(){
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryservice.create(category)
      .subscribe(
        category => this.actionForSuccess(category),
        error => this.actionForError(error)
      )
  }
  private updateCategory(){
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryservice.update(category)
    .subscribe(
      category => this.actionForSuccess(category),
      error => this.actionForError(error)
    )
  }
  private actionForSuccess(category: Category){
    toaster.success('Solicitação processada com sucesso!');
    // redirect/reload component page
    this.router.navigateByUrl('categories', {skipLocationChange: true}).then(
      () => this.router.navigate(['categories', category.id, 'edit'])
    )
  }
  private actionForError(erro: any) {
    toastr.error('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false;
    if(erro.status === 422){
      this.serverErrorMessages= JSON.parse(erro._body).errors;
    }else {
      this.serverErrorMessages = ['falha na comunicação com o servidor, por favor tente mais tarde!'];
    }
  }

}
