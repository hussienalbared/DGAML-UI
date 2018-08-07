import { ToastsManager } from 'ng2-toastr';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Element } from '@angular/compiler';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { SelectCloseReasonComponent } from '../select-close-reason/select-close-reason.component';
import { SuspectsService } from '../../../services/suspects.service';

import { environment } from '../../../../environments/environment'; import { NotificationService } from '../../../services/notification.service';
import { NgProgress } from 'ngx-progressbar';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-alarm-brief',
  templateUrl: './alarm-brief.component.html',
  styleUrls: ['./alarm-brief.component.css']
})
export class AlarmBriefComponent implements OnInit {

  displayedColumns = ['select', 'alarm_Id', 'prim_Obj_level_Cd', 'routine_Name',
    'acroutine.routine_Categ_Cd', 'acroutine.routine_Desc', 'run_Date'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  key: string = '';
  code: string = '';
  selection = new SelectionModel<any>(true, []);
  dataSourceLength:number=0

  dataSource3 = new MatTableDataSource([]);
  selectedAlarms: Element2[] = [];
  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public translate: TranslateService,
    private suspectService: SuspectsService,
    private notification: NotificationService, public ngProgress: NgProgress,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);

  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource3.data.length;
    return numSelected === numRows;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource3.data.forEach(row => this.selection.select(row));
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.key = params.get('obj_key');
      this.code = params.get('obj_level_code');
      this.getAlarms();

    });


  }
  getAlarms() {
    let Url = environment.ipAddress + "/aml/api/v1/alarms?key=" + this.key + "&code=" + this.code;
    this.http.get(Url).subscribe(data => {
     
      this.dataSource3.data=data["acAlarm"];
      this.dataSourceLength=this.dataSource3.data.length;
      console.log(this.dataSourceLength);
      this.dataSource3.sort = this.sort;
      this.dataSource3.paginator = this.paginator;

    });

  }
  initilizeElment(): Element2 {
    return {
      alarm_Id: 0, prim_Obj_level_Cd: '', routine_Categ_Cd: '',
      routine_Desc: '', routine_Name: '', run_Date: ''
    };
  }

  suppressAlarm() {
    this.changeAlarmStatus('SUP')
  }

  closeAlarm() {
    this.changeAlarmStatus('CLS')

  }

  //close alarm
  changeAlarmStatus(eventType: string) {
    const numSelected = this.selection.selected.length;
    if (numSelected == 0) {
      alert("Select at least one suspect,please");
      return;
    }


    //select reason for close

    let dialogRef = this.dialog.open(SelectCloseReasonComponent, {

      height: '400px',
      width: '600px',
      // selected: this.selection.selected
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

      this.dialog.closeAll();
      if (dialogRef.componentInstance.isConfirmed) {


        //close alarms

        this.selection.selected.forEach(
          (a, index) => {

            // 


            // 
            this.suspectService.changeAlarmStatuseById(a.alarm_Id, eventType)


            let event = {
              "create_user_id": "45",
              "event_type_code": eventType,
              "event_description": dialogRef.componentInstance.description,
              "alarm_id": a.alarm_Id
            }
            this.dataSource3.data = this.dataSource3.data.filter(item => item !== a);


            this.suspectService.addalarmEvent(event).subscribe(data => {
              let x;
              if (eventType === 'CLS')
                x = 'Close-alarm'
              else
                x = 'Suppress-alarm';
              this.notification.alarmNotification(a.alarm_Id, x, localStorage.getItem('id'))

              if (this.translate.getDefaultLang() == 'en')
                this.toastr.success(`${x} done succssefully `, 'Success!');
              else
                this.toastr.success(`${x} تمت بنجاح `, 'تم بنجاح!')
            },
              err => {

              })

          })


        this.selection = new SelectionModel<Element>(true, []);

        //update alert count

        let url = environment.ipAddress + "/aml/api/alaram/updateAlertCountApi?key="
          + this.key + "&code=" + this.code;

        this.http.put(url, []).subscribe(data => {

        })
      }
      else {
        alert('nothing selected')
      }
    },
      error => {
        alert("Error")

      }




    );




  }


}



export interface Element2 {
  alarm_Id: number;
  prim_Obj_level_Cd: string;
  routine_Name: string;
  routine_Categ_Cd: string;
  routine_Desc: string;
  run_Date: string;

}

