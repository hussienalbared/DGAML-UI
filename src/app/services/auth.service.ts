
import { Observable } from 'rxjs/Observable';
import { TabsServiceService } from './tabs-service.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};
@Injectable()
export class AuthService {
  userName: string = localStorage.getItem('name');
  constructor(private http: HttpClient, private router: Router, private tabs: TabsServiceService) { }

  login(credentials) {
    // alert("login")
    return this.http.post<UserResponse>(environment.ipAddress + '/aml/auth',
      JSON.stringify(credentials), httpOptions);
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    // localStorage.removeItem('authorities');

    this.userName = null;
    this.tabs.tabs = [];
    this.router.navigate(['/']);
  }

  isLoggedIn() {

    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();

    return !helper.isTokenExpired(token);
  }

  get currentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decodedToken = new JwtHelperService().decodeToken(token);
    return new JwtHelperService().decodeToken(token);
  }
  has_Capabilities(capability): boolean {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);


    const authorities = decodedToken.authorities;
    const arr: string[] = authorities;

    return arr.includes(capability);
  }
}
interface UserResponse {
  login: string;
  token: string;
}
