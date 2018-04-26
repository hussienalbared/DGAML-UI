import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable()
export class AuthService {


  constructor(private http: HttpClient) { }
  login(credentials) {
    console.log(JSON.stringify(credentials));

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
