import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { group } from '../components/models/group.model';
import { capability } from '../components/models/capability.model';

@Injectable()
export class GroupService {

  constructor(private http:HttpClient) { }
  getAllCapabilities(){
let url="http://localhost:8081/aml/api/capability/all";


return this.http.get<capability[]>(url);


  }
  getRemainingCapabilities(groupId){
    let url=`http://localhost:8081/aml/api/capability/all/${groupId}`;
    
    
    return this.http.get<capability[]>(url);
    
    
      }
  getAllGroups(){
    let url="http://localhost:8081/aml/api/group/all";
   return this.http.get(url)
  }
  findGroup(id){
    let url=`http://localhost:8081/aml/api/group/find/${id}`;
    return this.http.get<group>(url)
  }
  updateGroup(group:group)
  {
let url="http://localhost:8081/aml/api/group/update";
return this.http.put(url,group);
  }

}
