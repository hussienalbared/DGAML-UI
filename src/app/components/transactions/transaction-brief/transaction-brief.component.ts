import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';


import { environment } from '../../../../environments/environment';
import { NgProgress } from 'ngx-progressbar';
@Component({
  selector: 'app-transaction-brief',
  templateUrl: './transaction-brief.component.html',
  styleUrls: ['./transaction-brief.component.css']
})
export class TransactionBriefComponent implements OnInit {
  dataSource=new MatTableDataSource([]) ;
  
  displayedColumns = ['acct_Key', 'trans_Ref_No', 'trans_Desc', 'ccy_Amt', 'date_Key', 'trans_Cr_Db_Ind_Desc'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router,
    public ngProgress: NgProgress
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      let number = params.get('obj_key');

      this.getData(number);
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getData(number) {
    let Url = environment.projectName + "/aml/api/suspectedTransaction/all?partyNumber=" + number;
    this.http.get<TransactionBrief[]>(Url).subscribe(data => {
      console.log('abc');
      console.log(this.dataSource);
      this.dataSource.data =data;
    
      console.log('abc');
      console.log(this.dataSource);

    });

  }


}
export interface TransactionBrief {
  acct_Key: string,
  trans_Ref_No: string,
  date_Key: string,
  ccy_Amt: string,
  trans_Cr_Db_Ind_Desc: string,
  trans_Desc: string

}