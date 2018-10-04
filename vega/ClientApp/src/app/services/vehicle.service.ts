import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends DataService {

  constructor(http: HttpClient) {
    super(http);
  }
}
