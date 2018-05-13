import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suspect-details',
  templateUrl: './suspect-details.component.html',
  styleUrls: ['./suspect-details.component.css']
})
export class SuspectDetailsComponent implements OnInit {
result:any=[];
number:string='';
level_level_code:string='';
obj_key:string='';




  constructor(private http:HttpClient,
  
    private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {

   

     this.route.paramMap.subscribe(params => {
      this.number=params.get('obj_number');
      this.obj_key=params.get('obj_key');
    
      this.level_level_code=params.get('obj_level_code'); 
      this.getData(this.number);  
  
    });
  }
  getData(number){
    let Url="http://localhost:8081/aml/api/party/ByPNO?PartyNumber="+
    number;
    this.http.get(Url).subscribe(data=>{


this.result=data;

    });

  }

}
