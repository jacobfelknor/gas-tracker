import { Component, Input, OnInit } from '@angular/core';
import { Car, CarGasData } from '../pick-car/car';
import { CarService } from '../car.service';


@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {

  @Input() public selectedCar: Car | undefined;

  carGasData: CarGasData[] = [];

  constructor(private carService: CarService) { }

  displayedColumns: string[] = ["date", "cost", "gallons_used", "miles_driven", "mpg"]

  ngOnInit(): void {
    this.getCarGasData();
  }

  getCarGasData(): void {
    if (this.selectedCar) {
      this.carService.getGasDataForCar(this.selectedCar).subscribe(carGasData => this.carGasData = carGasData);
    }
  }

}
