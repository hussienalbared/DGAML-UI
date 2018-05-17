import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  mode = new FormControl('side');
  isOn = true;
  elemen: any;
  constructor(private authService: AuthService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
  }
  changeIsOn() {
    this.isOn = !this.isOn;
    if(this.isOn)
      $(".topbar[_ngcontent-c1] .topbar-left[_ngcontent-c1]").css({'padding-right':'10px','padding-left':'0px'});
    else
      $(".topbar[_ngcontent-c1] .topbar-left[_ngcontent-c1]").css('padding-left','6px');

  
  }
  navItem(url:string){
    this.router.navigate(["/"+url]);

  }
}
