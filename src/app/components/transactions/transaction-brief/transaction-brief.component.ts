import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transaction-brief',
  templateUrl: './transaction-brief.component.html',
  styleUrls: ['./transaction-brief.component.css']
})
export class TransactionBriefComponent implements OnInit {
  dataSource :any/*= ELEMENT_DATA*/;
  displayedColumns = ['ACCTNO', 'TTRN', 'CFDATEKEY', 'CFCURRAMT','transaction_cdi_desc','RTTDS'];
  
  constructor(private http:HttpClient) { }

  ngOnInit() {

this.getData("100009572206")
  }
  getData(partyNumber:string){
    let Url="http://localhost:8081/aml/api/v1/suspectedTransaction/all?partyNumber="+partyNumber;
    this.http.get(Url).subscribe(data=>{

      this.dataSource=data;
      
          });

  }
  alertF(nn)
  {

alert('double click'+nn);

  }

}

// export interface Element {
//   ACCTNO: string;
//   TTRN: string;
//   CFDATEKEY: string;
//   CFCURRAMT: string;
//   transaction_cdi_desc:string;
//   RTTDS:string;
// }

// const ELEMENT_DATA: Element[] = [
//   {ACCTNO: '1', TTRN: 'Hydrogen', CFDATEKEY: '1.0079', CFCURRAMT: 'H',transaction_cdi_desc:'abc',RTTDS:'2013'},
//   {ACCTNO: '2', TTRN: 'Helium', CFDATEKEY: '4.0026', CFCURRAMT: 'He',transaction_cdi_desc:'cde',RTTDS:'2013'},
//   {ACCTNO: '3', TTRN: 'Lithium', CFDATEKEY: '6.941', CFCURRAMT: 'Li',transaction_cdi_desc:'fgh',RTTDS:'2013'},
//   {ACCTNO: '4', TTRN: 'Beryllium', CFDATEKEY: '9.0122', CFCURRAMT: 'Be',transaction_cdi_desc:'ijk',RTTDS:'2013'},
//   ];