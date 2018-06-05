import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
 GroupsNames:any=[];
  ngOnInit() {
    let url="http://localhost:8081/aml/api/group/all";
    this.http.get(url).subscribe(data=>{
      this.GroupsNames=data;



    })
  }
  addgroup(addForm){
    let url="http://localhost:8081/aml/api/group/add";
    let group={
      name:addForm.name
    }
    this.http.post(url,group).subscribe(res => console.log(res))
  

  }
  deleteGroup(groupId){
    console.log(groupId)
    let url=`http://localhost:8081/aml/api/group/delete/${groupId}`;
    this.http.delete(url).subscribe(data=>{

    })

  }
  editGroup(groupId)
  {
this.router.navigate(['editGroup',groupId]);

  }
}
