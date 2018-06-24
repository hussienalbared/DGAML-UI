import { UserService } from './../../../services/user.service';
import { MatDialogRef } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {

  form: FormGroup;

  username: string;
  DisplayName: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  enabled: boolean;
  lastPasswordResetDate: Date;

  constructor(public dialogRef: MatDialogRef<AddNewUserComponent>,private userService: UserService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.required],
      DisplayName: [null, Validators.required]
    });
  }

  addUser(){
    console.log("add user")
    console.log(this.username);
    console.log(this.DisplayName);
    console.log(this.firstname);
    console.log(this.lastname);
    console.log(this.email);
    console.log(this.password);

    this.userService.addNewUser(this.username,this.DisplayName,this.password,this.firstname,this.lastname,this.email,true,
                                this.lastPasswordResetDate)
    this.dialogRef.close();
    
  }

}
