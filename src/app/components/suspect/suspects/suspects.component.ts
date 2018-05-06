import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
// import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { suspect } from '../../../models/suspect.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ForwardComponent } from '../forward/forward.component';
import { element, error } from 'protractor';
import { SelectCloseReasonComponent } from '../../alarms/select-close-reason/select-close-reason.component';
import { SuspectsService } from '../../../services/suspects.service';
@Component({
  selector: 'app-suspects',
  templateUrl: './suspects.component.html',
  styleUrls: ['./suspects.component.css']
})
export class SuspectsComponent implements OnInit {
  result: suspect[];
 
  dataSource: any = null;
  displayedColumns = ['select', 'No', 'Number of Alarm', 'Suspect Name', 'RIM Number',
    'Profile Risk', 'Oldest Alarm', 'User'];
  selection = new SelectionModel<suspect>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private router: Router
    , public dialog: MatDialog,private suspectService:SuspectsService
  ) { }

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

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': +'\'' + localStorage.getItem('token') + '\''
      }),
    };
    console.log('httpOptions:' + httpOptions);
    let url = "http://localhost:8081/aml/api/v1/suspectedObject";
    this.http.get<suspect[]>(url).subscribe(data => {
      this.result = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }
  getSuspectDetail(alarm) {


    this.router.navigate(['suspectDetail/' + alarm.id.objKey + "/" + alarm.id.objLevelCode + "/" + alarm.objNumber]);
  }

  openDialog(): void {
    const numSelected = this.selection.selected.length;
    if (numSelected == 0) {
      alert("Select at least one suspect,please");
      return;
    }
   
    let dialogRef = this.dialog.open(ForwardComponent, {

      height: '400px',
      width: '600px',

      data: { selected: this.selection.selected }
    });

    dialogRef.afterClosed().subscribe(result => {
   
    }, error => {

    }

    );
  }
  removeOwnerShip() {
this.suspectService.removeOwnerShip(this.selection.selected);
     }
  takeOwnerShip() {

    
    this.selection.selected.forEach(
      element => {
   
      let code = element["id"]["objLevelCode"];
      let key = element["id"]["objKey"];
      let oldcomplianceUserid = element["complianceUserid"];
      element["complianceUserid"] = "Admin";
     
     
      this.suspectService.takeOwnerShipService(key,code,element["complianceUserid"]).subscribe(data => { }
        , error => {
          element["complianceUserid"] = oldcomplianceUserid;
        }
      );
    }
    )
  }
  //close all alrams
  closeAlarms() {

    this.changeAlarmStatus('CLS');
  }
  //suppress all alarms
  suppressAlarms() {
    console.log("suppress all alarms")
    this.changeAlarmStatus('SUP');

  }
  //change alarm status(close or supress)
  changeAlarmStatus(eventType: string) {

    const numSelected = this.selection.selected.length;
    if (numSelected == 0) {
      alert("Select at least one suspect,please");
      return;
    }
    let dialogRef = this.dialog.open(SelectCloseReasonComponent, {

      height: '400px',
      width: '600px',

      data: { selected: this.selection.selected }
    });

    dialogRef.afterClosed().subscribe(result => {
      //reason for close or suppressed an alarms returned from dialog
      if (dialogRef.componentInstance.isConfirmed) {

        let reason = dialogRef.componentInstance.description;


        this.selection.selected.forEach(element => {

          let code = element["id"]["objLevelCode"];
          let key = element["id"]["objKey"];
          let oldcomplianceUserid = element["alertCount"];
          let url = "http://localhost:8081/aml/api/v1/closeAllSuspectAlarms?"
            + "key=" + key + "&code=" + code + "&eventType=" + eventType;
          this.http.get(url).subscribe(data => {
            //set alert count of suspect to zero
            element["alertCount"] = '0';
          }
          )

          element.acAlarm.forEach(aaa => {

            let UrlAdd = "http://localhost:8081/aml/api/v1/alarmEvent/add";
            let event = {
              "create_user_id": "45",
              "event_type_code": eventType,
              "event_description": reason,
              "alarm_id": aaa["alarmId"]
            }

            this.http.put(UrlAdd, event, { responseType: "text" }).subscribe(data => {
              console.log(data);

            },
              err => {
                console.log("Error occured");
              })


          })





        }


        );

      }
      else {
        alert('nothing selected')
      }
    }, error => {

    }

    );


  }

}
