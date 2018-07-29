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
  newValue: number;
  notifications: any=[];
  show_noti = false;

  selected_Language=null;

  constructor(private authService: AuthService,/*private changeLangService: ChangeLangService,*/
              private TabService:TabsServiceService,private router:Router,public translate: TranslateService,
            private notification: NotificationService,private webSocketService: WebSocketServiceService) { }

  ngOnInit() {

    this.selected_Language = this.translate.getDefaultLang();
    // alert(this.selected_Language)

    // $(document).ready(()=>{
    //   $(window).click(function(e) {
    //     alert("A")
    //     $('.noti-block').hide();     
    //   })
    // });

    $(document).ready(()=>{
      $(window).click(function() {
        $('.noti-block').hide();
        // alert("window")
      });
      
      $('#Notification1').click(function(event){
        event.stopPropagation();
      });
    });

    if(localStorage.getItem('name')!== null)
    {
      this.userName=localStorage.getItem('name')
    }

    /******** */
    let stompClient = this.webSocketService.connect();
    stompClient.connect({}, frame => {

    stompClient.subscribe(`/topic/notification/${localStorage.getItem('id')}`, noti => {
      ;

      
    

      this.notifications.push(JSON.parse(noti.body));

      // this.notifications = JSON.parse(noti.body);
      this.newValue = this.notifications.length;
if(this.newValue!==this.notificatiobValue){
  this.ffff()
}
      this.notificatiobValue = this.notifications.length;
     
    /******** */

    // Get all notification
  });
}); 

  this.notification.allNoti2().subscribe(data=>{


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

// changeLang(targLang:string){
  
//   // this.changeLangService.changeLang();
//   // this.translate.use(targLang);
  
//   // $('.all_container').attr( "dir", "{{ 'dir' | translate }}" );

//   //forwaed dialog
//   $('.mat-dialog-container').attr( "dir", "{{ 'dir' | translate }}" );
  
//   if(targLang == 'en'){
//     $('.selected_Language').text("ُEnglish");
//       $('.all_container').css('text-align', 'left' );
//   }
//   else{
//     // $('.selected_Language').text("اللغة العربية");
//     $('.all_container').css('text-align', 'right' );
//     $('.topbar').css('padding-right', '0' );
//     $('.full_icon_fg').css('margin-right', '15px' );
//   }
// }

/*****ASZ******/
changeLang2(tarnsLang:string){
  // alert(tarnsLang)
  this.translate.setDefaultLang(tarnsLang);
  this.translate.use(tarnsLang)
  this.selected_Language = tarnsLang;
  

  //--- temp because it doesn't read the style from ar/en.json
    if(this.selected_Language=='en'){
      $('.all_container').css('text-align', 'left' );
      $('.select_button').css('text-align', 'left' );
    }
    else {
      $('.all_container').css('text-align', 'right' );
      $('.select_button').css('text-align', 'right' );
    }
  //---
}
/***********/

updateProfile()
{
  this.router.navigate(["profile"])
}
goTodashboard()
{
  this.router.navigate(["/empty"])
  window.open("http://192.168.1.40/Reports/Pages/Report.aspx?ItemPath=%2fAML+Project%2fDASHBOARD%2fAML+Main+Dashboard", "_blank");
}
stopNotificationAnimation(){
 $(document).ready(()=>{

 
    $("#Notification1").removeClass("notify")

 }) 
}
ffff()
{
  $(document).ready(()=>{

 
    $("#Notification1").addClass("notify")

 }) 
}

/////////////
sendNoti(x,index:number){

 
   this.notification.sendNoti(x.notification_ID,localStorage.getItem('id'))

  this.notifications.splice(this.notifications.length-index-1,1);
  this.notificatiobValue=this.notifications.length-1;
 
}


markAllRead(){
  
  this.notification.markAllRead(localStorage.getItem('id'))
  this.notifications=[];
  this.notificatiobValue=0;
}

}

