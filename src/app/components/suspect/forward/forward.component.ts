import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SuspectsService } from '../../../services/suspects.service';
@Component({
  selector: 'app-forward',
  templateUrl: './forward.component.html',
  styleUrls: ['./forward.component.css']
})
export class ForwardComponent implements OnInit {
  name: string = '';
  numSuspected: number = 0;
  constructor(
    public dialogRef: MatDialogRef<ForwardComponent>,
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
  forward() {
    if (this.name === '') {
      console.log("please select user");
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
      }, error => {
        element["owner_UID"] = oldName;
      }
      );

    });
    this.dialogRef.close();


  }
  ngOnInit() {
  }

}
