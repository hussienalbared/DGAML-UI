import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-alarm-detail-1',
  templateUrl: './alarm-detail-1.component.html',
  styleUrls: ['./alarm-detail-1.component.css']
})
export class AlarmDetail1Component implements OnInit {
  displayedColumns=['RoutineName','RoutineDescription','RunDate']
  displayedColumns2=['acctno','ttrn','cfdatekey','cfcurramount','transaction_cdi_des','ttds']
  dataSource:any=[];
  dataSource2:any=[];
  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router  ) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe(params=>{

      let alarmid=params.get("alarmId")
    
      let url="http://localhost:8081/aml/api/alaram/AlarmDetailSection1?alarmId="+alarmid
      this.http.get(url).subscribe(data=>{
        this.dataSource=data;
      })
      let url2="http://localhost:8081/aml/api/alaram/AlarmDetailSection2?alarmId="+alarmid
      this.http.get(url2).subscribe(data=>{
        this.dataSource2=data;
      })

    })
 


  }

}
