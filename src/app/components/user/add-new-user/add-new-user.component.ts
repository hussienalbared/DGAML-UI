import { ToastsManager } from 'ng2-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { group } from './../../models/group.model';
import { GroupService } from './../../../services/group.service';
import { UserService } from './../../../services/user.service';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { environment } from '../../../../environments/environment';import { TranslateService } from '@ngx-translate/core';
  @Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {

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
    public translate: TranslateService,
    private groupservice:GroupService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this.groupservice.getAllGroups().subscribe(data=>{
      this.groups=data;
    })
  }

  addUser(x){
    
    
    
    
    
    
    
    

    this.selectedGroups = this.groups[0];

    this.userService.addNewUser(x.username,x.DisplayName,x.password,x.firstname,x.lastname,x.email,true,
                                x.lastPasswordResetDate,x.selectedGroups).subscribe(data => {
                                  if(this.translate.getDefaultLang() == 'en')
                                    this.toastr.success('User Addedd Successfully', 'Success')
                                  else 
                                    this.toastr.success('تم اضافه المستخدم', 'تمت العمليه بنجاح')
                                },
                                  err => {
                                    console.log("Error occured!");
                                    if(this.translate.getDefaultLang() == 'en')
                                      this.toastr.error('Operation fail!', 'Oops!')
                                    else 
                                      this.toastr.error('هناك خطأ, تأكد من اتصالك بالانترنت او السيرفر ', 'Oops!');
                                  })
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
