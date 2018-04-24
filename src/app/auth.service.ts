import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {


  constructor(private http: HttpClient) { }
  login(credentials) {
    console.log(credentials);
    console.log(JSON.stringify(credentials));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post('http://localhost:8081/aml/auth',
      JSON.stringify(credentials), httpOptions)
      .map(response => {
        console.log(response.toLocaleString());
        // let result = response
      });
  }

  logout() {

  }

  isLoggedIn() {
    return false;
  }
}
