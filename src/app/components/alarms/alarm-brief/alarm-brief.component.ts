import { Component, OnInit, ViewChild } from '@angular/core';
import { Element } from '@angular/compiler';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { SelectCloseReasonComponent } from '../select-close-reason/select-close-reason.component';
import { SuspectsService } from '../../../services/suspects.service';

@Component({
  selector: 'app-alarm-brief',
  templateUrl: './alarm-brief.component.html',
  styleUrls: ['./alarm-brief.component.css']
})
export class AlarmBriefComponent implements OnInit {

  displayedColumns = ['select', 'alarmId', 'primaryObjLevelCode', 'routineName',
    'routineCategoryCode', 'routineDescription', 'runDate'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  key: string = '';
  code: string = '';
  selection = new SelectionModel<any>(true, []);
  // datasource: any = [];
  dataSource3:any=[];
  processed: Element2[] = [];
  // processed:any=[];
  selectedAlarms: Element2[] = [];
  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router,
    public dialog: MatDialog,
  private suspectService:SuspectsService) {


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
    let Url = "http://localhost:8081/aml/api/v1/alarms?key=" + this.key + "&code=" + this.code;
    this.http.get(Url).subscribe(data => {
      // this.datasource = data["acAlarm"];
      this.dataSource3 = data["acAlarm"];
console.log(this.dataSource3.length+"fggggggggg")
      // this.processData();
      this.dataSource3 = new MatTableDataSource(this.dataSource3);
      this.dataSource3.sort = this.sort;
      this.dataSource3.paginator = this.paginator;


    });

  }
  initilizeElment(): Element2 {
    return {
      alarmId: 0, primaryObjLevelCode: '', routineCategoryCode: '',
      routineDescription: '', routineName: '', runDate: ''
    };
  }

  // processData() {
  //   this.datasource.forEach((alarm) => {
  //     if (alarm.acroutine.length == 0) {
  //       var x: Element2 = this.initilizeElment();
  //       x.alarmId = alarm.alarmId;
  //       x.primaryObjLevelCode = alarm.primaryObjLevelCode;
  //       x.routineName = alarm.routineName;
  //       x.runDate = alarm.runDate;

  //       this.processed.push(x);

  //     }

  //     alarm.acroutine.forEach((ac) => {
  //       var x: Element2 = this.initilizeElment();
  //       x.routineCategoryCode = ac.routineCategoryCode;
  //       x.routineDescription = ac.routineDescription;

  //       x.alarmId = alarm.alarmId;
  //       x.primaryObjLevelCode = alarm.primaryObjLevelCode;
  //       x.routineName = alarm.routineName;
  //       x.runDate = alarm.runDate;

  //       this.processed.push(x);
  //     });


  //   })

  //   this.datasource = this.processed;
  // }

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

      data: { selected: this.selection.selected }
    });

    dialogRef.afterClosed().subscribe
      (
        result =>
         
        {

            if (dialogRef.componentInstance.isConfirmed)
{


          //close alarms
          this.selection.selected.forEach(
            a => {

              this.suspectService.changeAlarmStatuseById(a.alarmId,eventType)
           
             
              let event = {
                "create_user_id": "45",
                "event_type_code": eventType,
                "event_description": dialogRef.componentInstance.description,
                "alarm_id": a.alarmId
              }
              this.suspectService.addalarmEvent(event)
             
            })

          //update alert count

          let url = "http://localhost:8081/aml/api/alaram/updateAlertCountApi?key="
            + this.key + "&code=" + this.code;

          this.http.put(url, []).subscribe(data => {


          })
        }
      else{
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
  alarmId: number;
  primaryObjLevelCode: string;
  routineName: string;
  routineCategoryCode: string;
  routineDescription: string;
  runDate: string;

}
// export interface Element1{
//   acAlarm:any;
// }
