import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { environment } from '../../../../environments/environment';  @Component({
  selector: 'app-alarm-detail-1',
  templateUrl: './alarm-detail-1.component.html',
  styleUrls: ['./alarm-detail-1.component.css']
})
export class AlarmDetail1Component implements OnInit {
  displayedColumns=['RoutineName','RoutineDescription','alarm message','RunDate']
  displayedColumns2=['acct_Key','trans_Ref_No','date_Key','ccy_Amt','trans_Cr_Db_Ind_Desc','trans_Desc']
  dataSource:any=[];
  dataSource2 = new MatTableDataSource([]);
 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router  ) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe(params=>{

      let alarmid=params.get("alarmId")
    
      let url=environment.projectName+"/aml/api/alaram/AlarmDetailSection1?alarmId="+alarmid
      this.http.get(url).subscribe(data=>{
        this.dataSource=data;
        this.dataSource.sort = this.sort;
       
      
      })
      let url2=environment.projectName+"/aml/api/alaram/AlarmDetailSection2?alarmId="+alarmid
      this.http.get<any>(url2).subscribe(data=>{
        this.dataSource2 = new MatTableDataSource();
        this.dataSource2.data = data;
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator;
      })

    })
 


  }

}
