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
  addNewUser(password, firstname, lastname, email){
    let url = this.rootUrl + "user/addUser?password=" + password+ "&firstname=" + firstname+ "&lastname=" +lastname + "&email="+ email ;
    return this.http.put(url, [])
  }

}
