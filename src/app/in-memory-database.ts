import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      { id: 1, name: 'Moradia', description: 'Pagamentos de contas da Casa' },
      { id: 2, name: 'Saúde', description: 'Plano de saúde e Remédios' },
      { id: 3, name: 'Lazer', description: 'Shopping, Bares, fastfood, etc' },
      { id: 4, name: 'Salário', description: 'Recebimento de Salário' },
      { id: 5, name: 'Pic Pay', description: 'Rendimentos Pic Pay' },
      { id: 6, name: 'Nubank', description: 'Rendimentos Nubank' },
    ];

    const entries: Entry[] = [
      {
        id: 1,
        name: 'Cartão de credito',
        categoryId: categories[0].id,
        category: categories[0],
        paid: true,
        date: '14/10/2022',
        amount: '55,00',
        type: 'expense',
        description: 'teste',
      } as Entry,
      {
        id: 2,
        name: 'Academia',
        categoryId: categories[1].id,
        category: categories[1],
        paid: true,
        date: '14/10/2022',
        amount: '55,00',
        type: 'expense',
        description: 'teste',
      } as Entry,
      {
        id: 3,
        name: 'Banho e tosa TeyTey',
        categoryId: categories[2].id,
        category: categories[2],
        paid: true,
        date: '14/10/2022',
        amount: '55,00',
        type: 'expense',
        description: 'teste',
      } as Entry,
      {
        id: 4,
        name: 'Corte de Cabelo',
        categoryId: categories[3].id,
        category: categories[3],
        paid: true,
        date: '14/10/2022',
        amount: '55,00',
        type: 'expense',
        description: 'teste',
      } as Entry,
      {
        id: 5,
        name: 'Manicure Karina',
        categoryId: categories[4].id,
        category: categories[4],
        paid: true,
        date: '14/10/2022',
        amount: '55,00',
        type: 'expense',
        description: 'teste',
      } as Entry,
      {
        id: 6,
        name: 'Gasolina',
        categoryId: categories[5].id,
        category: categories[5],
        paid: true,
        date: '14/10/2022',
        amount: '55,00',
        type: 'expense',
        description: 'teste',
      } as Entry,
      {
        id: 8,
        name: 'Cesta Básica Elza',
        categoryId: categories[3].id,
        category: categories[3],
        paid: false,
        date: '14/10/2022',
        amount: '55,00',
        type: 'expense',
        description: 'teste',
      } as Entry,
      {
        id: 9,
        name: 'Faxina Elza',
        categoryId: categories[2].id,
        category: categories[2],
        paid: true,
        date: '14/10/2022',
        amount: '55,00',
        type: 'revenue',
        description: 'teste',
      } as Entry,
      {
        id: 10,
        name: 'Curso Karina',
        categoryId: categories[1].id,
        category: categories[1],
        paid: true,
        date: '14/10/2022',
        amount: '55,00',
        type: 'expense',
        description: 'teste',
      } as Entry,
    ];

    return { categories, entries };
  }
}
