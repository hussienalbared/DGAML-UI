import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-transaction-brief',
  templateUrl: './transaction-brief.component.html',
  styleUrls: ['./transaction-brief.component.css']
})
export class TransactionBriefComponent implements OnInit {
  dataSource :any/*= ELEMENT_DATA*/;
  result: TransactionBrief[];
  displayedColumns = ['ACCTNO', 'TTRN', 'CFDATEKEY', 'CFCURRAMT','transaction_cdi_desc','RTTDS'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(private http:HttpClient,
    private route: ActivatedRoute,private router: Router
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      let number=params.get('obj_key');
   
      this.getData(number);  
    });
  }
  getData(number){
    let Url="http://localhost:8081/aml/api/suspectedTransaction/all?partyNumber="+number;
    this.http.get<TransactionBrief[]>(Url).subscribe(data=>{

      this.dataSource=data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
          });

  }
  

}
export interface TransactionBrief{
  acct_Key:string, 
  trans_Ref_No:string,
  date_Key:string, 
  ccy_Amt:string,
  trans_Cr_Db_Ind_Desc:string,
   trans_Desc:string

}