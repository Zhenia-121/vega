import { VehicleQuery } from '../../models/VehicleQuery';
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
  query: any = {};
  columns = [
    {title: 'Id', key: 'Id', isSortable: false },
    {title: 'Make', key: 'make', isSortable: true },
    {title: 'Model', key: 'model', isSortable: true },
    {title: 'Contact Name', key: 'contactName', isSortable: true},
    {}
];

  constructor(private dataService: DataService) { }

  ngOnInit() {
      this.populateVehicles();
        // оставляем только те makes id, которые присутствуют среди автомобилей
        this.dataService.getMakes().subscribe(response => {
          console.log(response);
          this.makes = <make[]>response;
          console.log(this.makes);
        });
  }

  // getMakes() {
  //   // tslint:disable-next-line:prefer-const
  //   let makeList = this.vehicles.map(v => v.make);
  //   console.log('getMakes');
  //   console.log(makeList);
  //   return  makeList.filter((m, index, makes) => makes.lastIndexOf(m, 0) === index);
  // }
  populateVehicles() {
    this.dataService.getAllVehicles(this.query).subscribe(response => {
      console.log(response);
      this.vehicles = <Vehicle[]>response;
    });
  }
  doFilter() {
    if (this.query.makeId) {
      this.populateVehicles();
    }
  }
  onSort(columnName: string) {
    if (columnName === this.query.sortBy) {
      this.query.isAscending = !this.query.isAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isAscending = true;
    }
    this.populateVehicles();
  }
  resetFilter() {
    this.query = {};
    this.populateVehicles();
  }

}
//
