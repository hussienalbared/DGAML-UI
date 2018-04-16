import { Component, OnInit, ViewChild } from '@angular/core';
import { Element } from '@angular/compiler';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-alarm-brief',
  templateUrl: './alarm-brief.component.html',
  styleUrls: ['./alarm-brief.component.css']
})
export class AlarmBriefComponent implements OnInit {
 
  displayedColumns = ['alarmId', 'primaryObjLevelCode', 'routineName',
    'routineCategoryCode', 'routineDescription', 'runDate'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
  datasource:any=[];
  processed:Element2[]=[];
  // processed:any=[];
  constructor(private http:HttpClient,
    private route: ActivatedRoute,private router: Router) {


  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let key=params.get('obj_key');
      let code=params.get('obj_level_code');
      this.getAlarms(key,code);  
    });


  }
  getAlarms(key,code)
  {
    let Url="http://localhost:8081/aml/api/v1/alarms?key="+key+"&code="+code;
    this.http.get(Url).subscribe(data => {
  this.datasource=data["acAlarm"];
 

   this.processData();
   this.datasource = new MatTableDataSource(this.datasource);
   this.datasource.sort = this.sort;
   this.datasource.paginator = this.paginator;
  //  this.dataSource.sort = this.sort;
   
    });

  }
initilizeElment():Element2{
return  {
  alarmId: 0, primaryObjLevelCode: '', routineCategoryCode: '',
  routineDescription: '', routineName: '', runDate: ''
};
}

  processData() {
    this.datasource.forEach((alarm) => {
    if(alarm.acroutine.length==0)
    
    {
    var x: Element2 = this.initilizeElment();
   x.alarmId = alarm.alarmId;
   x.primaryObjLevelCode = alarm.primaryObjLevelCode;
   x.routineName = alarm.routineName;
   x.runDate = alarm.runDate;

  this.processed.push(x);

}

      alarm.acroutine.forEach((ac) => {
        var x: Element2 = this.initilizeElment();
        x.routineCategoryCode = ac.routineCategoryCode;
        x.routineDescription = ac.routineDescription;

        x.alarmId = alarm.alarmId;
        x.primaryObjLevelCode = alarm.primaryObjLevelCode;
        x.routineName = alarm.routineName;
        x.runDate = alarm.runDate;

        this.processed.push(x);
      });


    })
 
    this.datasource = this.processed;
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
