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
  DisplayName_: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  enabled: boolean;
  lastPasswordResetDate: Date;

  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>,private userService: UserService
  ,@Inject(MAT_DIALOG_DATA) public data: any) { 
      
  }

  ngOnInit() {
  }

  updateUser(){
    this.userService.updateUser(this.username,this.DisplayName_,this.password,this.firstname,this.lastname,this.email);
  }

}
