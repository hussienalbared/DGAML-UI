import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { suspect } from '../components/models/suspect.model';
import { environment } from '../../environments/environment';

@Injectable()
export class SuspectsService {

  constructor(private http:HttpClient) { }
  getAllSuspects()
  {
    let url = environment.ipAddress+"/aml/api/v1/suspectedObject";
    console.log(url)
   return this.http.get<suspect[]>(url);
  }
  forwardSuspect(suspectKey,suspectCode,userName){
    let url = environment.ipAddress+"/aml/api/v1/updateUser?key=" + suspectKey +
    "&code=" + suspectCode + "&user=" + userName;
  return this.http.put(url, []);
    

  }
  takeOwnerShipService(key,code,complianceUserid){
    let url = environment.ipAddress+"/aml/api/v1/updateUser?key=" + key +
    "&code=" + code + "&user=" + complianceUserid;
  return this.http.put(url, [])
  }
  removeOwnerShip(selected){
    
    selected.forEach(element => {
 
      let code = element["id"]["alarmed_Obj_level_Cd"];
      let key = element["id"]["alarmed_Obj_Key"];
      let oldcomplianceUserid = element["owner_UID"];
      element["owner_UID"] = null;
      let url = environment.ipAddress+"/aml/api/v1/removeOwnerShip?key=" + key + "&code=" + code;
      this.http.put(url, []).subscribe(data => { }
        , error => {
          element["owner_UID"] = oldcomplianceUserid;
        }
      );
    }
    )
  }
  addalarmEvent(event)
  {
    let UrlAdd = environment.ipAddress+"/aml/api/v1/alarmEvent/add";
    this.http.put(UrlAdd, event, { responseType: "text" }).subscribe(data => {
     

    },
      err => {
        console.log("Error occured");
      })
  }
  changeAllSuspectAlarms(key,code,eventType){
    let url = environment.ipAddress+"/aml/api/v1/closeAllSuspectAlarms?"
    + "key=" + key + "&code=" + code+"&eventType="+eventType;
  return this.http.get(url);

  }
  changeAlarmStatuseById(alarmId,eventType){
    let url = environment.ipAddress+"/aml/api/alaram/closeAlarmById?alarmId="
    + alarmId + "&alarmStatusCode=" + eventType
  this.http.put(url, [], { responseType: "text" }).subscribe(data => {

  });
  }

}
