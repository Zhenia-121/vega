import { KeyValuePair } from './../../models/key-value-pair';
import { map, ignoreElements } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
import 'rxjs/add/observable/forkJoin';
// import '_' from ''

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
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    features: [],
    contact: {
      name: '',
      phone: '',
      email: ''
    },
    isRegistered: false
  };

  registered = ['Yes', 'No'];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastr: ToastrService) {
       route.params.subscribe(p => {
        console.log(p);
        this.vehicle.id = +p['id'];
      });
              }

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
    // tslint:disable-next-line:prefer-const
    let sources = [
      this.dataService.getMakes(),
      this.dataService.getFeatures()
    ];
    if (this.vehicle.id) {
      sources.push(this.dataService.getVehicle(this.vehicle.id));
    }

    Observable.forkJoin(sources)
    .subscribe(data => {
      this.makes = data[0] as make[];
      this.features = data[1] as feature[];
      console.log(this.features);
      // console.log(data[2]);
      if (this.vehicle.id !== 0) {
        this.setVehicle(<Vehicle>data[2]);
        this.populateModels();
      }
    }, this.ErrHandler);
  }
  private setVehicle(serverVehicle: Vehicle) {
    this.vehicle.id = serverVehicle.id;
    this.vehicle.makeId = serverVehicle.make.id;
    this.vehicle.modelId = serverVehicle.model.id;
    this.vehicle.contact = serverVehicle.contact;
    console.log(this.vehicle);
    serverVehicle.features.map((f, index, KeyValuePairs) => {
      this.vehicle.features.push(f.id);
    });
  }
  private populateModels() {
    console.log(this.vehicle.makeId);
    const selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    console.log(selectedMake);
    this.models = selectedMake ? selectedMake.models : [];
  }
  loadModels() {
    // tslint:disable-next-line:prefer-const
    this.populateModels();
    delete this.vehicle.modelId;
  }
    onToggleFeature(featureId, $event) {
      if ($event.target.checked) {
        this.vehicle.features.push(featureId);
      } else {
        const index = this.vehicle.features.indexOf(featureId);
        this.vehicle.features.splice(index, 1);
      }
    }
  onSubmit() {
    if (this.vehicle.id) {
      console.log('Update');
        this.dataService.updateVehicle(this.vehicle, this.vehicle.id).subscribe(
          response => {
            console.log(response);
            this.toastr.success('The vehicle was successfully updated!', 'Success!');
          }, this.ErrHandler);
    } else {
      console.log('Save');
      this.dataService.createVehicle(this.vehicle).subscribe(
        response => {
          console.log(response);
          this.toastr.success('The vehicle was successfully created!', 'Success!');
        }, this.ErrHandler);
    }
  }
  private delete() {
    if (confirm('Are you sure to deleting the vehicle')) {
      this.dataService.deleteVehicle(this.vehicle.id).subscribe(
        response => {
          console.log(response);
          this.toastr.success('The vehicle was successfully deleted!', 'Success!');
          this.router.navigate(['/vehicles']);
        }
      );
    }
  }
  private ErrHandler(error: AppError) {
    if (error instanceof NotFound) {
      this.toastr.error('Result not founded', 'Error');
      this.router.navigate(['/home']);
    }
    if (error instanceof BadInput) {
      this.toastr.error('Invalid data was input and sent', 'Error');
      this.router.navigate(['/home']);
    }
    this.router.navigate(['/home']);
  }
}
