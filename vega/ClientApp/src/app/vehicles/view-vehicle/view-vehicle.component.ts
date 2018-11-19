import { AuthenticationService } from '../../shared/services/auth-service.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { PhotoService } from '../services/photo.service';
import { Vehicle } from '../models/vehicle';
import { NotFound } from 'src/app/shared/errors-handler/not-found';
import { AppError } from 'src/app/shared/errors-handler/app-error';
import { BadInput } from 'src/app/shared/errors-handler/bad-input';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('photoInput') photoInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  photos: any[];
  currentTab = '#basic';
  progress: { percentage: number } = { percentage: 0 };
  fileUploads: Observable<string[]>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private photoService: PhotoService,
    private authService: AuthenticationService) {
    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
    });
    if (this.vehicleId <= 0 || isNaN(this.vehicleId)) {
      this.router.navigate(['../list']);
      return;
    }
  }
  ngOnInit(): void {
    // this.fileUploads = this.photoService.getFiles(this.vehicleId);
    this.photoService.getPhoto(this.vehicleId).subscribe(photos => {
      this.photos = <any[]>photos;
      console.log(this.photos);
    }, this.ErrHandler);
    this.dataService.getVehicle(this.vehicleId).subscribe(response => {
      this.vehicle = <Vehicle>response;
      console.log(this.vehicle);
    }, this.ErrHandler);
  }
  onDelete() {
    if (confirm('Желаете удалить?')) {
      this.dataService.deleteVehicle(this.vehicleId)
        .subscribe(response => {
          alert('Успешно удален');
        }, this.ErrHandler);
      this.router.navigate(['../list']);
      return;
    } else {
      alert('Вы нажали кнопку отмена');
    }
  }
  uploadFile() {
    this.progress.percentage = 0;
    const nativeElement: HTMLInputElement = this.photoInput.nativeElement;
    const file = nativeElement.files[0];
    nativeElement.value = '';

    this.photoService.upload(this.vehicleId, file).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log(event.body);
        if (event.body !== null) {
          setTimeout(() => {
            this.photos.push(event.body);
            console.log(this.photos);
          }, 1000);                 }
        console.log('File is completely uploaded!');
      }
    }, this.ErrHandler,
    () => this.progress = null);

    // this.fileUploads = this.photoService.getFiles(this.vehicleId);
  }
  private isShowProgressBar(): boolean {
    return this.progress && this.progress.percentage > 0 && this.progress.percentage < 100;
  }
  private changeTab($event) {
    this.currentTab = $event.target.dataset['target'];
    console.log(this.currentTab);
  }
  private ErrHandler(error: AppError) {
    console.log('Error');
    if (error instanceof NotFound) {
      this.router.navigate(['/home']);
    }
    if (error instanceof BadInput) {
      this.router.navigate(['/home']);
    }
    this.router.navigate(['/home']);
  }
}
