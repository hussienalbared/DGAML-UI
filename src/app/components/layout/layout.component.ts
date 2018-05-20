import { element } from 'protractor';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  mode = new FormControl('side');
  isOn = true;
  elemen: any;
  isActive = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  } 
  changeIsOn() {
    this.isOn = !this.isOn;
  } 
  /* --- */

  layoutItem(e){
    
    for (var _i = 0; _i < document.getElementsByClassName("mat_item_a").length; _i++) {
      document.getElementsByClassName("mat_item_a")[_i].classList.remove("active");
      document.getElementsByClassName("mat-list-item-content")[_i].classList.remove("active");
    }
    $(e.target).addClass('active');
    $(e.target).closest('.mat_item_a').addClass('active');
    //$(e.target).css({ "display": "block !important","background-color": "#F0843F !important"});
    // this.isActive = true;
    // // e.target.addClass("active")
    //  $(e.target).addClass("active");
    
    //
      console.log(" = " + $(e.target).attr("class"));
    }
  /* --- */
}   
