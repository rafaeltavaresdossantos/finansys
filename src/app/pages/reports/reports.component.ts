import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../categories/shared/category.model';
import { CategoryService } from '../categories/shared/category.service';
import { Entry } from '../entries/shared/entry.model';
import { EntryService } from '../entries/shared/entry.service';
import * as currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  reportsForm!: FormGroup;
  monthsList = [
    { value: '1', name: 'Janeiro' },
    { value: '2', name: 'Fevereiro' },
    { value: '3', name: 'Março' },
    { value: '4', name: 'Abril' },
    { value: '5', name: 'Maio' },
    { value: '6', name: 'Junho' },
    { value: '7', name: 'Julho' },
    { value: '8', name: 'Agosto' },
    { value: '9', name: 'Setembro' },
    { value: '10', name: 'Outubro' },
    { value: '11', name: 'Novembro' },
    { value: '12', name: 'Dezembro' },
  ];

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;
  expenseChartData: any;
  revenueChartData: any;


  chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtzero: true,
          },
        },
      ],
    },
  };

  categories: Category[] = [];
  entries: Entry[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private categoryservice: CategoryService,
    private entryService: EntryService
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.categoryservice.getAll().subscribe(categories => this.categories = categories);
  }

  loadForm(): void {
    this.reportsForm = this.formBuilder.group({
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
  }
  generateReports(){
    const month = this.reportsForm.value.month;
    const year = this.reportsForm.value.year;

    this.entryService.getByMonthandYear(month, year).subscribe(entries => this.setValues(entries))
  }

  private setValues(entries: Entry[]){
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }
  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {


      if(entry.type == 'revenue'){
        revenueTotal +=  currencyFormatter.unformat(entry.amount!, {code: 'BRL'})
      }else{
        expenseTotal +=  currencyFormatter.unformat(entry.amount!, {code: 'BRL'})
      }
    })

    this.expenseTotal = currencyFormatter.format(expenseTotal, {code: 'BRL'});
    this.revenueTotal = currencyFormatter.format(revenueTotal, {code: 'BRL'});
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, {code: 'BRL'});
  }
  private setChartData(){
    this.revenueChartData = this.getChartData('revenue', 'Gráfico de Receitas', '#9CCC65');
    this.expenseChartData = this.getChartData('expense', 'Gráfico de Despesas', '#e03131');

  }
  private getChartData(entryType: string, title: string, color: string, ){
    const chartData: { categoryName: string | undefined; totalAmount: number; }[] = [];
    this.categories.forEach(category => {
      const filteredEntries = this.entries.filter(entry => (entry.categoryId == category.id) && (entry.type == entryType))
      if(filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce((total, entry) => total + currencyFormatter.unformat(entry.amount!, {code: 'BRL'}), 0)
        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount
        })
      }
    })

    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    }
  }
}
