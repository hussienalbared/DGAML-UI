import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { NgProgress } from 'ngx-progressbar';
 @Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  result: any = [];
  displayedColumns = ['ttrn', 'ttds',
    'cfcurramt', 'transactionCdiDesc', 'mechanismDesc', 'currencyName',
    'currencyCode', 'cfcurramttxnccy', 'cfcurramtacctccy',
    'ascfnm', 'ascno', 'cfacctno', 'cf2ndacctno',
    'remitter_Name', 'remitter_Number', 'beneficiary_Name', 'beneficiary_Number', 'cfdatekey', 'brnm', 'brno',
    'countryName', 'countryCode3']
  TTRN: string = '';
  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router,
    public ngProgress: NgProgress) {


    route.paramMap.subscribe(params => {
      this.TTRN = params.get('ttrn');
     

    })
  }

  ngOnInit() {
    let Url = environment.ipAddress + "/aml/api/Transaction_detail/transactionDeatil?ttrn=" + this.TTRN;
    this.ngProgress.start();
    this.http.get(Url).subscribe(data => {
      this.result = data;
      this.ngProgress.done();
    })
  }

}
