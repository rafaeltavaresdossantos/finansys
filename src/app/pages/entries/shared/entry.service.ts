import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import { map, mergeMap, Observable } from 'rxjs';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class EntryService extends BaseResourceService<Entry> {
  constructor(
    private categoryService: CategoryService,
    protected override injector: Injector
  ) {
    super('api/entries', injector, Entry.fromJson);
  }

  //realiza duas chamadas e retorna apenas um observable
  override create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId!).pipe(
      mergeMap((category) => {
        entry.category = category;

        return super.create(entry);
      })
    );
  }

  override update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId!).pipe(
      mergeMap((category) => {
        entry.category = category;

        return super.update(entry);
      })
    );
  }

  getByMonthandYear(month: number, year: number) : Observable<Entry[]> {
    return this.getAll().pipe(
      map((entries) => this.filterByMonthandYear(entries, month, year))
    )
  }

  private filterByMonthandYear(entries: Entry[], month: number, year: number) {
    return entries.filter(entry => {
      const entryDate = moment(entry.date, "DD/MM/YYYY");
      const monthMatches = entryDate.month() + 1 == month;
      const yearMatches = entryDate.year() == year;
      if(monthMatches && yearMatches) return entry
      return null
    })
  }

}
