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

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  carGasData = new MatTableDataSource<CarGasData>([]);

  constructor(private carService: CarService, public dialog: MatDialog) { }

  displayedColumns: string[] = ["date", "cost", "gallons_used", "miles_driven", "mpg"]

  ngOnInit(): void {
    this.getCarGasData();
  }

  getCarGasData(): void {
    if (this.selectedCar) {
      this.carService.getGasDataForCar(this.selectedCar).subscribe(
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
      data: this.selectedCar
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
