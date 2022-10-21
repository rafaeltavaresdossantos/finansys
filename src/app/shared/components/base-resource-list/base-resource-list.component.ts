import { Directive, OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];
  constructor(
    private resourceService: BaseResourceService<T>
  ) { }

  ngOnInit(): void {
    this.resourceService.getAll().subscribe((resources: T[]) => {
      this.resources = resources
    },
    erro => {
      console.error(erro);
    }
    )
  }
  deleteResource(resource: T) : void {

    const mustDelete = confirm(`Confirma a exclusão da categoria`);
    if(mustDelete){
      this.resourceService.delete(resource.id!).subscribe(
        () => this.resources = this.resources.filter(element => element !== resource),
        () => alert('Erro ao tentar excluir!')
      )
    }
  }
}
