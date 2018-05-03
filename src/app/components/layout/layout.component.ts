import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  mode = new FormControl('side');
  isOn = true;
  elemen: any;

  constructor() { }

  ngOnInit() {
  }
  changeIsOn() {
    this.isOn = !this.isOn;
 
  
  }
 
  

  
}
