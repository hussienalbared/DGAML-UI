import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GroupService } from '../../../services/group.service';

import { environment } from '../../../../environments/environment';  @Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router,private groupService: GroupService) { }
 GroupsNames:any=[];
  ngOnInit() {
   
    this.groupService.getAllGroups().subscribe(data=>{
      this.GroupsNames=data;



    })
  }
  addgroup(addForm){
    let url=environment.ipAddress+"/aml/api/group/add";
    let group={
      name:"ROLE_"+addForm.name
    }
    this.http.post(url,group).subscribe(res => 
      {
        console.log(res);
        this.groupService.getAllGroups().subscribe(data=>{
          this.GroupsNames=data
    
    
    
        });
    addForm.name='';
      });
  

  }
  deleteGroup(groupId){
    console.log(groupId)
    let url=`${environment.ipAddress}/aml/api/group/delete/${groupId}`;
    this.http.delete(url).subscribe(data=>{
      this.groupService.getAllGroups().subscribe(data=>{
        this.GroupsNames=data
  
  
  
      });


    })

  }
  editGroup(groupId)
  {
this.router.navigate(['editGroup',groupId]);

  }
}
