import { Vehicle } from './../models/vehicle';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import 'rxjs/add/observable/throw';
import { SaveVehicle } from '../models/SaveVehicle';
import { VehicleQuery } from '../models/VehicleQuery';
import { HttpErrorHandler } from './HttpErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private base_url = 'http://localhost:5000/api';
  private url_makes = this.base_url + '/makes';
  private url_features = this.base_url + '/features';
  private url_vehicle = this.base_url + '/vehicle';
  private url_vehicles = this.base_url + '/vehicle';

  constructor( private http: HttpClient) { }

  getMakes() {
    return this.http.get(this.url_makes).pipe(map((data, index) => {
      // tslint:disable-next-line:no-unused-expression
      return data;
    }), catchError(HttpErrorHandler.ErrorHandler));
  }
  getFeatures() {
    return this.http.get(this.url_features).pipe(map((data, index) => {
      // tslint:disable-next-line:no-unused-expression
      return data;
    }), catchError(HttpErrorHandler.ErrorHandler));
  }
  getVehicle(id: number) {
    return this.http.get(this.url_vehicle + '/' + id).pipe(map((data, index) => {
      return data;
    }), catchError(HttpErrorHandler.ErrorHandler));
  }
  getAllVehicles(query: any) {
    console.log(this.getQueryString(query));
    return this.http.get(this.url_vehicles + '?' + this.getQueryString(query)).pipe(map((data, index) => {
      return data;
    }), catchError(HttpErrorHandler.ErrorHandler));
  }

  createVehicle(newVihecle) {
    return this.http.post(this.url_vehicle, newVihecle).pipe(map((data, index) => {
      return data;
    }), catchError(HttpErrorHandler.ErrorHandler));
  }
  updateVehicle(updatedVehicle: SaveVehicle, id: number) {
    console.log('vehicle before updating:');
    console.log(updatedVehicle);
      return this.http.put(this.url_vehicle + '/' + id, updatedVehicle).pipe(map((data, index) => {
          return data;
      }), catchError(HttpErrorHandler.ErrorHandler));
  }
  deleteVehicle(id: number) {
    return this.http.delete(this.url_vehicle + '/' + id).pipe(map((data, index) => {
        return data;
    }), catchError(HttpErrorHandler.ErrorHandler));
}
  getQueryString(obj) {
    const params = [];
    Object.entries(obj).forEach(
      ([key, value]) => {
        if (value != null && value !== undefined) {
          params.push(encodeURIComponent(key) + '=' + encodeURIComponent(<string>value));
        }
      }
    );
    return params.join('&');
  }
}
