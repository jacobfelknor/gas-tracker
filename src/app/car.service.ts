import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Car, CarGasData } from './pick-car/car';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carsUrl = environment.production ?
    'https://gastrackerapi.com/cars' : "http://localhost:8000/cars";  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // constructor(
  //   private http: HttpClient,
  //   private messageService: MessageService) { }
  constructor(private http: HttpClient) { }

  /** GET cars from the server */
  getCars(userID: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.carsUrl}/get_cars/${userID}`)
      .pipe(
        tap(_ => this.log(_)),
        catchError(this.handleError<Car[]>('getCars', []))
      );
  }

  /** GET car by id. Will 404 if id not found */
  getCar(id: number): Observable<Car> {
    const url = `${this.carsUrl}/${id}`;
    return this.http.get<Car>(url).pipe(
      tap(_ => this.log(`fetched car id=${id}`)),
      catchError(this.handleError<Car>(`getCar id=${id}`))
    );
  }

  getGasDataForCar(car: Car, userID: string): Observable<CarGasData[]> {
    const url = `${this.carsUrl}/car_data/${userID}/${car.id}`;
    return this.http.get<CarGasData[]>(url).pipe(
      tap(_ => this.log("fetched car data")),
      catchError(this.handleError<CarGasData[]>("fetching car data"))
    )
  }

  postGasDataForCar(car: Car, userID: string, data: CarGasData): Observable<CarGasData> {
    const url = `${this.carsUrl}/car_data/${userID}/${car.id}`;
    return this.http.post<CarGasData>(url, data, this.httpOptions).pipe(
      tap((newData: CarGasData) => this.log(newData)),
      catchError(this.handleError<CarGasData>('postGasDataForCar'))
    );
  }

  // updateCar(car: Car): Observable<any> {
  //   return this.http.put(this.carsUrl, car, this.httpOptions);
  // }

  // addCar(car: Car): Observable<Car> {
  //   return this.http.post<Car>(this.carsUrl, car, this.httpOptions).pipe(
  //     tap((newCar: Car) => this.log(`added car w/ id=${newCar.id}`)),
  //     catchError(this.handleError<Car>('addCar'))
  //   );
  // }

  // deleteCar(car: Car): Observable<Car> {
  //   let url = `${this.carsUrl}/${car.id}`;
  //   return this.http.delete<Car>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted car id=${car.id}`)),
  //     catchError(this.handleError<Car>('deleteCar'))
  //   );
  // }

  // /* GET cars whose name contains search term */
  // searchCars(term: string): Observable<Car[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty car array.
  //     return of([]);
  //   }
  //   return this.http.get<Car[]>(`${this.carsUrl}/?name=${term}`).pipe(
  //     tap(x => x.length ?
  //       this.log(`found cars matching "${term}"`) :
  //       this.log(`no cars matching "${term}"`)),
  //     catchError(this.handleError<Car[]>('searchCars', []))
  //   );
  // }

  /** Log a CarService message with the MessageService */
  private log(message: any) {
    // this.messageService.add(`CarService: ${message}`);
    console.log(message);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
