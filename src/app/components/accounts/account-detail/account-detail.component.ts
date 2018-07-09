import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../../environments/environment'; @Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {


  result: any = []
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      let accountNumber = params.get("accountNumber");


      let Url = environment.ipAddress + "/aml/api/account/accountDetail?accountNumber=" + accountNumber;
      this.http.get(Url).subscribe(data => {

        this.result = data;
      })
    })
  }


}
