import {
  OnInit,
  AfterContentChecked,
  Injector,
  Component,
  Directive,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import * as toaster from 'toastr';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked
{
  currencyAction: string = '';
  resourceForm!: FormGroup;
  pageTitle: string = '';
  serverErrorMessages: string[] | null = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currencyAction == 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  // Private
  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') {
      this.currencyAction = 'new';
    } else {
      this.currencyAction = 'edit';
    }
  }

  protected abstract buildResourceForm(): void;

  protected loadResource() {
    if (this.currencyAction == 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) =>
            this.resourceService.getById(+params.get('id')!)
          )
        )
        .subscribe(
          (resource) => {
            this.resource = resource;
            this.resourceForm.patchValue(resource);
          },
          (erro) => alert('Ocorreu um erro no servidor, tente mais tarde!')
        );
    }
  }

  protected setPageTitle() {
    if (this.currencyAction == 'new') {
      this.pageTitle = this.createPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected createPageTitle(): string {
    return 'Novo';
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.create(resource).subscribe(
      (resource) => this.actionForSuccess(resource),
      (error) => this.actionForError(error)
    );
  }
  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.update(resource).subscribe(
      (resource) => this.actionForSuccess(resource),
      (error) => this.actionForError(error)
    );
  }
  protected actionForSuccess(resource: T) {
    toaster.success('Solicitação processada com sucesso!');
    const baseComponentPath: string  = this.route.snapshot.parent?.url[0].path || '';

    // redirect/reload component page
    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() =>
        this.router.navigate([baseComponentPath, resource.id, 'edit'])
      );
  }
  protected actionForError(erro: any) {
    toaster.error('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false;
    if (erro.status === 422) {
      this.serverErrorMessages = JSON.parse(erro._body).errors;
    } else {
      this.serverErrorMessages = [
        'falha na comunicação com o servidor, por favor tente mais tarde!',
      ];
    }
  }
}
