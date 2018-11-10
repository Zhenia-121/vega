import { AccountRegistration } from 'src/app/models/account-registration';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/Person';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, catchError } from 'rxjs/operators';
import { tokenName } from '@angular/compiler';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestOptions} from '@angular/http';
import { HttpErrorHandler } from './HttpErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  tokenObject = 'currentUser';
  baseUrl = 'http://localhost:5000/auth';
  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();
  private loggedIn = false;

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem(this.tokenObject);
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
  }
  register(email: string, password: string, firstName: string, lastName: string): Observable<boolean> {
    const body = JSON.stringify({ email, password, firstName, lastName, location });
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + '/registration', body).pipe(map((res, index) => {
      return true;
    }),  catchError(HttpErrorHandler.ErrorHandler));
  }
  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    // return this.http.post<any>('http://localhost:5000/token', { username, password })
    return this.http.post<any>(this.baseUrl + '/token', formData)
      .pipe(map(user => {
        console.log(user);
        // login successful if there's a jwt token in the response
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(this.tokenObject, JSON.stringify(user));
          this.loggedIn = true;
          this._authNavStatusSource.next(true);
        }
        return user;
      }));
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
