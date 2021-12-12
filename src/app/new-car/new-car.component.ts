import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Car } from '../pick-car/car';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewCarComponent>) { }

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

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitData(): void {

  }

}
