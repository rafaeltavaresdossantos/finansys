import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];
  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit(): void {
    this.entryService.getAll().subscribe(entries => {
      this.entries = entries.sort((a,b) => b.id! - a.id!)
    },
    erro => {
      console.error(erro);
    }
    )
  }
  deleteEntry(Entry: any, index: number) : void {

    const mustDelete = confirm(`Confirma a exclusão do lançamento ${this.entries[index].name}?`);
    if(mustDelete){
      this.entryService.delete(Entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element !== Entry),
        () => alert('Erro ao tentar excluir!')
      )
    }
  }
}
