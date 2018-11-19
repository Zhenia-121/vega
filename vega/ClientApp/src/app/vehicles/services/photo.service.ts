import { catchError, map, tap, last } from 'rxjs/operators';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpErrorHandler } from './HttpErrorHandler';

@Injectable()
export class PhotoService {

  constructor(private http: HttpClient) { }
  upload(vehicleId: number, photo: File): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', photo);

    const req = new HttpRequest('POST', `http://localhost:5000/api/vehicle/${vehicleId}/photo`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
  getPhoto(vehicleId: number) {
    return this.http.get(`http://localhost:5000/api/vehicle/${vehicleId}/photo`).pipe(map(response => {
      return response;
    }), catchError(HttpErrorHandler.ErrorHandler));
  }
  getFiles(vehicleId: number): Observable<any> {
    return this.http.get(`http://localhost:5000/api/vehicle/${vehicleId}/photo`);
  }
}
