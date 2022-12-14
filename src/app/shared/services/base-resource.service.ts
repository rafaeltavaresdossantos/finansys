import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BaseResourceModel } from "../models/base-resource.model";

export abstract class BaseResourceService<T extends BaseResourceModel>{

  protected http: HttpClient

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
    ){
      this.http = injector.get(HttpClient);
    }

  getAll(): Observable<T[]> {
    return this.http
      .get(this.apiPath)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToResources.bind(this)));
  }

  getById(id: number): Observable<T> {
    return this.http
      .get(`${this.apiPath}/${id}`)
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError));
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath,resource)
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      )
  }

  update(resource: T): Observable<T>{
    return this.http.put(`${this.apiPath}/${resource.id}`, resource)
      .pipe(
        map(()=> resource),
        catchError(this.handleError)
      )
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.apiPath}/${id}`)
    .pipe(
      map(() => null),
      catchError(this.handleError)

    )
  }

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach((element) => resources.push(this.jsonDataToResourceFn(element)));
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.error('ERRO NA REQUISIÇÃO =>', error);
    return throwError(() => error);
  }

}
