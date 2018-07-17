import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  returenNoti: any;

  rootUrl='';
  constructor(private http:HttpClient) {
    this.rootUrl = environment.ipAddress+"/aml/api/";
   }

  // suspect notification (takeowner,removeowner,close,suppress)
  suspectNotification(alarmed_Obj_level_Cd,alarmed_Obj_Key,action,loggedUser){
    console.log("***** in suspectNotification take-removeOwner - close - suppress******")
    console.log(alarmed_Obj_level_Cd + ", " + alarmed_Obj_Key + " ," + action + ", " + loggedUser)

    let url = this.rootUrl + "notification/addSuspectNotification";
    let noti = {
      alarmed_Obj_level_Cd:alarmed_Obj_level_Cd,
      alarmed_Obj_Key:alarmed_Obj_Key,
      action:action,
      userId:loggedUser
    }
    return this.http.post(url,noti).subscribe(data=>{});
  }

  //suspect forward
  suspectForwardNoti(alarmed_Obj_level_Cd,alarmed_Obj_Key,action,loggedUser,target_user_name){
    console.log("***** in suspectForwardNotification ******")
    console.log(alarmed_Obj_level_Cd + ", " + alarmed_Obj_Key + " ," + action + ", " + loggedUser+ ", "+ target_user_name)
    let url = this.rootUrl + "notification/addSuspectNotification";
    let noti = {
      alarmed_Obj_level_Cd:alarmed_Obj_level_Cd,
      alarmed_Obj_Key:alarmed_Obj_Key,
      action:action,
      userId:loggedUser,
      target_user_name:target_user_name
    }
    this.http.post(url,noti).subscribe(data=>{});
  }

  suspectCommentNoti(alarmed_Obj_level_Cd,alarmed_Obj_Key,action,loggedUser,commentdecription){
    console.log("***** in suspectForwardNotification ******")
    console.log(alarmed_Obj_level_Cd + ", " + alarmed_Obj_Key + " ," + action + ", " + loggedUser+ ", "+ commentdecription)
    let url = this.rootUrl + "notification/addSuspectNotification";
    let noti = {
      alarmed_Obj_level_Cd:alarmed_Obj_level_Cd,
      alarmed_Obj_Key:alarmed_Obj_Key,
      action:action,
      userId:loggedUser,
      commentdecription:commentdecription
    }
    return this.http.post(url,noti).subscribe(data=>{});
  }

  allNoti(){
    let url = this.rootUrl + "notification/all";
    return this.http.get(url);
  }

  alarmNotification(alarmeid,action,loggedUser){
    console.log("***** in alarmNotification ******")
    let url = this.rootUrl + "notification/addalarmNotification";
    let noti = {
      alarmeid:alarmeid,
      action:action,
      userId:loggedUser
    }
    this.http.post(url,noti).subscribe(data=>{});
  }

  riskNotifiction(risk_Assmnt_Id,action,Target_Name,loggedUser){
    let url = this.rootUrl + "notification/addRiskNotification";
    let noti = {
      risk_Assmnt_Id:risk_Assmnt_Id,
      action:action,
      target_Name:Target_Name,
      userId:loggedUser
    }
    this.http.post(url,noti).subscribe(data=>{});
  }

  riskNotifictionOwner(risk_Assmnt_Id,action,loggedUser){
    let url = this.rootUrl + "notification/addRiskNotification";
    let noti = {
      risk_Assmnt_Id:risk_Assmnt_Id,
      action:action,
      userId:loggedUser
    }
    console.log("hussien 1 ")
    console.log(noti)
    this.http.post(url,noti).subscribe(data=>{});
  }
}
