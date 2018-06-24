import { GroupService } from './../../../services/group.service';
import { group } from './../../models/group.model';
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
  groups:group[]=[];
  selectedGroups:group[]=[];

  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>,private userService: UserService,
    private groupService: GroupService
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
    // this.groups = data.selected.groups;
    // this.groups = this.selectedGroups;
  }

  ngOnInit() {
    this.groupService.getAllGroups().subscribe(data=>{
      this.groups = data;
    });
  }


  updateUser(){
    this.userService.updateUser(this.id,this.username,this.displayName,this.password,this.firstname,
      this.lastname,this.email,this.enabled,this.selectedGroups);
    this.dialogRef.close();
  }

}
