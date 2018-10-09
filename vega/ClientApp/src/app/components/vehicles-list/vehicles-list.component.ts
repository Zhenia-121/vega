import { Vehicle } from './../../models/vehicle';
import { DataService } from './../../services/data.service';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {
  vehicles: Vehicle[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
      this.dataService.getAllVehcles().subscribe(response => {
        this.vehicles = <Vehicle[]>response;
        console.log('From Server:', response),
        console.log(this.vehicles);
      });
  }

}
