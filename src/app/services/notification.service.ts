import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  returenNoti: any;

  rootUrl='';
  constructor(private http:HttpClient) {
    this.rootUrl = environment.projectName+"/aml/api/";
   }

  // suspect notification (takeowner,removeowner,close,suppress)
  suspectNotification(alarmed_Obj_level_Cd,alarmed_Obj_Key,action,loggedUser){
    
    

    let url = this.rootUrl + "notification/addSuspectNotification";
    let noti = {
      alarmed_Obj_level_Cd:alarmed_Obj_level_Cd,
      alarmed_Obj_Key:alarmed_Obj_Key,
      action:action,
      create_User_Id:loggedUser
    }
    
    
    return this.http.post(url,noti).subscribe(data=>{});
  }

  //suspect forward
  suspectForwardNoti(alarmed_Obj_level_Cd,alarmed_Obj_Key,action,loggedUser,target_user_name){
    
    
    let url = this.rootUrl + "notification/addSuspectNotification";
    let noti = {
      alarmed_Obj_level_Cd:alarmed_Obj_level_Cd,
      alarmed_Obj_Key:alarmed_Obj_Key,
      action:action,
      create_User_Id:loggedUser,
      target_User_Name:target_user_name
    }
    this.http.post(url,noti).subscribe(data=>{});
  }

  suspectCommentNoti(alarmed_Obj_level_Cd,alarmed_Obj_Key,action,loggedUser,commentdecription){
    
    
    let url = this.rootUrl + "notification/addSuspectNotification";
    let noti = {
      alarmed_Obj_level_Cd:alarmed_Obj_level_Cd,
      alarmed_Obj_Key:alarmed_Obj_Key,
      action:action,
      create_User_Id:loggedUser,
      comment_Decription:commentdecription
    }
    return this.http.post(url,noti).subscribe(data=>{});
  }

  // allNoti(){
  //   let url = this.rootUrl + "notification/all";
  //   return this.http.get(url);
  // }
  allNoti2(){
    let id=localStorage.getItem('id')
    let url = this.rootUrl + `notification/allNotification/${id}`;
    return this.http.get(url);
  }

  alarmNotification(alarmeid,action,loggedUser){
    
    let url = this.rootUrl + "notification/addalarmNotification";
    let noti = {
      alarm_Id:alarmeid,
      action:action,
      create_User_Id:loggedUser
    }
    this.http.post(url,noti).subscribe(data=>{});
  }

  riskNotifiction(risk_Assmnt_Id,action,Target_Name,loggedUser){
    let url = this.rootUrl + "notification/addRiskNotification";
    let noti = {
      risk_Assmnt_Id:risk_Assmnt_Id,
      action:action,
      target_Name:Target_Name,
      create_User_Id:loggedUser
    }
    this.http.post(url,noti).subscribe(data=>{});
  }

  riskNotifictionOwner(risk_Assmnt_Id,action,loggedUser){
    let url = this.rootUrl + "notification/addRiskNotification";
    let noti = {
      risk_Assmnt_Id:risk_Assmnt_Id,
      action:action,
      create_User_Id:loggedUser
    }
    
    
    this.http.post(url,noti).subscribe(data=>{});
  }

  sendNoti(notiId,userId){
    let url = this.rootUrl + "notification/readNotification";
    let noti = {
      notificationId:notiId,
      userId:userId
    }
    this.http.post(url,noti).subscribe(data=>{});
  }

  markAllRead(userId_){
    let url = this.rootUrl + "notification/markAllRead?userId="+userId_;
    
    this.http.post(url,[]).subscribe(data=>{},error=>{
alert('erorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
    });
  }

}
