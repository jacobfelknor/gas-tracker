import { Component, OnInit, Input, Inject } from '@angular/core';
import { Car } from '../pick-car/car';
import { CarGasData } from '../pick-car/car';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarService } from '../car.service';

@Component({
  selector: 'app-new-data',
  templateUrl: './new-data.component.html',
  styleUrls: ['./new-data.component.css']
})
export class NewDataComponent implements OnInit {

  // @Input() public selectedCar: Car | undefined;

  constructor(public dialogRef: MatDialogRef<NewDataComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedCar: Car, private carService: CarService) { }

  data: CarGasData = {
    miles_driven: null,
    gallons_used: null,
    mpg: null,
    cost: null,
    date: null,
  };

  ngOnInit(): void {

  }

  emptyFields(): boolean {
    let conditions = [this.data.date == ""];
    return conditions.every(x => x);
  }

  submitData(): void {
    if (!this.emptyFields()) {
      console.log(`submitting data...`);
      this.carService.postGasDataForCar(this.selectedCar, this.data).subscribe(carGasData => console.log(carGasData));
      this.dialogRef.close();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
