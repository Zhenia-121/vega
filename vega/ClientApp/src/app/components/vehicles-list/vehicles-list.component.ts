import { Filter } from './../../models/Filter';
import { KeyValuePair } from './../../models/key-value-pair';
import { Vehicle } from './../../models/vehicle';
import { DataService } from './../../services/data.service';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { makeStateKey } from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { make } from '../../models/make';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {
  vehicles: Vehicle[];
  allVehicles: Vehicle[];
  makes: make[];
  filter: Filter = {};

  constructor(private dataService: DataService) { }

  ngOnInit() {
      this.populateVehicles();
        // оставляем только те makes id, которые присутствуют среди автомобилей
        this.dataService.getMakes().subscribe(response => {
          console.log(response);
          this.makes = <make[]>response;
        });
        console.log(this.makes);
  }

  // getMakes() {
  //   // tslint:disable-next-line:prefer-const
  //   let makeList = this.vehicles.map(v => v.make);
  //   console.log('getMakes');
  //   console.log(makeList);
  //   return  makeList.filter((m, index, makes) => makes.lastIndexOf(m, 0) === index);
  // }
  populateVehicles() {
    this.dataService.getAllVehicles(this.filter).subscribe(response => {
      console.log(response);
      this.vehicles = <Vehicle[]>response;
    });
  }
  doFilter() {
    if (this.filter.makeId) {
      this.populateVehicles();
    }
  }
  resetFilter() {
    this.filter = {};
    this.doFilter();
  }

}
//
