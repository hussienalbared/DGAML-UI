import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { suspect } from '../models/suspect.model';

@Injectable()
export class SuspectsService {

  constructor(private http:HttpClient) { }
  getAllSuspects()
  {
    let url = "http://localhost:8081/aml/api/v1/suspectedObject";
   return this.http.get<suspect[]>(url);
  }
  forwardSuspect(suspectKey,suspectCode,userName){
    let url = "http://localhost:8081/aml/api/v1/updateUser?key=" + suspectKey +
    "&code=" + suspectCode + "&user=" + userName;
  return this.http.put(url, []);
    

  }
  takeOwnerShipService(key,code,complianceUserid){
    let url = "http://localhost:8081/aml/api/v1/updateUser?key=" + key +
    "&code=" + code + "&user=" + complianceUserid;
  return this.http.put(url, [])
  }

}
