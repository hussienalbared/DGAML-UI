import { ToastsManager } from 'ng2-toastr';
import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RiskService } from '../../../services/risk.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { environment } from '../../../../environments/environment';import { NotificationService } from '../../../services/notification.service';
  @Component({
  selector: 'app-risk-forward',
  templateUrl: './risk-forward.component.html',
  styleUrls: ['./risk-forward.component.css']
})
export class RiskForwardComponent implements OnInit {
  name: string = '';
  numSuspected: number = 0;
  users:string[]=[];
  myControl: FormControl = new FormControl();
  constructor(
    public dialogRef: MatDialogRef<RiskForwardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient,private riskService:RiskService,
    private notification:NotificationService,public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.numSuspected = this.data["selected"].length;
      console.log(this.data["selected"][0]);

      this.toastr.setRootViewContainerRef(vcr);
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

      let riskKey = element["risk_Assmnt_Id"];
      let oldName = element["owner_User_Long_Id"]
      element["owner_User_Long_Id"] = this.name;

      this.riskService.forwardrisk(riskKey,this.name)
      .subscribe(data => {
          this.notification.riskNotifiction(riskKey,'Forward-Risk',this.name,localStorage.getItem('id'))

          this.toastr.success('operation completed successfully', 'Success!');
      }, error => {
        element["owner_User_Long_Id"] = oldName;

        this.toastr.error('Got an issue, check the connection ', 'Oops!');
      }
      );

    });
    this.dialogRef.close();


  }
  ngOnInit() {
    let url=environment.projectName+"/aml/api/user/users";
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
