import { Component, OnInit, Input, Inject } from '@angular/core';
import { Car } from '../pick-car/car';
import { CarGasData } from '../pick-car/car';
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

  data: CarGasData = {
    miles_driven: 0,
    gallons_used: 0,
    mpg: 0,
    cost: 0,
    date: ""
  };

  ngOnInit(): void {

  }

  emptyFields(): boolean {
    let conditions = [this.data.date == ""];
    return conditions.every(x => x);
  }

  submitData(): void {
    if (!this.emptyFields()) {
      console.log(`submitting data...\nDate: ${this.data.date}`);
      this.dialogRef.close();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
