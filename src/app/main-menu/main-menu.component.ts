import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  selectedItem: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  selectMenuItem(e: Event): void {
    $('.menu').find('.btn-dark').removeClass('btn-dark').addClass('btn-light');
    let item = $(e.target as Element);
    item.toggleClass('btn-dark');
    this.selectedItem = item.attr("component");
    console.log(this.selectedItem);
  }

}
