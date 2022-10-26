import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() title: string = '';
  @Input() nameButton: string = '';
  @Input() link: string = '';
  @Input() classBtn: string = '';
  @Input() classIcon: string = '';


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  actionBtn(){
    const url = this.router.url.match(/\d/g);
    const id = url!.join("");
    return this.link == 'new' ? 'new' : `/expense/${id}/${this.link}`;
  }

}
