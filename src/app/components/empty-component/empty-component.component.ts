import { Component, OnInit, Input } from '@angular/core';
// import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Headers } from '../../../../node_modules/@angular/http';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-empty-component',
  templateUrl: './empty-component.component.html',
  styleUrls: ['./empty-component.component.css']
})
export class EmptyComponentComponent implements OnInit {

  private myTemplate: any = "";
 urlSafe: SafeResourceUrl;
 @Input()dashBoardUrl:string=environment.dashBoardUrl;
  constructor(private http: HttpClient,public sanitizer: DomSanitizer) {

 
  }

  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.dashBoardUrl);
  }

}
