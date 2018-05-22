import { element } from 'protractor';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { TabsServiceService } from '../../services/tabs-service.service';
import { tab } from '../models/tab.model';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  mode = new FormControl('side');
  isOn = true;
  elemen: any;

  constructor(private authService: AuthService,private Tab:TabsServiceService) { }

  ngOnInit() {
  } 
  changeIsOn() {
    this.isOn = !this.isOn;
  } 
  /* --- */

  layoutItem(e,path,label){
    
    for (var _i = 0; _i < $(".mat_item_a").length; _i++) {
      $(".mat_item_a")[_i].classList.remove("active");
      $(".mat-list-item-content")[_i].classList.remove("active");
    }
    $(e.target).addClass('active');
    $(e.target).closest('.mat_item_a').addClass('active');
    //$(e.target).css({ "display": "block !important","background-color": "#F0843F !important"});
    // this.isActive = true;
    // // e.target.addClass("active")
    //  $(e.target).addClass("active");
    
    //
      //console.log(" = " + $(e.target).attr("class"));
      let tab:tab={path:path,label:label}
this.Tab.addTab(tab);
    }
  /* --- */
  addTab(){

  }
  removeTab(index){

    this.Tab.removeTab(index);
  }
}
