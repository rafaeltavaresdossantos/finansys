import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

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
  serverErrorMessages: string[] = [];
  submittingForm: boolean = false;
  category: Category = new Category();


  constructor(
    private categoryservice: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
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

}
