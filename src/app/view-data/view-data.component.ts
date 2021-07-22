import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Car, CarGasData } from '../pick-car/car';
import { CarService } from '../car.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


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

  showNewDataForm: boolean = false;

  constructor(private carService: CarService) { }

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
          this.carGasData.paginator = this.paginator;
        }
      );
    }
  }

  onNewDataClick(): void {
    this.showNewDataForm = !this.showNewDataForm;
  }

}
