import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { externalParty } from '../models/externalParty.model';
@Component({
  selector: 'app-external-party-search',
  templateUrl: './external-party-search.component.html',
  styleUrls: ['./external-party-search.component.css']
})
export class ExternalPartySearchComponent implements OnInit {

  ExtPartynumber: String = '';
  ExtPartyId: String = '';
  ExtPartyFullName: String = '';
  ExtPartyIdCountryCode: String = '';
  result: externalParty[];
  dataSource: any = null;
  displayedColumns = [
    'ext_Full_Name',
    'ext_Cust_No',
    'Address',
    'city_Name',
    'ext_Birth_Date',
    'cntry_Name',
    'ident_Type_Desc',
    'ident_Id',
    // 'exptel1',
    'TEL'
  ];
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
    let url = "http://localhost:8081/aml/api/externalParty/all?ExtPartynumber=" + this.ExtPartynumber +
      "&ExtPartyId=" + this.ExtPartyId + "&ExtPartyFullName=" + this.ExtPartyFullName +
      "&ExtPartyIdCountryCode=" + this.ExtPartyIdCountryCode;
    this.http.get<externalParty[]>(url).subscribe(data => {
      this.result = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
  }

}
