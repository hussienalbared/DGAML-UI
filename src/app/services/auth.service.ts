
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
    return this.http.post<UserResponse>(environment.ipAddress+'/aml/auth',JSON.stringify(credentials), httpOptions)
    
     
      // .map(data => {
      //   if (data && data.hasOwnProperty('token')) {
      //     localStorage.setItem('token', data.token);
      //     let myRawToken = data.token;
      //     const helper = new JwtHelperService();
      //     let decodedToken = helper.decodeToken(myRawToken);
      //     localStorage.setItem('name', decodedToken.userName);
      //     this.userName = decodedToken.userName;
      //     localStorage.setItem('id', decodedToken.id);

      //     // return true;
      //   }
      //   // return false;
      // }
      // ,catchError(this.handleError)
    // )
      
      // .pipe(
      //   catchError(this.handleError)
      // );
    //   .catch((error: HttpErrorResponse) => {
    //     // todo: log?
    //       console.log("WEWEWE")
    //     if (error.status == 500) {
    //         // this.alertService.showError(error.statusText);
    //     } else if (error.status == 588) {
    //         // this.alertService.showAlert(error.statusText);
    //     }

    //     return Observable.throw(error.statusText);
    // });;
  }


  logout() {
    console.log("in logout finc");
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    this.userName = null;
    this.tabs.tabs = [];
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
