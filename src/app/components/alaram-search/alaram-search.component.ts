import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable"
import { alaram } from '../models/alaram.model';

@Component({
  selector: 'app-alaram-search',
  templateUrl: './alaram-search.component.html',
  styleUrls: ['./alaram-search.component.css']
})
export class AlaramSearchComponent implements OnInit {
  AlarmId: string = '';
  AlarmStatus: string = '';
  MoneyLaunderingRisk: string = '';
  CreateDate: string = '';
  CreateDateFrom: string = '';
  CreateDateTo: string = '';
  RunDateFrom:String='';
  RunDateTo:String='';
  ScenarioName: string = '';
  ScenarioId: string = '';
  result: alaram[];
  dataSource: any = null;

  displayedColumns = ['alarmId', 'alarmStatusCode', 'moneyLaunderingRiskScore',
    'createDate', 'runDate', 'routineName', 'routineId'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  onClickSubmit(data) {

    let url = "http://localhost:8081/aml/api/alaram/allalarams?AlarmId=" + this.AlarmId + "&AlarmStatus=" + this.AlarmStatus +
      "&MoneyLaunderingRisk=" + this.MoneyLaunderingRisk + "&CreateDateFrom=" + this.CreateDateFrom
      + "&CreateDateTo=" + this.CreateDateTo
      + "&RunDateFrom=" + this.RunDateFrom + "&RunDateTo=" + this.RunDateTo +"&ScenarioName=" + this.ScenarioName +
      "&ScenarioId=" + this.ScenarioId
      ;

    this.http.get<alaram[]>(url).subscribe(data => {
      this.result = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

  }
 
}
