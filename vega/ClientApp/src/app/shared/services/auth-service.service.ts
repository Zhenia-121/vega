import { RegistrationAccount } from 'src/app/shared/models/registration-account';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, catchError } from 'rxjs/operators';
import { tokenName } from '@angular/compiler';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestOptions} from '@angular/http';
import { ConfigService } from '../utils/config.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  tokenObject = '';
  baseUrl = '';
  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();
  private loggedIn = false;

  constructor(private http: HttpClient, private config: ConfigService) {
    super();
    this.loggedIn = !!localStorage.getItem(this.tokenObject);
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = this.config.getApiURI();
    this.tokenObject = this.config.getTokenName();
  }
  register(registrationUser: RegistrationAccount): Observable<boolean> {
    // const body = JSON.stringify({ email, password, firstName, lastName, location });
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new  RequestOptionsArgs ({ headers: headers });
    return this.http.post(this.baseUrl + '/account/register', registrationUser).pipe(map((res, index) => {
      console.log('user was succesfully created ' + res);
      return true;
    }),  catchError(this.handleError));
  }
  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    console.log(username, password);
    console.log('url: ' + this.baseUrl);
    // return this.http.post<any>('http://localhost:5000/token', { username, password })
    return this.http.post<any>(this.baseUrl + '/account/login', { username, password })
      .pipe(map(user => {
        console.log(user);
        // login successful if there's a jwt token in the response
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(this.tokenObject, JSON.stringify(user));
          this.loggedIn = true;
          console.log('logged in was successful');
          this._authNavStatusSource.next(true);
        }
        return user;
      }), catchError(this.handleError));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.tokenObject);
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }
  isLoggedIn() {
    const helper = new JwtHelperService();
    const token: any = localStorage.getItem(this.tokenObject);
    if (token) {
       return !helper.isTokenExpired(token);
    }
    return false;
  }
}
