import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../models/user.model';

@Injectable()
export class UserService {

  
  rootUrl = "";
  constructor(private http:HttpClient) { 
    this.rootUrl = "http://localhost:8081/aml/api/";
  }

  getAllUsers()
  {
    let url = this.rootUrl + "user/getAllUsers";
    // let url = this.rootUrl + "amr/";
   return this.http.get<user[]>(url);
  }

  getUser(id_)
  {
    let url = this.rootUrl + "user/getUser/"+id_;
    // let url = this.rootUrl + "amr/";
   return this.http.get<user[]>(url);
  }

  enableUser(Uid){
    let url = this.rootUrl + "user/enableUser?userId=" + Uid ;
    return this.http.put(url, [])
  }
  disableUser(Uid){
    let url = this.rootUrl + "user/disableUser?userId=" + Uid ;
    return this.http.put(url, [])
  }
  deleteUser(Uid){
    let url = this.rootUrl + "user/deleteUser?userId=" + Uid ;
    return this.http.put(url, [])
  }
  addNewUser(username,DisplayName,password,firstname,lastname,email,enable,lastPasswordResetDate,groups){
    
    console.log("****add service****");
    console.log(username);
    console.log(DisplayName);
    console.log(firstname);
    console.log(lastname);
    console.log(email);
    console.log(password);
    console.log("Groups");
    console.log(groups);
    console.log("********");

    let url = this.rootUrl + "user/addUser";

    const user_: user = {  
      username: username,
      displayName: DisplayName,
      firstname: firstname,
      password: password,
      lastname: lastname,
      email: email,
      groups: groups,
      enabled: enable,
      lastPasswordResetDate: lastPasswordResetDate
    }

    return this.http.post(url,
      user_
      // username: username,
      // displayName: DisplayName,
      // password: password,
      // firstname: firstname,
      // lastname: lastname,
      // email: email,
      // enabled: enable,
      // lastPasswordResetDate: lastPasswordResetDate
    ).subscribe(data => {},
      err => {
        console.log("Error occured");
      })
  }

  updateUser(id,username,DisplayName,password,firstname,lastname,email,enabled,groups){
    let url = this.rootUrl + "user/editUser";
    // const user_: user = {  
    //   username: username,
    //   displayName: DisplayName,
    //   firstname: firstname,
    //   password: password,
    //   lastname: lastname,
    //   email: email,
    //   enabled: enabled,
    //   lastPasswordResetDate: lastPasswordResetDate
    // }
    return this.http.put(url, {
      id:id,
      username: username,
      displayName: DisplayName,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      enabled: enabled,
      groups:groups
    }).subscribe(data => {},
      err => {
        console.log("Error occured");
      })
  }

}
