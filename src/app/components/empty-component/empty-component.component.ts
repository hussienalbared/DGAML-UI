import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Headers } from '../../../../node_modules/@angular/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-empty-component',
  templateUrl: './empty-component.component.html',
  styleUrls: ['./empty-component.component.css']
})
export class EmptyComponentComponent implements OnInit {

  private myTemplate: any = "";
  constructor(private http: HttpClient) {

 
  }

  ngOnInit() {
    let myExternalPageLink="http://192.168.1.40/Reports/Pages/Report.aspx?ItemPath=%2fAML+Project%2fDASHBOARD%2fAML+Main+Dashboard";
    let t="https://angular.io/"
    var headers = new Headers();

      // this.http.get(t).subscribe(response => {
      //   this.myTemplate=response
      //   ;
      // })
  }

}
