import { UpdateUserComponent } from './update-user/update-user.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../services/user.service';
import { SelectionModel } from '@angular/cdk/collections';
import { user } from './../../models/user.model';
import { NgProgress } from 'ngx-progressbar';

import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id : number;
  username: string;
  DisplayName:string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  enabled: boolean;
  // lastPasswordResetDate: Date;

  result: user[];
  IsLoaded=true;
  
  dataSource: any = null;
  displayedColumns = ['select','id','username','displayName', 'firstname', 'lastname', 'email', 'enabled', 'lastPasswordResetDate'];
  selection = new SelectionModel<user>(true, []);  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,public ngProgress: NgProgress,public dialog: MatDialog,) { }

/** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getRecord(row: any) {
    console.log("consolg log get record")
    console.log(row)
    let dialogRef = this.dialog.open(UpdateUserComponent, {
      height: '400px',
      width: '600px',
      data: { selected: row }
    });
    dialogRef.afterClosed().subscribe(result => {}, error => {});
    
    this.id = row.id;
    this.username = row.username;
    this.DisplayName = row.displayname;
    this.password = row.password;
    this.firstname = row.firstname;
    this.lastname = row.lastname;
    this.email = row.email;
    this.enabled = row.enabled;

  }

  ngOnInit() {
    // this.ngProgress.start();
    this.userService.getAllUsers().
      subscribe(data => {
        this.result = data;
        console.log("AAAAA:");
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.IsLoaded=false;
        // this.ngProgress.done();

      });
  }
  enableUser(){
    const numSelected = this.selection.selected.length;
    if (numSelected === 0) {
      alert("Select at least one user,please");
      return;
    }

    this.selection.selected.forEach(element => {
      let user_id_ = element['id'];
      // let user_id_ = element[0];
      let u_enable = element["enabled"];
      // let u_enable = element[4];
      element[4] = true;
      this.userService.enableUser(user_id_).subscribe(data => { },
        error => {
          element["enabled"] = u_enable;
          // element[4] = u_enable;
        }
      );;
    });
  }
  disableUser(){
    const numSelected = this.selection.selected.length;
    if (numSelected === 0) {
      alert("Select at least one user,please");
      return;
    }
    this.selection.selected.forEach(element => {
      let user_id_ = element['id'];
      // let user_id_ = element[0];
      let u_enable = element["enabled"];
      // let u_enable = element[4] 
      element[4] = false;
      this.userService.disableUser(user_id_).subscribe(data => { },
        error => {
          element["enabled"] = u_enable;
          // element[4] = u_enable;
        }
      );;
    });
  }
  deleteUser(){
    const numSelected = this.selection.selected.length;
    if (numSelected === 0) {
      alert("Select at least one user,please");
      return;
    }
    var tindex = this.getSelectedIndex();
    this.selection.selected.forEach(element => {
      // let user_id_ = element['id'];
      let user_id_ = element[0];
      this.dataSource.data.splice(tindex,1);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.selection = new SelectionModel<user>(true, []);

      this.userService.deleteUser(user_id_).subscribe(data => { },
        error => {
          
        }
      );;
    });
  }
  
  getSelectedIndex(){
    var sd = "";
    this.selection.selected.forEach(element => {
      sd = element[0];
    });
    var tindex = 0;
    this.dataSource.data.forEach((element,index) => {
      if(element[0] == sd ){
        tindex = index;
      }
    });
    return tindex;
  }

  addUser(){
    let dialogRef = this.dialog.open(AddNewUserComponent, {

      height: '400px',
      width: '600px',

      data: { selected: this.selection.selected }
    });

    dialogRef.afterClosed().subscribe(result => {

    }, error => {

    }

    );
  }

}
