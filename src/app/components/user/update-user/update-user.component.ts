import { GroupService } from './../../../services/group.service';
import { group } from './../../models/group.model';
import { user } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

import { environment } from '../../../../environments/environment';  @Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id:number;
  username: string;
  displayName: string;
  // password: string;
  newPassword: string;
  firstname: string;
  lastname: string;
  email: string;
  enabled: boolean;
  lastPasswordResetDate: Date;
  groups:group[]=[];
  selectedGroups:group[]=[];
  selected:group[]=[];
  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>,private userService: UserService,
    private groupService: GroupService
  ,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.id = data.selected.id;
    this.username = data.selected.username;
    this.displayName = data.selected.displayName;
    this.email = data.selected.email;
    this.enabled = data.selected.enabled ;
    this.firstname = data.selected.firstname;
    this.lastPasswordResetDate = data.selected.lastPasswordResetDate;
    this.lastname = data.selected.lastname;
    this.newPassword = data.selected.password; 
    this.selected = data.selected.groups;
  }

  compareWithFunc(a, b) {
    return a.id === b.id;
  }

  ngOnInit() {
    this.groupService.getAllGroups().subscribe(data=>{
      this.groups = data;
    });

  }


  updateUser(form_){
    this.username = form_.username ? form_.username: this.username;
    this.displayName = form_.displayName ? form_.displayName: this.displayName;
    this.newPassword = form_.newPassword ? form_.newPassword: this.newPassword;
    this.firstname = form_.firstname ? form_.firstname: this.firstname;
    this.lastname = form_.lastname ? form_.lastname: this.lastname;
    this.email = form_.email ? form_.email: this.email;
    this.enabled = form_.enabled ? form_.enabled: this.enabled;
    this.selectedGroups = form_.selectedGroups ? form_.selectedGroups: this.selectedGroups;
    this.newPassword = form_.newPassword ? form_.newPassword : this.newPassword;


    this.selectedGroups = this.selected.concat(this.selectedGroups)
    console.log('final selected groups')
    console.log(this.selectedGroups)

    this.userService.updateUser(this.id,this.username,this.displayName,this.newPassword,this.firstname,
      this.lastname,this.email,this.enabled,this.selectedGroups);
    this.dialogRef.close();
  }

}
