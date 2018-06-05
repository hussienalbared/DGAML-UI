import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { capability } from '../models/groupModel.model';

@Injectable()
export class GroupService {

  constructor(private http:HttpClient) { }
  getAllCapabilities(){
let url="http://localhost:8081/aml/api/capability/all";


return this.http.get<capability[]>(url);


  }

}
