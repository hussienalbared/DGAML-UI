import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-select-close-reason',
  templateUrl: './select-close-reason.component.html',
  styleUrls: ['./select-close-reason.component.css']
})
export class SelectCloseReasonComponent implements OnInit {
  isOther: boolean = false;
  description: string = '';
  choose: string = '';
  constructor(

    public dialogRef2: MatDialogRef<SelectCloseReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient

  ) { }

  ngOnInit() {
  }
  openOther() {
    this.isOther = true;
  }
  closeOther() {
    this.isOther = false;
  }
  confirm() {

    if (this.choose === 'other' && this.description === '') {

      return;
    }
    if (this.choose === '') {
      this.dialogRef2.close();
      return;
    }
    if (this.choose != 'other') {
      this.description = this.choose;
    }
   
    this.data["selected"].forEach(
      element =>
      
      {
       //close alarms

        /*  let url = "http://localhost:8081/aml/api/alaram/closeAlarmById?alarmId=" + element["alarmId"];

        this.http.put(url, []).subscribe(data => {

        })*/
        //add event for each closed alarm
      /*  let UrlAdd = "http://localhost:8081/aml/api/v1/alarmEvent/add";
        let event = {
          "create_user_id": "45",
          "event_type_code": 'cls',
          "event_description": this.description,
          "alarm_id": element["alarmId"]
        }
        this.http.post(UrlAdd, event).subscribe(data => {


        })*/

      });

    this.dialogRef2.close();

  }



  close() {

    this.dialogRef2.close();

  }
}
