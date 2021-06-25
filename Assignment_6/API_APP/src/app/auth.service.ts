import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import {User} from './User';
import { RegisterUser } from './RegisterUser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public readToken(): any{
    const token = localStorage.getItem('access_token');
    //console.log("auth..token..>"+token);
    return helper.decodeToken(token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    // Note: We can also use this.jwtHelper.isTokenExpired(token) 
    // to see if the token is expired

    if (token) {
      console.log('===token exists===');
      return true;
    } else {
      console.log('===no token===');
      return false;
    }
  }

  login(user: User): Observable<any> {
    // Attempt to login
    let url = 'http://localhost:8080/api/login';
    let url1= environment.userAPIBase+"/login";
    return this.http.post<any>(url, user);
  }

  logout(){
    localStorage.removeItem('access_token');

  }
  register(register :RegisterUser): Observable<any>{
    let url = 'http://localhost:8080/api/register';
    let url1= environment.userAPIBase+"/register";
    return this.http.post<any>(url, register );
  } 

}
