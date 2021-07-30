import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CarService } from '../car.service';
import { Car } from './car';

@Component({
  selector: 'app-pick-car',
  templateUrl: './pick-car.component.html',
  styleUrls: ['./pick-car.component.css']
})
export class PickCarComponent implements OnInit {

  cars: Car[] = [];

  @Output() selectedCar = new EventEmitter<Car>();

  @Input() public userID: number | undefined;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars(this.userID!).subscribe(cars => this.cars = cars);
  }

  // add(name: string): void {
  //   name = name.trim();
  //   if (name) {
  //     this.carService.addCar({ name } as Car).subscribe(car => this.cars.push(car));
  //   } else {
  //     return;
  //   }
  // }

  // delete(car: Car): void {
  //   this.cars = this.cars.filter(h => h !== car);
  //   this.carService.deleteCar(car).subscribe();
  // }

  selectCar(car: Car): void {
    this.selectedCar.emit(car);
    $("#view-data-btn").trigger("click");
  }

}
