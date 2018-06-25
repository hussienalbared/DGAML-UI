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


  updateUser(form_){
    this.userService.updateUser(form_.id,form_.username,form_.displayName,form_.password,form_.firstname,
      form_.lastname,form_.email,form_.enabled,form_.selectedGroups);
    this.dialogRef.close();
  }

}
