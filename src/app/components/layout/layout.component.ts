import { WebSocketServiceService } from './../../web-socket-service.service';
import { NotificationService } from './../../services/notification.service';
import { element } from 'protractor';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
// import { ChangeLangService } from '../../services/change-lang.service';
import { ActivatedRoute, Router } from '@angular/router';

import {TranslateService} from '@ngx-translate/core';

import { TabsServiceService } from '../../services/tabs-service.service';
import * as $ from 'jquery';
import { tab } from '../models/tab.model';
import { environment } from '../../../environments/environment';  @Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
 activeUrl:string="";
  mode = new FormControl('side');
  isOn = true;
  elemen: any;
  userName:string='';
  notificatiobValue: Number;
  notifications: any=[];
  show_noti = false;

  constructor(private authService: AuthService,/*private changeLangService: ChangeLangService,*/
              private TabService:TabsServiceService,private router:Router,public translate: TranslateService,
            private notification: NotificationService,private webSocketService: WebSocketServiceService) { }

  ngOnInit() {
    if(localStorage.getItem('name')!== null)
    {
      this.userName=localStorage.getItem('name')
    }

    /******** */
    let stompClient = this.webSocketService.connect();
    stompClient.connect({}, frame => {

    stompClient.subscribe('/topic/notification/', noti => {
      ;

      console.log("stompClient.subscribe: ")
      console.log(noti)
      console.log("----------------*********---------------")

      this.notifications = JSON.parse(noti.body);
      this.notificatiobValue = this.notifications.length;
    /******** */

    // Get all notification
  });
}); 

  this.notification.allNoti().subscribe(data=>{
    console.log("get all noti ***********")
  console.log(data)
    this.notifications = data;
    this.notificatiobValue = this.notifications.length; 
  });
}

  changeIsOn() {
    this.isOn = !this.isOn;
    if(this.isOn)
    $(".topbar[_ngcontent-c1] .topbar-left[_ngcontent-c1]").css({'padding-right':'10px','padding-left':'0px'});
  else
    $(".topbar[_ngcontent-c1] .topbar-left[_ngcontent-c1]").css('padding-left','6px');
  } 
  /* --- */

  layoutItem(e){
    
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

    }
    navItem(url){
    this.router.navigate(["/"+url]);
    let y="/"+url;


  
    

  }
  /* --- */
  addTab(){

  }
  removeTab(path,label){
let Tab:tab={path:path,label:label}
    this.TabService.removeTab(Tab);
  }

  // navItem(url:string){
  //   this.router.navigate(["/"+url]);

  // }

changeLang(targLang:string){
  // console.log("Layout");
  
  // this.changeLangService.changeLang();
  this.translate.use(targLang);
  
  $('.all_container').attr( "dir", "{{ 'dir' | translate }}" );

  //forwaed dialog
  $('.mat-dialog-container').attr( "dir", "{{ 'dir' | translate }}" );
  
  if(targLang == 'en'){
    $('.selected_Language').text("ُEnglish");
      $('.all_container').css('text-align', 'left' );
  }
  else{
    $('.selected_Language').text("اللغة العربية");
    $('.all_container').css('text-align', 'right' );
    $('.topbar').css('padding-right', '0' );
    $('.full_icon_fg').css('margin-right', '15px' );
  }
}
updateProfile()
{
  console.log("kuieu")
  this.router.navigate(["profile"])
}
goTodashboard()
{
  this.router.navigate(["/empty"])
  window.open("http://192.168.1.40/Reports/Pages/Report.aspx?ItemPath=%2fAML+Project%2fDASHBOARD%2fAML+Main+Dashboard", "_blank");
}
}

