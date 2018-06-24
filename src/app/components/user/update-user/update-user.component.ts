import { user } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  username: string;
  DisplayName: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  enabled: boolean;
  lastPasswordResetDate: Date;

  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>,private userService: UserService
  ,@Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log("in update constractor");
    console.log(data);
    // const user_: user = {  
    //   username: this.username,
    //   displayName: this.DisplayName,
    //   firstname: this.firstname,
    //   password: this.password,
    //   lastname: this.lastname,
    //   email: this.email,
    //   enabled: this.enabled,
    //   lastPasswordResetDate: this.lastPasswordResetDate
    // }
    this.username = data.username;
    this.DisplayName = data.email;
    this.enabled = data.enabled;
    this.firstname = data.firstname;
    this.lastPasswordResetDate = data.lastPasswordResetDate;
    this.lastname = data.lastname;
    this.password = data.password;   
  }

  ngOnInit() {
  }

  updateUser(){
    this.userService.updateUser(this.username,this.DisplayName,this.password,this.firstname,this.lastname,this.email);
  }

}
