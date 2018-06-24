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

  id:number;
  username: string;
  displayName: string;
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
    this.id = data.selected.id;
    this.username = data.selected.username;
    this.displayName = data.selected.displayName;
    this.email = data.selected.email;
    this.enabled = data.selected.enabled;
    this.firstname = data.selected.firstname;
    this.lastPasswordResetDate = data.selected.lastPasswordResetDate;
    this.lastname = data.selected.lastname;
    this.password = data.selected.password;   
  }

  ngOnInit() {
  }

  updateUser(){
    this.userService.updateUser(this.id,this.username,this.displayName,this.password,this.firstname,this.lastname,this.email,this.enabled);
    this.dialogRef.close();
  }

}
