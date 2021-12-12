import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from '../pick-car/car';
import { FormControl } from '@angular/forms';
import { CarService } from '../car.service';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewCarComponent>,
    @Inject(MAT_DIALOG_DATA) public input: any, private carService: CarService) { }

  data: Car = {
    id: null,
    name: null,
    make: null,
    model: null,
    year: null,
    pprint: null,
  }

  ngOnInit(): void {
  }

  emptyFields(): boolean {
    let conditions = [this.data.name, this.data.make, this.data.model, this.data.year];
    return conditions.some(x => x === null);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitData(): void {
    if (!this.emptyFields()) {
      console.log(`submitting data...`);
      this.carService.addCar(this.input.user, this.data).subscribe(
        newCar => {
          console.log(newCar)
          this.dialogRef.close();
        }
      );
    }
  }

}
