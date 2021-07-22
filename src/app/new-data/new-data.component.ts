import { Component, OnInit, Input, Inject } from '@angular/core';
import { Car } from '../pick-car/car';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-data',
  templateUrl: './new-data.component.html',
  styleUrls: ['./new-data.component.css']
})
export class NewDataComponent implements OnInit {

  // @Input() public selectedCar: Car | undefined;

  constructor(public dialogRef: MatDialogRef<NewDataComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedCar: Car) { }

  date: string = "";

  ngOnInit(): void {
    console.log(this.selectedCar);
  }

}
