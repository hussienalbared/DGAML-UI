import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
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
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient

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

      let suspectKey = element["id"]["objKey"]
      let code = element["id"]["objLevelCode"]
      let oldName = element["complianceUserid"]
      element["complianceUserid"] = this.name;

      element["id"]["objKey"]
      let url = "http://localhost:8081/aml/api/v1/updateUser?key=" + suspectKey +
        "&code=" + code + "&user=" + this.name;
      this.http.put(url, []).subscribe(data => {
      }, error => {
        element["complianceUserid"] = oldName;
      }
      );

    });
    this.dialogRef.close();
    // this.router.navigate(['suspects']);


  }
  ngOnInit() {
  }

}
