import { Component, Inject, OnInit } from '@angular/core';
import { Car } from '../pick-car/car';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  selectedItem: string | undefined = "pick-car";
  selectedCar: Car | undefined;
  isAuthenticated: boolean | undefined;
  userID: string | undefined;

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(val => this.isAuthenticated = val);
    this.auth.user$.subscribe(val => {
      // console.log(val?.sub)
      this.userID = val?.sub?.split("|").slice(-1)[0];
    }
    );
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
