import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Car } from './pick-car/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carsUrl = 'api/cars';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // constructor(
  //   private http: HttpClient,
  //   private messageService: MessageService) { }
  constructor(private http: HttpClient) { }

  /** GET cares from the server */
  getCares(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carsUrl)
      .pipe(
        tap(_ => this.log('fetched cares')),
        catchError(this.handleError<Car[]>('getCares', []))
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

  updateCar(car: Car): Observable<any> {
    return this.http.put(this.carsUrl, car, this.httpOptions);
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.carsUrl, car, this.httpOptions).pipe(
      tap((newCar: Car) => this.log(`added car w/ id=${newCar.id}`)),
      catchError(this.handleError<Car>('addCar'))
    );
  }

  deleteCar(car: Car): Observable<Car> {
    let url = `${this.carsUrl}/${car.id}`;
    return this.http.delete<Car>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted car id=${car.id}`)),
      catchError(this.handleError<Car>('deleteCar'))
    );
  }

  /* GET cares whose name contains search term */
  searchCares(term: string): Observable<Car[]> {
    if (!term.trim()) {
      // if not search term, return empty car array.
      return of([]);
    }
    return this.http.get<Car[]>(`${this.carsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found cares matching "${term}"`) :
        this.log(`no cares matching "${term}"`)),
      catchError(this.handleError<Car[]>('searchCares', []))
    );
  }

  /** Log a CarService message with the MessageService */
  private log(message: string) {
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
