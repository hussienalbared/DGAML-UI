import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { SearchAccountService } from '../search-account.service';
import { Http , Response} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

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
result:any;

  constructor(private http : HttpClient) { }

  ngOnInit() {
    // this.accountType=this.myservice.showTodayDate();
    
    }
  onClickSubmit(data) {
   


 

    let url="http://localhost:8081/aml/api/account/searchAccount?AccountNumber="+this.accountNumber+"&AccountName="+this.accountName+"&AccountType="+this.accountType
    +"&AccountOpenDate="+this.accountOpenDate+"&AccountCloseDate="+this.accountCloseDate
                                                                      
    ;
    
    this.http.get(url).subscribe(data => {
    this.result=data;
  this.resetFields();
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
