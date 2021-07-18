import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Car } from './pick-car/car';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cars = [
      { id: 1, name: 'Subaru' },
      { id: 2, name: 'BMW' },
    ];
    return { cars };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(cars: Car[]): number {
    return cars.length > 0 ? Math.max(...cars.map(hero => hero.id)) + 1 : 11;
  }
}