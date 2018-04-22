import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
// import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable"
import { suspect } from '../../../models/suspect.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ForwardComponent } from '../forward/forward.component';
import { element, error } from 'protractor';
@Component({
  selector: 'app-suspects',
  templateUrl: './suspects.component.html',
  styleUrls: ['./suspects.component.css']
})
export class SuspectsComponent implements OnInit {
  result: suspect[];
  selectedSuspect: suspect[] = [];
  dataSource: any = null;
  displayedColumns = ['select', 'No', 'Number of Alarm', 'Suspect Name', 'RIM Number',
    'Profile Risk', 'Oldest Alarm', 'User'];
  selection = new SelectionModel<suspect>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private router: Router
    , public dialog: MatDialog
  ) { }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  nAllSelected() {
    this.selectedSuspect = [];
    this.selection.selected.forEach(a =>
      this.selectedSuspect.push(a)
    )

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
    this.nAllSelected();
    let dialogRef = this.dialog.open(ForwardComponent, {

      height: '400px',
      width: '600px',

      data: { selected: this.selectedSuspect }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(dialogRef.componentInstance.name);
      //  location.reload();
    }, error => {

    }

    );
  }
  removeOwnerShip() {

    this.nAllSelected();
    this.selectedSuspect.forEach(element => {
      // console.log(element["objName"]);
      let code = element["id"]["objLevelCode"];
      let key = element["id"]["objKey"];
      let oldcomplianceUserid = element["complianceUserid"];
      element["complianceUserid"] = null;
      let url = "http://localhost:8081/aml/api/v1/removeOwnerShip?key=" + key + "&code=" + code;
      this.http.put(url, []).subscribe(data => { }
        , error => {
          element["complianceUserid"] = oldcomplianceUserid;
        }
      );
    }
    )

  }
  takeOwnerShip() {

    this.nAllSelected();
    this.selectedSuspect.forEach(element => {
      // console.log(element["objName"]);
      let code = element["id"]["objLevelCode"];
      let key = element["id"]["objKey"];
      let oldcomplianceUserid = element["complianceUserid"];
      element["complianceUserid"] = "Admin";
      let url = "http://localhost:8081/aml/api/v1/updateUser?key=" + key +
        "&code=" + code + "&user=" + element["complianceUserid"];
      this.http.put(url, []).subscribe(data => { }
        , error => {
          element["complianceUserid"] = oldcomplianceUserid;
        }
      );
    }
    )
  }
 closeAllAlarms() 
  {
    this.nAllSelected();
    this.selectedSuspect.forEach(element => {

      let code = element["id"]["objLevelCode"];
      let key = element["id"]["objKey"];
      let oldcomplianceUserid = element["alertCount"];
      let url = "http://localhost:8081/aml/api/v1/closeAllSuspectAlarms?"
        + "key=" + key + "&code=" + code;
        // this.http.get(url).subscribe(data => {
        //   //set alert count of suspect to zero
        //           element["alertCount"] = '0';
        //         }
        //          )
  
      element.acAlarm.forEach(aaa=>{

        if(aaa["alarmStatusCode"]==='ACT'){
          let UrlAdd = "http://localhost:8081/aml/api/v1/alarmEvent/add";
          let event = {
            "create_user_id": "45",
            "event_type_code": 'cls',
            "event_description": "poooo",
            "alarm_id":aaa["alarmId"]
          }
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              
              
            })
          }
         this.http.put(UrlAdd,event).subscribe(data => {
 console.log(data);
  
          },
          err => {
            console.log("Error occured");
          })
          
        }
      })
      

      
 

    }


    );

  }
  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
}
