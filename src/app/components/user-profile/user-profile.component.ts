import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';  @Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
user:any=null;
matched:boolean;

  constructor(private auth:AuthService,private userService:UserService,private router:Router) { 

  }

  ngOnInit() {
    let userId=localStorage.getItem('id')
    this.matched=true;
    this.userService.getUser(userId).subscribe(data=>{
      
      this.user=data;
    })
  }

  updateUser(form_)
  {
    console.log(form_)
    if(form_.password!=form_.password2)
    {
      this.matched=false
    }
    else
    { 
     let username=form_.username?form_.username:this.user.username
     let displayName=form_.displayName?form_.displayName:this.user.displayName
     let firstname=form_.firstname?form_.firstname:this.user.firstname
    let  lastname=form_.lastname?form_.lastname:this.user.lastname
     let  email=form_.email?form_.email:this.user.email
    let   password=form_.password?form_.password:''
    this.userService.updateUser(this.user.id,username,displayName,password,firstname,lastname,email,this.user.enabled,this.user.groups)
    }
   
   this.router.navigate(["/welcom"]);
  }
  check(p1,p2)
  {
    this.matched=p1===p2;  }
}
