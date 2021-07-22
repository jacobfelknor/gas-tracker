import { Component, OnInit } from '@angular/core';
import { Car } from '../pick-car/car';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  selectedItem: string | undefined = "pick-car";
  selectedCar: Car | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  selectMenuItem(e: Event): void {
    this.clearMenuSelection();
    let item = $(e.target as Element);
    item.toggleClass('btn-dark');
    this.selectedItem = item.attr("component");
    console.log(this.selectedItem);
  }

  selectCar(car: Car): void {
    this.selectedCar = car;
    console.log(`Selected ${this.selectedCar.name}`);
    this.mainMenu();
  }

  mainMenu(): void {
    this.selectedItem = undefined;
    this.clearMenuSelection();
  }

  clearMenuSelection(): void {
    $('.menu').find('.btn-dark').removeClass('btn-dark').addClass('btn-light');
  }

}
