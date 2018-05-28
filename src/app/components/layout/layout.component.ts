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
import { tab } from '../models/tab.model';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
 activeUrl:string="";
  mode = new FormControl('side');
  isOn = true;
  elemen: any;

  constructor(private authService: AuthService,/*private changeLangService: ChangeLangService,*/
              private TabService:TabsServiceService,private router:Router,public translate: TranslateService) { }

  ngOnInit() {
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
  console.log("Layout");
  
  // this.changeLangService.changeLang();
  this.translate.use(targLang);
  
  $('.all_container').attr( "dir", "{{ 'dir' | translate }}" );
  $('.mat-dialog-container').attr( "dir", "{{ 'dir' | translate }}" );
  // $('.topbar').css("text-align", "{{ 'text_align' | translate }}" );
  // console.log("zzzzzz=");
  
  if(targLang == 'en'){
    $('.selected_Language').text("ُEnglish");
      $('.all_container').css('text-align', 'left' );
      // $('.forwardContainer').css('text-align', 'left' );
  }
  else{
    $('.selected_Language').text("اللغة العربية");
    $('.all_container').css('text-align', 'right' );
    $('.topbar').css('padding-right', '0' );
  }
  
  // $('.all_container').css('text-align', '{{ "text_align" | translate }}' );
}

}

