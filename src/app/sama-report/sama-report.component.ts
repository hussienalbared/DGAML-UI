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
export class SamaReportComponent implements OnInit {

  form: FormGroup;
  transactionList: any[];
  selectedTransaction: string;
  samaReports: any[];
  reportForm: FormGroup;
  SamaReport = {};
  ngOnInit() {
    this.form = this.formBuilder.group({
      transactionControlName: new FormControl()
    });




  }
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {

  }

  loadTransactionList(customerId: HTMLInputElement) {
    this.http.get(environment.projectName + '/report/getTransactions?customerId=' + customerId.value)

      .subscribe(response => {
        this.transactionList = JSON.parse(JSON.stringify(response));
        console.log(this.transactionList)
      });

  }

  generateSamaReport() {
    this.transactionList = null;
    let url = environment.projectName + '/report/createSamaReport';
    console.log('selected transaction');
    console.log(this.selectedTransaction);
    this.http.post(url, this.selectedTransaction).subscribe(response => {
      this.samaReports = JSON.parse(JSON.stringify(response));
      console.log('WWWWWWWWWWW');
      console.log(this.samaReports);
      console.log('WWWWWWWWWWWWWww');
    });
  }

  saveReports(SamaReport, report) {


    // SamaReport.accountBranch ? SamaReport.accountBranch : report.accountBranch
    // SamaReport.accountNumber ? SamaReport.accountNumber : report.accountNumber
    // SamaReport.amountNumber ? SamaReport.amountNumber : report.amountNumber
    // SamaReport.bank ? SamaReport.bank : report.bank
    // SamaReport.branch_Name ? SamaReport.branch_Name : report.branch_Name
    // SamaReport.branch_Type_Desc ? SamaReport.branch_Type_Desc : report.branch_Type_Desc
    // SamaReport.creationDate ? SamaReport.creationDate : report.creationDate
    // SamaReport.currencyName ? SamaReport.currencyName : report.currencyName
    // SamaReport.cust_Key ? SamaReport.cust_Key : report.cust_Key
    // SamaReport.cust_No ? SamaReport.cust_No : report.cust_No
    // SamaReport.customerId ? SamaReport.customerId : report.customerId
    // SamaReport.customerName ? SamaReport.customerName : report.customerName
    // SamaReport.depositType ? SamaReport.depositType : report.depositType
    // SamaReport.nationality ? SamaReport.nationality : report.nationality
    // SamaReport.reportingEntityBranch ? SamaReport.reportingEntityBranch : report.reportingEntityBranch
    // SamaReport.reportingEntityCity ? SamaReport.reportingEntityCity : report.reportingEntityCity
    // SamaReport.reportingEntityName ? SamaReport.reportingEntityName : report.reportingEntityName
    // SamaReport.reportingEntityPhone ? SamaReport.reportingEntityPhone : report.reportingEntityPhone
    // SamaReport.reportingEntityType ? SamaReport.reportingEntityType : report.reportingEntityType
    // SamaReport.reportingPersonAddress ? SamaReport.reportingPersonAddress : report.reportingPersonAddress
    // SamaReport.reportingPersonName ? SamaReport.reportingPersonName : report.reportingPersonName
    // SamaReport.reportingPersonPhone ? SamaReport.reportingPersonPhone : report.reportingPersonPhone

    console.log('HHHHHH')
    console.log(SamaReport)

console.log('eeeee');
console.log(report);
console.log('dddddddd');

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    let url = environment.projectName + '/report/saveSamaReport';
    this.http.post(url, report, { headers: headers }).subscribe(response => {
    }, error => {
      console.log(error)
    });

  }

  downloadReport(lang: String) {
    let url = environment.projectName + '/report/printSamaReport?transactionIds=' + this.selectedTransaction + '&lang=' + lang;
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    this.http.get(url, { headers: headers, responseType: 'blob' }).subscribe(response => {
      let file = new Blob([response], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });

  }
}
