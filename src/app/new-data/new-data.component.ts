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
    @Inject(MAT_DIALOG_DATA) public input: any, private carService: CarService) { }

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
    let conditions = [this.data.date, this.data.miles_driven, this.data.gallons_used, this.data.cost];
    return conditions.some(x => x === null);
  }

  submitData(): void {
    if (!this.emptyFields()) {
      console.log(`submitting data...`);
      this.carService.postGasDataForCar(this.input.car, this.input.user, this.data,).subscribe(carGasData => console.log(carGasData));
      this.dialogRef.close();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
