import { tokenName } from '@angular/compiler';
import { Injectable } from '@angular/core';
@Injectable()
export class ConfigService {
    apiURI: string;
    tokenName: string;
    constructor() {
        this.apiURI = 'http://localhost:5000/api';
        this.tokenName = 'currentUser';
     }
     getApiURI() {
         return this.apiURI;
     }
     getTokenName() {
       return this.tokenName;
     }
}
