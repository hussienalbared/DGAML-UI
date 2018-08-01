import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Options } from 'selenium-webdriver/edge';
import { environment } from '../../environments/environment';



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
    this.http.get(environment.ipAddress+'/report/getTransactions?customerId='+customerId.value)
    // let url=environment.ipAddress+'/aml/api/suspectedTransaction/all?partyNumber='+customerId.value;
    // this.http.get(url)
    .subscribe( response => {
      this.transactionList = JSON.parse(JSON.stringify(response));
      console.log(this.transactionList)
    });
 
  }

  generateSamaReport(){
   this.transactionList = null;
   let url = environment.ipAddress+'/report/createSamaReport';
   console.log('selected transaction');
   console.log(this.selectedTransaction);
   this.http.post(url , this.selectedTransaction).subscribe(response =>{
     this.samaReports = JSON.parse(JSON.stringify(response));
     console.log('WWWWWWWWWWW');
     console.log(this.samaReports);
     console.log('WWWWWWWWWWWWWww');
    });
  }

  saveReports(SamaReport){

    console.log('HHHHHH')
    console.log(SamaReport)
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let url = environment.ipAddress+'/report/saveSamaReport';
    this.http.post(url, SamaReport, {headers: headers}).subscribe(response =>{
    });
  }

  downloadReport(lang : String){
    let url = environment.ipAddress+'/report/printSamaReport?transactionIds='+this.selectedTransaction+'&lang='+lang;
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
     this.http.get(url, { headers: headers, responseType: 'blob' }).subscribe(response =>{
      let file = new Blob([response], { type: 'application/pdf' });            
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });

  }
}
