import { BadInput } from './../../common/Errors/bad-input';
import { SaveVehicle } from './../../models/SaveVehicle';
import { Vehicle } from './../../models/vehicle';
import { DataService } from './../../services/data.service';
import { make } from './../../models/make';
import { feature } from './../../models/feature';
import { model } from './../../models/model';
import { AppError } from './../../common/Errors/app-error';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { NotFound } from '../../common/Errors/not-found';
import { ToastrService } from 'ngx-toastr';
import { $ } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';

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
  vehicle: any = {
    features: [],
    contact: {}
  };

  registered = ['Yes', 'No'];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
              private toastr: ToastrService)  { }

  ngOnInit() {
    // this.vehicle.modelId  = 0;
    // this.vehicle.makeId = 0;
    // this.vehicle.isRegistered = true;
    // this.vehicle.contact = {
    //   name: 'asd',
    //   phone: 'fdfsd',
    //   email: 'wet'
    // };
    // this.vehicle.features = [];
    // this.vehicle.id = this.route.snapshot.paramMap.get('id');
    this.dataService.getMakes().subscribe(
      response => {
        this.makes = response as make[];
      }, this.ErrHandler);

    this.dataService.getFeatures().subscribe(
      response => {
        this.features = response as feature[];
      }, this.ErrHandler);
  }

  loadModels(idMake) {
    // tslint:disable-next-line:prefer-const
    let selectedMake = this.makes.find(
      i => i.id === Number.parseInt(idMake, null)
    );
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }
    onToggleFeature(featureId, $event) {
      if ($event.target.checked) {
        this.vehicle.features.push(featureId);
      } else {
        const index = this.vehicle.features.IndexOf(featureId);
        this.vehicle.features.Splice(index, 1);
      }
    }
  onSubmit() {
    this.dataService.createVehicle(this.vehicle).subscribe(
      response => {
        console.log(response);
        this.toastr.success('Vehicle successfully was added!', 'Success!');
      }, this.ErrHandler);
  }

  private ErrHandler(error: AppError) {
    if (error instanceof NotFound) {
      this.toastr.error('Result not founded', 'Error');
      return;
    }
    if (error instanceof BadInput) {
      this.toastr.error('Invalid data was input and sent', 'Error');
      return;
    }
  }
}
