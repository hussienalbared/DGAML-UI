import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {

  form: FormGroup;

  // id : number;
  // username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  // enabled: boolean;
  // lastPasswordResetDate: Date;

  constructor(public dialogRef: MatDialogRef<AddNewUserComponent>,private userService: UserService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
    });
  }

  addUser(){
    // this.userService.addNewUser(this.password,this.firstname,this.lastname,this.email).subscribe(data => {
    //   }, error => {
        
    //   }
    //   );
    // this.dialogRef.close();
    console.log(this.firstname);
    console.log(this.lastname);
    console.log(this.email);
    console.log(this.password);
  }

}
