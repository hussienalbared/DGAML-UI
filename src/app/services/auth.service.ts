import { TabsServiceService } from './tabs-service.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

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
    return this.http.post<UserResponse>(environment.ipAddress + '/aml/auth',
      JSON.stringify(credentials), httpOptions)
      .map(data => {
        if (data && data.hasOwnProperty('token')) {
          localStorage.setItem('token', data.token);
          let myRawToken = data.token;
          const helper = new JwtHelperService();
          let decodedToken = helper.decodeToken(myRawToken);

          localStorage.setItem('name', decodedToken.userName);
          this.userName = decodedToken.userName;
          localStorage.setItem('id', decodedToken.id);
          // localStorage.setItem('authorities', decodedToken.authorities);

          return true;
        }
        return false;
      });
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
    let token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    let decodedToken = helper.decodeToken(token);


    let authorities = decodedToken.authorities;
    let arr: string[] = authorities;

    return arr.includes(capability);
  }
}
interface UserResponse {
  login: string;
  token: string;
}
