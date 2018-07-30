import { JwtHelperService } from '@auth0/angular-jwt';

import { ToastsManager } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { environment } from '../../../environments/environment';  @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public toastr: ToastsManager, vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

    userName: string = localStorage.getItem('name');
  signIn(credentials) {
    console.log('signIn');
    this.authService.login(credentials).subscribe(data=>{
      if (data && data.hasOwnProperty('token')) {
      localStorage.setItem('token', data.token);
      let myRawToken = data.token;
      const helper = new JwtHelperService();
      let decodedToken = helper.decodeToken(myRawToken);
      localStorage.setItem('name', decodedToken.userName);
      this.userName = decodedToken.userName;
      localStorage.setItem('id', decodedToken.id);

      this.authService.userName = this.userName

      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl || '/welcom']);
    }
    else{
      this.invalidLogin= true;
    }
  }
      ,error => {
        this.toastr.error('Invalid Username or Password', 'Error!')
      }
  )
    // if(this.authService.login(credentials)){
      // alert("Amr")
    // }
    // else {
      // alert("/Invalid Username or Password")
    // }
  //   .subscribe(result => {
  //     console.log(result);
  //   },
  //   (error:AppError) => {
  //     if(error instanceof BadRequest){
  //       // alert(error.originalErrorx)
  //     }
  //     else {
  //       // alert(error.originalErrorx)
  //     }
  //   }
  // )
    //   subscribe(result => {
    //     console.log(result);


        // this.toastr.error(`${result}`,"error!")
        // if (result) {
        //   const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        //   this.router.navigate([returnUrl || '/welcom']);
        // } else {
        //   // this.invalidLogin = true;
        //   // console.log("in valid username or password")
        //   // this.toastr.error("Invalid Username or Password","error!")
        // }
      // });
  }
  isLoggedIn(){
    console.log(this.authService.isLoggedIn()+"YYYYYYYYYY");
    return this.authService.isLoggedIn();

  }

}
