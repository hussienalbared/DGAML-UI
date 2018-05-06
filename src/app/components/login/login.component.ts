import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MockAuthServiceService } from '../../services/mock-auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
isLoggedIn:boolean=false;
  constructor(  private route: ActivatedRoute,
    private router: Router,private loginService:MockAuthServiceService) { }

  ngOnInit() {
  }
  login(data){

    this.loginService.login(data);
    this.router.navigate(["home"])
    // this.router.navigateByUrl('/(first:home)')
    // if(this.loginService.isLogged)
    // {
    //   this.isLoggedIn=true;
    //   this.router.navigate(["home"])
    // }
    
    


  }
}
