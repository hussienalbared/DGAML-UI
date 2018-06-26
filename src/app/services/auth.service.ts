import { TabsServiceService } from './tabs-service.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};
@Injectable()
export class AuthService {
  userName:string=localStorage.getItem('name');
  constructor(private http: HttpClient,private router: Router,private tabs:TabsServiceService) { }
  login(credentials) {
    return this.http.post<UserResponse>('http://localhost:8081/aml/auth',
      JSON.stringify(credentials), httpOptions)
      .map(data => {
        if (data && data.hasOwnProperty('token')) {
          localStorage.setItem('token', data.token);
          let myRawToken=data.token;
          const helper = new JwtHelperService();
          let decodedToken = helper.decodeToken(myRawToken);
          localStorage.setItem('name', decodedToken.userName);
        this.userName=decodedToken.userName;
          
      
          console.log(decodedToken)


          return true;
        }
        return false;
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.userName = null;
    this.tabs.tabs =[];
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    console.log('isLoggedIn');
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
}

interface UserResponse {
  login: string;
  token: string;
}
