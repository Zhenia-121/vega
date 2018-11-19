
import { Injectable } from '@angular/core';
import { ConfigService } from '../../shared/utils/config.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { HomeDetails } from '../models/HomeInterface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {

  baseUrl = '';

  constructor(private http: HttpClient, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
  }

  getHomeDetails(): Observable<HomeDetails> {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      const authToken = localStorage.getItem('auth_token');
      headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.baseUrl + '/account/home', {headers: headers})
    .pipe(map(response => {
      return <HomeDetails>response;
    }), catchError(this.handleError));
  }
}
