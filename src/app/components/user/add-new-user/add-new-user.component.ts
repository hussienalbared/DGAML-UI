import { SelectionModel } from '@angular/cdk/collections';
import { group } from './../../models/group.model';
import { GroupService } from './../../../services/group.service';
import { UserService } from './../../../services/user.service';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
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

  groups:any=[];
  selectedGroups:group[]=[];
  
  enabled: boolean;
  lastPasswordResetDate: Date;
  displayedColumns = ['select', 'name'];
  selection = new SelectionModel<group>(true, []);
  constructor(public dialogRef: MatDialogRef<AddNewUserComponent>,private userService: UserService,
    private formBuilder: FormBuilder,private groupservice:GroupService) { }

  ngOnInit() {
    // this.form = this.formBuilder.group({
    //   email: [null, [Validators.required, Validators.email]],
    //   password: [null, Validators.required],
    //   firstname: [null, Validators.required],
    //   lastname: [null, Validators.required],
    //   username: [null, Validators.required],
    //   DisplayName: [null, Validators.required],
    //   selectedGroups:[null, null]
    // });
    this.groupservice.getAllGroups().subscribe(data=>{
      // this.groups=new MatTableDataSource<group>(data);
      this.groups=data;
    })
  }

  addUser(x){
    console.log(x.username);
    console.log(x.username);
    console.log(x.DisplayName);
    console.log(this.firstname);
    console.log(this.lastname);
    console.log(this.email);
    console.log(this.password);
    console.log(this.selectedGroups);

    this.selectedGroups = this.groups[0];

    this.userService.addNewUser(x.username,x.DisplayName,x.password,x.firstname,x.lastname,x.email,true,
                                x.lastPasswordResetDate,x.selectedGroups)
    this.dialogRef.close();
    
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.groups.data.length;
    return numSelected === numRows;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.groups.data.forEach(row => this.selection.select(row));
  }


}
