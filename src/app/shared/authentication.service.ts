import { Injectable } from '@angular/core';
import { isNullOrUndefined } from "util";
import { HttpClient } from "@angular/common/http";
import * as decode from 'jwt-decode';

//npm install --save-dev jwt-decode

interface User {
    result: {
        created_at: Date,
        email: string,
        id: number,
        name: string,
        updated_at: Date
    }
}

@Injectable()
export class AuthenticationService {

    private api:string = 'http://bookstore20markl.s1710456023.student.kwmhgb.at/api/auth';

    constructor(private http: HttpClient) { }

    login(email: string, password: string ) {
        return this.http.post(`${this.api}/login`, {'email': email, 'password': password});
    }

    static getCurrentUserId(){
        return Number.parseInt(localStorage.getItem('userId'));
    }

    public setLocalStorage(token: string) {
        const decodedToken = decode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', decodedToken.user.id);
    }

    logout() {
        this.http.post(`${this.api}/logout`, {});
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    }

    public isLoggedIn() {
        if(!isNullOrUndefined(localStorage.getItem('token'))) {
            let token : string = localStorage.getItem('token');
            const decodedToken = decode(token);
            let expirationDate:Date = new Date(0);
            expirationDate.setUTCSeconds(decodedToken.exp);

            if(expirationDate < new Date()) {
                localStorage.removeItem('token');
                return false;
            }
            return true;
        } else {
            return false;
        }
    }
}
