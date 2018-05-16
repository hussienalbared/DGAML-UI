import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-account-detail-search',
  templateUrl: './account-detail-search.component.html',
  styleUrls: ['./account-detail-search.component.css']
})
export class AccountDetailSearchComponent implements OnInit {

 
result:any=[]
constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router) { }

ngOnInit() {
  
this.route.paramMap.subscribe(params=>{
  
let accountNumber=params.get("accountNumber");


let Url="http://localhost:8081/aml/api/account/accountDetail?accountNumber="+accountNumber;
this.http.get(Url).subscribe(data=>{

 this.result=data;
})
})
}




}
