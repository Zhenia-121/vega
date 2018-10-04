import { Vehicle } from './../models/vehicle';
import { BadInput } from '../common/Errors/bad-input';
import { AppError } from '../common/Errors/app-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import 'rxjs/add/observable/throw';
import { NotFound } from '../common/Errors/not-found';
import { SaveVehicle } from '../models/SaveVehicle';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url_makes = 'http://localhost:5000/api/makes';
  url_features = 'http://localhost:5000/api/features';
  url_vehicle = 'http://localhost:5000/api/vehicle';

  constructor( private http: HttpClient) { }

  getMakes() {
    return this.http.get(this.url_makes).pipe(map((data, index) => {
      // tslint:disable-next-line:no-unused-expression
      return data;
    }), catchError(this.ErrorHandler));
  }
  getFeatures() {
    return this.http.get(this.url_features).pipe(map((data, index) => {
      // tslint:disable-next-line:no-unused-expression
      return data;
    }), catchError(this.ErrorHandler));
  }

  createVehicle(newVihecle: SaveVehicle) {
    return this.http.post(this.url_vehicle, JSON.stringify(newVihecle)).pipe(map((data, index) => {
      return data;
    }), catchError(this.ErrorHandler));
  }
  updateVehicle(updatedVehicle: SaveVehicle, id: number) {
      return this.http.put(this.url_vehicle + '/' + id, JSON.stringify(updatedVehicle)).pipe(map((data, index) => {
          return data;
      }), catchError(this.ErrorHandler));
  }
  deleteVehicle(id: number) {
    return this.http.delete(this.url_vehicle + '/' + id).pipe(map((data, index) => {
        return data;
    }), catchError(this.ErrorHandler));
}

  private ErrorHandler(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInput());
    }
    if (error.status === 404) {
      return throwError(new NotFound());
    }
    return throwError(new AppError(error));
  }
}
