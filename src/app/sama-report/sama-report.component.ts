import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'sama-report',
  templateUrl: './sama-report.component.html',
  styleUrls: ['./sama-report.component.css']
})
export class SamaReportComponent implements OnInit {

  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private http: HttpClient) {

   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      custoemrId: [null, [Validators.required]]
    });
  }


  toppings = new FormControl();

  toppingList = 
  [{id:1, name: 'medo'},
  {id:2, name: 'ali'},
  {id:3, name: 'khalid'}];


  getCustomerIdValue(customerId: HTMLInputElement){
    this.http.get('http://localhost:8081/report/getTransactions?customerId='+customerId.value)
    .subscribe( response => {
        alert(response);
    });
    alert(customerId.value);
  }
}
