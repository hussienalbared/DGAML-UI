import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suspect-details',
  templateUrl: './suspect-details.component.html',
  styleUrls: ['./suspect-details.component.css']
})
export class SuspectDetailsComponent implements OnInit {
result:any;
// displayedColumns=['PFNM','pno','Pstadd1',
// 'PBOD','PPEPIND','PCZCOCD','PIDTYDS','PID','PIDISSUEDATE',
// 'PIDEXPDATE','PASCNN','POCUDS','Telephone',
// 'RISK_CLASSIFICATION','PCOSDATE','',]

  constructor(private http:HttpClient,
  
    private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {

   

     this.route.paramMap.subscribe(params => {
      let number=params.get('obj_number');
   
      this.getData(number);  
    });
  }
  getData(number){
    let Url="http://localhost:8081/aml/api/party/ByPNO?PartyNumber="+
    
  number;
    this.http.get(Url).subscribe(data=>{


this.result=data;

    });

  }
detail={
  pfnm:'',pno:'',pstadd1:'',pstadd2:'',
pbod:'',ppepind:'',pczcocd:'',pidtyds:'',
pid:'',pidissuedate:'',pidexpdate:'',
pascnn:'',pocuds:'',ptel1:'',ptel2:'',ptel3:'',

risk_classification:'',pcosdate:'',pacctno:''
}
}
