import { TranslateService } from '@ngx-translate/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ToastsManager } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { environment } from '../../../environments/environment'; @Component({
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
    private translate: TranslateService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  userName: string = localStorage.getItem('name');
  signIn(credentials) {
    console.log('signIn');

    console.log(credentials)
    if(credentials.username.length ==0 || credentials.password.length ==0){
      if(this.translate.getDefaultLang() == 'en')
        this.toastr.error("Username or Password shouldn't be empty!", 'Error!');
      else 
        this.toastr.error('الرجاء ادخال اسم المستخدم وكلمه المرور', 'خطأ!')
    }else{
      this.authService.login(credentials).subscribe(data => {
        if (data && data.hasOwnProperty('token')) {
          localStorage.setItem('token', data.token);
          const myRawToken = data.token;
          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(myRawToken);
          localStorage.setItem('name', decodedToken.userName);
          this.userName = decodedToken.userName;
          localStorage.setItem('id', decodedToken.id);

          this.authService.userName = this.userName;

          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/welcom']);
        } else {
          this.invalidLogin = true;
        }
      }
      , error => {
        if(this.translate.getDefaultLang() == 'en')
          this.toastr.error('Invalid Username or Password', 'Error!');
        else 
          this.toastr.error('خطأ في اسم المستخدم او كلمة السر!', 'خطأ!');
      }
    );
  }
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
