import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsServiceService } from '../../../services/tabs-service.service';

@Component({
  selector: 'app-section3',
  templateUrl: './section3.component.html',
  styleUrls: ['./section3.component.css']
})
export class Section3Component implements OnInit {

  dataSource :any/*= ELEMENT_DATA*/;
  result: TransactionBrief[];
  displayedColumns = ['ACCTNO', 'AcctKey','TTRN', 'CFDATEKEY', 'CFCURRAMT','transaction_cdi_desc','RTTDS'];
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
      let accountNumber=params.get('accountNumber');
   
      this.getData(accountNumber);  
    });
  }
  getData(number){
    let Url="http://localhost:8081/aml/api/account/accountDetailSection3?accountNo="+number;
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