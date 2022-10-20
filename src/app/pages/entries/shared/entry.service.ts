import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import { mergeMap, Observable } from 'rxjs';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root',
})
export class EntryService extends BaseResourceService<Entry> {
  constructor(
    private categoryService: CategoryService,
    protected override injector: Injector
  ) {
    super('api/entries', injector);
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

  protected jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach((element) => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });
    return entries;
  }

  protected jsonDataToentry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }
}
