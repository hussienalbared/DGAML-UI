import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { group } from '../components/models/group.model';
import { capability } from '../components/models/capability.model';
import { environment } from '../../environments/environment';

@Injectable()
export class GroupService {

  constructor(private http:HttpClient) { }
  getAllCapabilities(){
let url=environment.projectName+"/aml/api/capability/all";


return this.http.get<capability[]>(url);


  }
  getRemainingCapabilities(groupId){
    let url=`${environment.projectName}/aml/api/capability/all/${groupId}`;
    
    
    return this.http.get<capability[]>(url);
    
    
      }
  getAllGroups(){
    let url=environment.projectName+"/aml/api/group/all";
   return this.http.get<group[]>(url)
  }
  findGroup(id){
    let url=`${environment.projectName}/aml/api/group/find/${id}`;
    return this.http.get<group>(url)
  }
  updateGroup(group:group)
  {
let url=environment.projectName+"/aml/api/group/update";
return this.http.put(url,group);
  }

}
