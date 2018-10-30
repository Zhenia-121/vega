import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/Person';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    // return this.http.post<any>('http://localhost:5000/token', { username, password })
    return this.http.post<any>('http://localhost:5000/token', formData)
        .pipe(map(user => {
          console.log(user);
            // login successful if there's a jwt token in the response
            if (user && user.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        }));
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}
isLoggedIn() {
  const helper = new JwtHelperService();
  return !helper.isTokenExpired();
}
}
