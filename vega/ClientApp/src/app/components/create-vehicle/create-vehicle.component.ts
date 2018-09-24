import { DataService } from './../../services/data.service';
import { make } from './../../models/make';
import { feature } from './../../models/feature';
import { model } from './../../models/model';
import { AppError } from './../../common/Errors/app-error';
import { Component, OnInit } from '@angular/core';
import { NotFound } from '../../common/Errors/not-found';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  // template: '<div>Hello</div>',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent implements OnInit {
  models: model[];
  makes: make[];
  features: feature[];

  registered = ['Yes', 'No'];
  constructor(
    private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getMakes().subscribe(response => {
      this.makes = response as make[];
      console.log(this.makes);
    }, (error: AppError) => {
      if (error instanceof NotFound) {
        alert('Result not found');
        return;
      } else {
        throw error;
      }
    });
    this.dataService.getFeatures().subscribe(response => {
      this.features = response as feature[];
      console.log(this.features);
    }, (error: AppError) => {
      if (error instanceof NotFound) {
        alert('Result not found');
        return;
      } else {
        throw error;
      }
    });
  }

  loadModels(idMake) {
     // tslint:disable-next-line:prefer-const
     let selectedMake = this.makes.find(i => i.id === Number.parseInt(idMake, null));
     this.models = selectedMake ? selectedMake.models : [];
     console.log(this.models);
    }
  }

