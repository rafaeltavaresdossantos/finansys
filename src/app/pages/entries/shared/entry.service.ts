import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entry } from './entry.model';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private apiPath: string = 'api/entries';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Entry[]> {
    return this.http
      .get(this.apiPath)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntries));
  }

  getById(id: number): Observable<Entry> {
    return this.http
      .get(`${this.apiPath}/${id}`)
      .pipe(
        map(this.jsonDataToentry),
        catchError(this.handleError));
  }

  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath,entry)
      .pipe(
        map(this.jsonDataToentry),
        catchError(this.handleError)
      )
  }

  update(entry: Entry): Observable<Entry>{
    return this.http.put(`${this.apiPath}/${entry.id}`, entry)
      .pipe(
        catchError(this.handleError),
        map(()=> entry)
      )
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.apiPath}/${id}`)
    .pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach((element) => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });
    return entries;
  }

  private jsonDataToentry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  private handleError(error: any): Observable<any> {
    console.error('ERRO NA REQUISIÇÃO =>', error);
    return throwError(() => error);
  }
}