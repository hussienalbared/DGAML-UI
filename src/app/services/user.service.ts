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
    // let url = this.rootUrl + "user/getAllUsers";
    let url = this.rootUrl + "amr/";
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
  addNewUser(username,DisplayName,password,firstname,lastname,email,enable,lastPasswordResetDate){
    
    console.log("********");
    console.log(username);
    console.log(DisplayName);
    console.log(firstname);
    console.log(lastname);
    console.log(email);
    console.log(password);
    console.log("********");

    let url = this.rootUrl + "user/addUser";
    return this.http.post(url, {
      username: username,
      DisplayName: DisplayName,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      enabled: enable,
      lastPasswordResetDate: lastPasswordResetDate
    }).subscribe(data => {},
      err => {
        console.log("Error occured");
      })
  }

  updateUser(username,DisplayName,password,firstname,lastname,email){
    let url = this.rootUrl + "user/editUser";
    return this.http.put(url, {
      username: username,
      DisplayName: DisplayName,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email
    }).subscribe(data => {},
      err => {
        console.log("Error occured");
      })
  }

}
