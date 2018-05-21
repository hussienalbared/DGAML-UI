import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveLinkssService } from '../../services/active-linkss.service';
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
  listlinks:string[]=[];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  constructor(private authService: AuthService,private route:ActivatedRoute,private router:Router,
    private links:ActiveLinkssService) {
     
     }

  ngOnInit() {
    this.activeUrl=this.router.url;
    this.links.links.forEach(element => {
      this.listlinks.push(element)
      
    });
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
    let y="/"+url;
    
    this.links.links.push(url)

    
    console.log(this.router.url);
    

  }
  remove(link){
    let index = this.links.links.indexOf(link);
   

    if (index >= 0) {
      this.links.links.splice(index, 1);
    }

     

  }
  // changeStyle(event){
  //   console.log(event)
  //   $(".searchActiveLink").css({'background-color':'white'});
  //   $(event).addClass("searchActiveLink").css({'background-color':'yellow'});

  // }
 
}
