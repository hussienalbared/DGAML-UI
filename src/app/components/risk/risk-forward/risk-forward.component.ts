import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RiskService } from '../../../services/risk.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient,private riskService:RiskService) {
      this.numSuspected = this.data["selected"].length;
      console.log(this.data["selected"][0]);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  cancel() {
    this.name = '';
    this.dialogRef.close();

  }
  isNameComplete(name){
    console.log(name)
    return this.users.indexOf(name)
  }
  forward() {
    if (this.name === ''||this.users.indexOf(this.name)<0) {
      console.log("please select user");
      this.dialogRef.close();
      return;

    }

    this.data["selected"].forEach(element => {

      let riskKey = element["risk_Assmnt_Id"];
      let oldName = element["owner_User_Long_Id"]
      element["owner_User_Long_Id"] = this.name;

      this.riskService.forwardrisk(riskKey,this.name)
      .subscribe(data => {
      }, error => {
        element["owner_User_Long_Id"] = oldName;
      }
      );

    });
    this.dialogRef.close();


  }
  ngOnInit() {
    let url="http://localhost:8081/aml/api/user/users";
    this.http.get<string[]>(url).subscribe(data=>{
      this.users=data;
      console.log(this.users)
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
