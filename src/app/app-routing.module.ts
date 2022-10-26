import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/set-expenses', pathMatch: 'full'},

  { path: 'set-expenses', loadChildren: () => import('./pages/set-expenses/set-expenses.module').then((m) => m.SetExpensesModule)},
  { path: 'expense/:id/categories', loadChildren: () => import('./pages/categories/categories.module').then((m) => m.CategoriesModule)},
  { path: 'expense/:id/entries', loadChildren: () => import('./pages/entries/entries.module').then((m) => m.EntriesModule)},
  { path: 'expense/:id/reports', loadChildren: () => import('./pages/reports/reports.module').then((m) => m.ReportsModule)},


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
