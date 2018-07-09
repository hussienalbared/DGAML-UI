import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AccountsService {

  constructor(private http:HttpClient) {



   }
   getAccountAlarmsInBrief(AccountKey){

    let url=environment.ipAddress+"/aml/api/account/alarmInBrief?accountKey="+AccountKey;
    return this.http.get(url);
  }

}
