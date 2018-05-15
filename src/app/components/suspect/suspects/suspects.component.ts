import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
// import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ForwardComponent } from '../forward/forward.component';
import { element, error } from 'protractor';
import { SelectCloseReasonComponent } from '../../alarms/select-close-reason/select-close-reason.component';
import { SuspectsService } from '../../../services/suspects.service';
import { suspect } from '../../models/suspect.model';
@Component({
  selector: 'app-suspects',
  templateUrl: './suspects.component.html',
  styleUrls: ['./suspects.component.css']
})
export class SuspectsComponent implements OnInit {
  result: suspect[];
  IsLoaded=true;

  dataSource: any = null;
  displayedColumns = ['select', 'No', 'Number of Alarm', 'Suspect Name', 'RIM Number',
    'Profile Risk', 'Oldest Alarm', 'User'];
  selection = new SelectionModel<suspect>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private suspectService: SuspectsService
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

    this.suspectService.getAllSuspects().
      subscribe(data => {
     
        this.result = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.IsLoaded=false;

      });
  }
  getSuspectDetail(alarm) {
    this.router.navigate(['suspectDetail/' + alarm.id.objKey + "/" + alarm.id.objLevelCode + "/" + alarm.objNumber]);
  }

  openDialog(): void {
    const numSelected = this.selection.selected.length;
    if (numSelected === 0) {
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

        let code = element["id"]["alarmed_Obj_level_Cd"];
        let key = element["id"]["alarmed_Obj_Key"];
        let oldcomplianceUserid = element["owner_UID"];
        element['owner_UID'] = 'Admin';


        this.suspectService.takeOwnerShipService(key, code, element['owner_UID']).subscribe(data => { }
          , error => {
            element['owner_UID'] = oldcomplianceUserid;
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

    this.changeAlarmStatus('SUP');

  }
  //change alarm status(close or supress)
  changeAlarmStatus(eventType: string) {

    const numSelected = this.selection.selected.length;
    if (numSelected == 0) {
      alert('Select at least one suspect,please');
      return;
    }
    let dialogRef = this.dialog.open(SelectCloseReasonComponent, {

      height: '400px',
      width: '600px',

      data: { selected: this.selection.selected }
    });

    dialogRef.afterClosed().subscribe(
      result => {
      //reason for close or suppressed an alarms returned from dialog
      if (dialogRef.componentInstance.isConfirmed) {

        let reason = dialogRef.componentInstance.description;


        this.selection.selected.forEach(element => {

          let code = element['id']['alarmed_Obj_level_Cd'];
          let key = element['id']['alarmed_Obj_Key'];
          let oldcomplianceUserid = element['owner_UID'];
          console.log(code+"&&&&&&"+key+"%%%%"+oldcomplianceUserid)

          this.suspectService.changeAllSuspectAlarms(key, code, eventType).subscribe(data => {
            //set alert count of suspect to zero
            element['alarms_Count'] = '0';
          }
          )

          element.acAlarm.forEach(aaa => {

            let event = {
              'create_user_id': '45',
              'event_type_code': eventType,
              'event_description': reason,
              'alarm_id': aaa['alarm_Id']
            }
            this.suspectService.addalarmEvent(event)

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
