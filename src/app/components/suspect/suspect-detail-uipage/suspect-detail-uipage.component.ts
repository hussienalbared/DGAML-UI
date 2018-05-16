import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router }     from '@angular/router';
@Component({
  selector: 'app-suspect-detail-uipage',
  templateUrl: './suspect-detail-uipage.component.html',
  styleUrls: ['./suspect-detail-uipage.component.css']
})
export class SuspectDetailUipageComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
   
 
 this.route.paramMap.subscribe(params => {
   console.log("^^^^^^^^^^^^^")
  console.log(+params.get('obj_key'));
  
  console.log(params.get('obj_number'))
  console.log("^^^^^^^^^^^^^")
});
  }

}
