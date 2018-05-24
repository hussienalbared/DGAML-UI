import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RiskService {

  rootUrl = "";
  constructor(private http:HttpClient) { 
    this.rootUrl = "http://localhost:8081/aml/api/";
  }

  forwardrisk(Key,userName){
    let url = this.rootUrl + "accountriskassigment/updateUser?key=" + Key + "&user=" + userName;
    return this.http.put(url, []);
  }

  takeOwnerShipService(key,complianceUserid){
    console.log("takeOwnerShipService");
    console.log(complianceUserid);
    let url = this.rootUrl + "accountriskassigment/updateUser?key=" + key + "&user=" + complianceUserid;
    return this.http.put(url, [])
  }

  removeOwnerShip(key){
    console.log("removeOwnerShip");
    let url = this.rootUrl + "accountriskassigment/removeOwnerShip?key=" + key ;
    return this.http.put(url, [])
  }

  riskDecline(key){
    let url = this.rootUrl + "accountriskassigment/riskDecline?key=" + key ;
    return this.http.put(url, [])
  }

  approveRisk(key,custNo){
    let url = this.rootUrl + "accountriskassigment/approveRisk?key=" + key + "&custNo="+custNo;
    return this.http.put(url, [])
  }

}
