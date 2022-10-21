import { Component, Input, OnInit } from '@angular/core';


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

  constructor() { }

  ngOnInit(): void {
  }

  lestItem(item: Items): boolean {
    const index = this.items?.indexOf(item);
    return index + 1 == this.items?.length
  }

}
