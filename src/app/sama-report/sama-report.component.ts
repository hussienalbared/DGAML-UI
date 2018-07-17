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
export class SamaReportComponent  {

  form: FormGroup;
  transactionList: any[];
  selectedTransaction: string;
  samaReports: any[];
  reportForm: FormGroup;
  SamaReport = {};
 
  constructor(private formBuilder: FormBuilder,private http: HttpClient) {
    this.form = this.formBuilder.group({
      transactionControlName: new FormControl()
    });
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
  }

  saveReports(SamaReport){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let url = 'http://localhost:8081/report/saveSamaReport';
    this.http.post(url, SamaReport, {headers: headers}).subscribe(response =>{
    });
  }

  downloadReport(lang : String){
    let url = 'http://localhost:8081/report/printSamaReport?transactionIds='+this.selectedTransaction+'&lang='+lang;
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
     this.http.get(url, { headers: headers, responseType: 'blob' }).subscribe(response =>{
      let file = new Blob([response], { type: 'application/pdf' });            
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });

  }
}
