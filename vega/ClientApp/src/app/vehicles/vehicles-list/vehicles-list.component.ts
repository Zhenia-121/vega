import { AuthenticationService } from 'src/app/shared/services/auth-service.service';
import { PaginationComponent } from '../../shared/utils/pagination.component';
import { Component, OnInit } from '@angular/core';
import { makeStateKey } from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { Vehicle } from '../models/vehicle';
import { Make } from '../models/make';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;
  queryResult = {};
  vehicles: Vehicle[];
  makes: Make[];
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    {title: 'Id', key: 'Id', isSortable: false },
    {title: 'Make', key: 'make', isSortable: true },
    {title: 'Model', key: 'model', isSortable: true },
    {title: 'Contact Name', key: 'contactName', isSortable: true},
    {}
];

  constructor(private dataService: DataService,
    private authService: AuthenticationService) { }

  ngOnInit() {
      this.populateVehicles();
        // оставляем только те makes id, которые присутствуют среди автомобилей
        this.dataService.getMakes().subscribe(response => {
          console.log(response);
          this.makes = <Make[]>response;
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
      // this.vehicles = <Vehicle[]>response;
      this.queryResult = response;
    });
  }
  doFilter() {
    if (this.query.makeId) {
      this.query.pageNumber = 1,
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
    this.query = {
      pageNumber: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }
  onPageChanged(currentPage: number) {
    this.query.pageNumber = currentPage;
    this.populateVehicles();
  }

}
//
