import { Injectable } from '@angular/core';

@Injectable()
export class MockAuthServiceService {
 isLogged:boolean=false;
  constructor() { }
  login(credentials){
   let AuthUser={"name":"admin","Password":"admin"}
   
    if(credentials.UserName===AuthUser.name&&credentials.Password===AuthUser.Password)
    {
      this.isLogged=true;
    }

    

  }
  logout() {
   
this.isLogged=false;

  }
  isLoggedIn(){
return this.isLogged==true;
  }
}





// @Injectable()
// export class AuthService {
//   constructor(private http: HttpClient
//     // , private helper: JwtHelperService
//    { }
//   login(credentials) {
//     return this.http.post<UserResponse>('http://localhost:8081/aml/auth',
//       JSON.stringify(credentials), httpOptions)
//       .map(data => {
//         if (data && data.hasOwnProperty('token')) {
//           localStorage.setItem('token', data.token);
//           return true;
//         }
//         return false;
//       });
//   }

//   logout() {
//     localStorage.removeItem('token');
//   }

//   isLoggedIn() {
//     console.log('isLoggedIn');
//     const token = localStorage.getItem('token');

//     if (!token) {
//       return null;
//     }
//     const helper = new JwtHelperService();

//     return !helper.isTokenExpired(token);
//   }

//   get currentUser() {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       return null;
//     }
//     const decodedToken = new JwtHelperService().decodeToken(token);
//     return new JwtHelperService().decodeToken(token);
//   }
// }


