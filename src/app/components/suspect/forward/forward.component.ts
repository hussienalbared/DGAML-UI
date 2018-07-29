import { user } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import { NotificationService } from './../../../services/notification.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SuspectsService } from '../../../services/suspects.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { environment } from '../../../../environments/environment';  @Component({
  selector: 'app-forward',
  templateUrl: './forward.component.html',
  styleUrls: ['./forward.component.css']
})
export class ForwardComponent implements OnInit {
  name: string = '';
  numSuspected: number = 0;
  users:string[]=[];
  myControl: FormControl = new FormControl();
  constructor(
    public dialogRef: MatDialogRef<ForwardComponent>,
    private notification:NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient,private suspectService:SuspectsService

  ) {
    this.numSuspected = this.data["selected"].length;
  }
  onNoClick(): void {
    this.dialogRef.close();

  }

  cancel() {
    this.name = '';
    this.dialogRef.close();

  }
  isNameComplete(name){
    
   return this.users.indexOf(name)

  }
  forward() {
    if (this.name === ''||this.users.indexOf(this.name)<0) {
      
      this.dialogRef.close();
      return;

    }

    this.data["selected"].forEach(element => {

      let suspectKey = element["id"]["alarmed_Obj_Key"]
      let code = element["id"]["alarmed_Obj_level_Cd"]
      let oldName = element["owner_UID"]
      element["owner_UID"] = this.name;

      element["id"]["alarmed_Obj_Key"]
    
        this.suspectService.forwardSuspect(suspectKey,code,this.name)
      .subscribe(data => {
        // forward Notification
        this.notification.suspectForwardNoti(code,suspectKey,'Forward-suspect',localStorage.getItem('id'),this.name)
      }, error => {
        element["owner_UID"] = oldName;
      }
      );

    });
    this.dialogRef.close();


  }
  ngOnInit() {
    let url=environment.ipAddress+"/aml/api/user/users";
    this.http.get<string[]>(url).subscribe(data=>{
this.users=data;

this.filteredOptions = this.myControl.valueChanges
.pipe(
  startWith(''),
  map(val => this.filter(val))
);
    })
  }
  
  filteredOptions: Observable<string[]>;



  filter(val: string): string[] {
    return this.users.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

}
