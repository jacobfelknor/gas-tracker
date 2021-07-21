import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../pick-car/car';


@Component({
  selector: 'app-new-data',
  templateUrl: './new-data.component.html',
  styleUrls: ['./new-data.component.css']
})
export class NewDataComponent implements OnInit {

  @Input() public selectedCar: Car | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
