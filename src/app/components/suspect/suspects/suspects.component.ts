import { NotificationService } from './../../../services/notification.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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
import { NgProgress } from 'ngx-progressbar';
import {TranslateService} from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { environment } from '../../../../environments/environment';
import { ToastsManager } from 'ng2-toastr';
  @Component({
  selector: 'app-suspects',
  templateUrl: './suspects.component.html',
  styleUrls: ['./suspects.component.css']
})
export class SuspectsComponent implements OnInit {
  result: suspect[];
  IsLoaded=true;
  owner_UID_Name: string;

  dataSource: any = null;
  displayedColumns = ['select', 'cIndex', 'alarms_Count', 'alarmed_Obj_Name', 'alarmed_Obj_No',
    'risk_Score_Cd', 'age_Old_Alarm', 'owner_UID'];
  selection = new SelectionModel<suspect>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
  private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public translate: TranslateService,
    private suspectService: SuspectsService,public ngProgress: NgProgress,
    private userService: UserService,
    private notification: NotificationService,

    public toastr: ToastsManager, vcr: ViewContainerRef
  ) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

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
// this.ngProgress.start();
    this.suspectService.getAllSuspects().
      subscribe(data => {
      
        this.result = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.IsLoaded=false;
        // this.ngProgress.done();
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
    this.en_ar_Dialog();
  }
  en_ar_Dialog(){
     if($('.selected_Language').text() != "English")
         $('.forwardContainer').css('text-align', 'right' );
  }
  removeOwnerShip() {
    // this.suspectService.removeOwnerShip(this.selection.selected)
    this.selection.selected.forEach(element => {
 
      let code = element["id"]["alarmed_Obj_level_Cd"];
      let key = element["id"]["alarmed_Obj_Key"];
      let oldcomplianceUserid = element["owner_UID"];
      element["owner_UID"] = null;
      this.suspectService.removeOwnerShip(key, code, element['owner_UID']).subscribe(data => {
        // remove Owner
        this.notification.suspectNotification(code,key,'remove-ownership-suspect',localStorage.getItem('id'))

        this.toastr.success('You have been removed from the suspect', 'Success!');
       }
        , error => {
          element["owner_UID"] = oldcomplianceUserid;

          this.toastr.error('Got an issue, check the connection ', 'Oops!');
        }
      );
    }
    )
  }
  takeOwnerShip() {
    this.selection.selected.forEach(
      element => {

        let code = element["id"]["alarmed_Obj_level_Cd"];
        let key = element["id"]["alarmed_Obj_Key"];
        let oldcomplianceUserid = element["owner_UID"];
        element['owner_UID'] = this.authService.userName;


        this.suspectService.takeOwnerShipService(key, code, element['owner_UID']).subscribe(data => {
          this.notification.suspectNotification(code,key,'take-ownership-suspect',localStorage.getItem('id'))
          
          this.toastr.success('You have been assigned to the suspect', 'Success!');
          
        }
          , error => {
            element['owner_UID'] = oldcomplianceUserid;
            this.toastr.error('Got an issue, check the connection ', 'Oops!');
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
          

          this.suspectService.changeAllSuspectAlarms(key, code, eventType).subscribe(data => {

            let x;
            if(eventType==='CLS')
              x = 'close-suspect';
            else
              x='suppress-suspect';
            this.notification.suspectNotification(code,key,x,localStorage.getItem('id'))

            this.toastr.success(`${x} done sucssefully `, 'Success!');
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
      this.toastr.error('Got an issue, check the connection ', 'Oops!');
    }

    );


  }
  exportAsCSV(){
  
    new Angular5Csv(this.result,'My Report');
  }

}
