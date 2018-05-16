import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountsService {

  constructor(private http:HttpClient) {



   }
   getAccountAlarmsInBrief(AccountKey){

    let url="http://localhost:8081/aml/api/account/alarmInBrief?accountKey="+AccountKey;
    return this.http.get(url);
  }

}
