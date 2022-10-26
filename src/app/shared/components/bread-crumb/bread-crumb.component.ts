import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface Items {
  text: string,
  link?: string
}

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})

export class BreadCrumbComponent implements OnInit {

  @Input() items!: Array<Items>

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  lestItem(item: Items): boolean {
    const index = this.items?.indexOf(item);
    return index + 1 == this.items?.length
  }

  actionBtn(){
    const url = this.router.url.match(/\d/g);
    const id = url!.join("");
    return this.items[0].link == 'new' ? 'new' : `/expense/${id}/${this.items[0].link}`;
  }

}
