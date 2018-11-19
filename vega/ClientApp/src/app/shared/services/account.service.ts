import { Account } from './../models/account';
import { ConfigService } from '../utils/config.service';
import { RegistrationAccount } from 'src/app/shared/models/registration-account';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl = '';
  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.getApiURI();
   }
  getAll() {
    return this.http.get<Account[]>(`${this.apiUrl}/account`);
}

getById(id: string) {
    return this.http.get<Account>(`${this.apiUrl}/account/` + id).pipe(map(user => {
      return user;
    }));
}
// getByUserName(userName: string) {
//   return this.http.get(`${this.apiUrl}/account/username` + userName);
// }

register(user: RegistrationAccount) {
    return this.http.post(`${this.apiUrl}/account/register`, user);
}

update(user: Account) {
    return this.http.put(`${this.apiUrl}/account/` + user.id, user);
}

delete(id: number) {
    return this.http.delete(`${this.apiUrl}/account/` + id);
}
}
