import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Car, CarGasData } from '../pick-car/car';
import { CarService } from '../car.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NewDataComponent } from '../new-data/new-data.component';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {

  @Input() public selectedCar: Car | undefined;
  @Input() public userID: number | undefined;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  carGasData = new MatTableDataSource<CarGasData>([]);

  Number = Number;
  Math = Math;

  constructor(private carService: CarService, public dialog: MatDialog) { }

  displayedColumns: string[] = ["date", "cost", "gallons_used", "miles_driven", "mpg"]

  ngOnInit(): void {
    this.getCarGasData();
  }

  getCarGasData(): void {
    console.log(this.userID);
    if (this.selectedCar && this.userID) {
      this.carService.getGasDataForCar(this.selectedCar, this.userID).subscribe(
        carGasData => {
          this.carGasData = new MatTableDataSource<CarGasData>(carGasData);
          this.carGasData.sort = this.sort;
          // this.carGasData.paginator = this.paginator;
        }
      );
    }
  }

  openNewDataDialog(): void {
    const dialogRef = this.dialog.open(NewDataComponent, {
      width: '100%',
      disableClose: true,
      data: {
        "car": this.selectedCar,
        "user": this.userID
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getCarGasData();
      // this.animal = result;
    });
  }

}
