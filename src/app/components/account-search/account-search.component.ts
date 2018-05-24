import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Http , Response} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource ,MatSort} from '@angular/material';

import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable"
import { account } from '../models/account.model';
import { TabsServiceService } from '../../services/tabs-service.service';
import { tab } from '../models/tab.model';

@Component({
  selector: 'app-account-search',
  templateUrl: './account-search.component.html',
  styleUrls: ['./account-search.component.css']
})
export class AccountSearchComponent implements OnInit {
accountOpenDate:string='';
accountCloseDate:string='';
accountName:string='';
accountNumber:string='';
accountType:string='';
result: account[];
dataSource:any=null;

displayedColumns = ['acct_No', 'acct_Name', 'acct_Type_Desc', 'acct_Open_Date', 'acct_Close_Date'];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
  constructor(private http : HttpClient) { }

  ngOnInit() {
    // this.accountType=this.myservice.showTodayDate();
    
    }
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  onClickSubmit(data) {
   


 

    let url="http://localhost:8081/aml/api/account/searchAccount?AccountNumber="+this.accountNumber+"&AccountName="+this.accountName+"&AccountType="+this.accountType
    +"&AccountOpenDate="+this.accountOpenDate+"&AccountCloseDate="+this.accountCloseDate
                                                                      
    ;
    
    this.http.get<account[]>(url).subscribe(data => {
      this.result = data;
     this.dataSource = new MatTableDataSource(data);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
    });
    
  
 }
 
 resetFields()
 {this.accountCloseDate='';
 this.accountName='';
 this.accountOpenDate='';
 this.accountNumber='';
 this.accountType='';
 
   
 }

}
