import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../pick-car/car';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {

  @Input() public selectedCar: Car | undefined;

  constructor() { }

  ngOnInit(): void {
    
  }

}
