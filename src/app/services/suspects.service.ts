import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { suspect } from '../components/models/suspect.model';

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
  removeOwnerShip(selected){
    
    selected.forEach(element => {
      console.log("hi   "+element["objName"]);
      let code = element["id"]["objLevelCode"];
      let key = element["id"]["objKey"];
      let oldcomplianceUserid = element["complianceUserid"];
      element["complianceUserid"] = null;
      let url = "http://localhost:8081/aml/api/v1/removeOwnerShip?key=" + key + "&code=" + code;
      this.http.put(url, []).subscribe(data => { }
        , error => {
          element["complianceUserid"] = oldcomplianceUserid;
        }
      );
    }
    )
  }
  addalarmEvent(event)
  {
    let UrlAdd = "http://localhost:8081/aml/api/v1/alarmEvent/add";
    this.http.put(UrlAdd, event, { responseType: "text" }).subscribe(data => {
     

    },
      err => {
        console.log("Error occured");
      })
  }
  changeAllSuspectAlarms(key,code,eventType){
    let url = "http://localhost:8081/aml/api/v1/closeAllSuspectAlarms?"
    + "key=" + key + "&code=" + code+"&eventType="+eventType;
  return this.http.get(url);

  }
  changeAlarmStatuseById(alarmId,eventType){
    let url = "http://localhost:8081/aml/api/alaram/closeAlarmById?alarmId="
    + alarmId + "&alarmStatusCode=" + eventType
  this.http.put(url, [], { responseType: "text" }).subscribe(data => {

  });
  }

}
