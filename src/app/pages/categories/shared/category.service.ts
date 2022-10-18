import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiPath: string = 'api/categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http
      .get(this.apiPath)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategories));
  }

  getById(id: number): Observable<Category> {
    return this.http
      .get(`${this.apiPath}/${id}`)
      .pipe(
        map(this.jsonDataToCategory),
        catchError(this.handleError));
  }

  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath,category)
      .pipe(
        map(this.jsonDataToCategory),
        catchError(this.handleError)
      )
  }

  update(category: Category): Observable<Category>{
    return this.http.put(`${this.apiPath}/${category.id}`, category)
      .pipe(
        catchError(this.handleError),
        map(()=> category)
      )
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.apiPath}/${id}`)
    .pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach((element) => categories.push(element as Category));
    return categories;
  }

  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }

  private handleError(error: any): Observable<any> {
    console.error('ERRO NA REQUISIÇÃO =>', error);
    return throwError(() => error);
  }
}
