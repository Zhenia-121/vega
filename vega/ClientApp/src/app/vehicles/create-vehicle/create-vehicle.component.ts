import { map, ignoreElements } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { $ } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/forkJoin';
import { feature } from '../models/feature';
import { Make } from '../models/make';
import { model } from '../models/model';
import { SaveVehicle } from '../models/SaveVehicle';
import { DataService } from '../services/data.service';
import { Vehicle } from '../models/vehicle';
import { AppError } from 'src/app/shared/errors-handler/app-error';
import { NotFound } from 'src/app/shared/errors-handler/not-found';
import { BadInput } from 'src/app/shared/errors-handler/bad-input';
// import '_' from ''

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  // template: '<div>Hello</div>',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent implements OnInit {
  models: model[];
  makes: Make[];
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
      this.vehicle.id = +p['id'] || 0;
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
        this.makes = data[0] as Make[];
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
    const result$ = (this.vehicle.id) ?
      this.dataService.updateVehicle(this.vehicle, this.vehicle.id) :
      this.dataService.createVehicle(this.vehicle);
    result$.subscribe(
      response => {
        console.log(response);
        this.toastr.success('The vehicle was successfully saved!', 'Success!');
      }, this.ErrHandler);
      this.router.navigate(['../view', this.vehicle.id]);
  }
  private delete() {
    if (confirm('Are you sure to deleting the vehicle')) {
      this.dataService.deleteVehicle(this.vehicle.id).subscribe(
        response => {
          console.log(response);
          this.toastr.success('The vehicle was successfully deleted!', 'Success!');
          this.router.navigate(['../list']);
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
