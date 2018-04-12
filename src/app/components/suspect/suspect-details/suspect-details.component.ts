import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suspect-details',
  templateUrl: './suspect-details.component.html',
  styleUrls: ['./suspect-details.component.css']
})
export class SuspectDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
detail={
  pfnm:'',pno:'',pstadd1:'',pstadd2:'',
pbod:'',ppepind:'',pczcocd:'',pidtyds:'',
pid:'',pidissuedate:'',pidexpdate:'',
pascnn:'',pocuds:'',ptel1:'',ptel2:'',ptel3:'',

risk_classification:'',pcosdate:'',pacctno:''
}
}
