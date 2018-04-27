import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Options } from 'selenium-webdriver/edge';



@Component({
  selector: 'sama-report',
  templateUrl: './sama-report.component.html',
  styleUrls: ['./sama-report.component.css']
})
export class SamaReportComponent implements OnInit {

  form: FormGroup;
  transactionList: any[];
  selectedTransaction: string;
  samaReports: any[];
  reportForm: FormGroup;
  SamaReport = {};
 
 

  //formControlName=""
  /* toppingList = 
  [{id:1, name: 'medo'},
  {id:2, name: 'ali'},
  {id:3, name: 'khalid'}];
  */
  constructor(private formBuilder: FormBuilder,private http: HttpClient) {
    this.form = this.formBuilder.group({
      transactionControlName: new FormControl()
     // custoemrId: [null, [Validators.required]]
    });


   }

  ngOnInit() {

  }




  loadTransactionList(customerId: HTMLInputElement){
    this.http.get('http://localhost:8081/report/getTransactions?customerId='+customerId.value)
    .subscribe( response => {
      this.transactionList = JSON.parse(JSON.stringify(response));
    });
 
  }

  generateSamaReport(){
   this.transactionList = null;
   let url = 'http://localhost:8081/report/createSamaReport';
   this.http.post(url , this.selectedTransaction).subscribe(response =>{
     this.samaReports = JSON.parse(JSON.stringify(response));
    });
    this.selectedTransaction = null;
  }

  saveReports(SamaReport){
    //alert(this.reportForm.get('depositeType').value);
    //'+this.reportForm.get('depositType').value+'
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   // let options = new RequestOptions({ headers: head });
    let url = 'http://localhost:8081/report/saveSamaReport';
    this.http.post(url, SamaReport, {headers: headers}).subscribe(response =>{
      //'{"depositType": '+this.reportForm.get('depositType').value+'}'
      //alert(JSON.parse(JSON.stringify(response)));
    });
  }
}
