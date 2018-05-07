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
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  changeIsOn() {
    this.isOn = !this.isOn;
  }
}
