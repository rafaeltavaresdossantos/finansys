import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';

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

    return { categories };
  }
}
