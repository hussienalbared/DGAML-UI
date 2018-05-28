import { element } from 'protractor';
import { RiskForwardComponent } from './risk-forward/risk-forward.component';
import { RiskService } from './../../services/risk.service';
import { risk } from './../../models/risk.model';

import {ViewChild, OnInit, Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {classifier} from '../../models/classifier.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.css']
})

export class RiskComponent implements OnInit {
  riskId = '';
  customerName = '';
  customerNumber = '';
  currentClassification = '';
  suggestedClassification = '';
  createDate = '';
  user = '';
  result: risk[];
  result2: classifier[];
  dataSource: any = null;
  dataSourceTable2: any = null;
  riskClassifierId = '';
  riskClassifierName = '';
  createDate2 = '';
  riskClassifierDesc = '';
  classifierThreshold = '';
  weight = '';

  @ViewChild(MatSort) msort: MatSort;

  displayedColumns = ['select','risk_Assmnt_Id', 'cust_Name', 'cust_No', 'risk_Class', 'proposed_Risk_Class', 'create_Date', 'owner_User_Long_Id'];
  selection = new SelectionModel<risk>(true, []);
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;

  displayedColumnsforClassfirerTable = ['riskClassifierId', 'riskClassifierName', 'createDate', 'riskClassifierDesc', 'classifierThreshold' , 'weight'];
  @ViewChild('paginatorClassifier') paginatorClassifier: MatPaginator;
  @ViewChild('sortClassifier') sortClassifier: MatSort;

  constructor(private http: HttpClient,
    public dialog: MatDialog,
              private riskService: RiskService,
              public translate: TranslateService) {
  }

/*----------------*/
   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }
/*----------------*/

  getRecord(row: any) {
    console.log(row);
    this.riskId = row.risk_Assmnt_Id;
    this.customerName = row.cust_Name;
    this.customerNumber = row.cust_No;
    this.createDate = row.create_Date;
    this.currentClassification = row.risk_Class;
    this.suggestedClassification = row.proposed_Risk_Class;
    this.user = row.owner_User_Long_Id;
  }

  ngOnInit() {
    const url = 'http://localhost:8081/aml/api/accountriskassigment/getObject';
    this.http.get<risk[]>(url).subscribe(data => {
      this.result = data;
      this.dataSource = new MatTableDataSource(data);
      //console.log(this.sort);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
     this.getDataSecondTable();

  }

  // ngAfterViewInit() {
  //   console.log("ngAfterViewInit");
  //   this.sort = this.msort;
  //   this.sortClassifier = this.msort;
  // }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  applyFilterSecond(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceTable2.filter = filterValue;
  }

  resetFields() {
    this.riskId = '';
    this.customerName = '';
    this.customerNumber = '';
    this.currentClassification = '';
    this.suggestedClassification = '';

  }

  getDataSecondTable() {
    const url = 'http://localhost:8081/aml/api/acriskclassifier';
    this.http.get<classifier[]>(url).subscribe(data2 => {
      this.result2 = data2;
      this.dataSourceTable2 = new MatTableDataSource(data2);
      console.log(this.sortClassifier);
      this.dataSourceTable2.paginator = this.paginatorClassifier;
      this.dataSourceTable2.sort = this.sortClassifier;
      
    });
    //this.dataSource.sort = this.sort;
  }

  //Forward
  openDialog(){
    console.log("openDialog");
    const numSelected = this.selection.selected.length;
    if (numSelected === 0) {
      alert("Select at least one suspect,please");
      return;
    }

    let dialogRef = this.dialog.open(RiskForwardComponent, {

      height: '400px',
      width: '600px',

      data: { selected: this.selection.selected }
    });

    dialogRef.afterClosed().subscribe(result => {

    }, error => {

    }

    );
    this.en_ar_Dialog();
  }
  en_ar_Dialog(){
    //  console.log("lllll");
    //  console.log($('.selected_Language').text());
     if($('.selected_Language').text() != "English")
         $('.forwardContainer').css('text-align', 'right' );
  }
  takeOwnerShip(){
    const numSelected = this.selection.selected.length;
    if (numSelected === 0) {
      alert("Select at least one suspect,please");
      return;
    }

    //need id of the logged user
    let loggedUser = "test-loggedUser" ;

    this.selection.selected.forEach(element => {
      let prev_owner = element["owner_User_Long_Id"];
      element["owner_User_Long_Id"] = loggedUser;
      console.log(element["risk_Assmnt_Id"]);
      this.riskService.takeOwnerShipService(element["risk_Assmnt_Id"],loggedUser).subscribe(data => { },
        error => {
          element["owner_User_Long_Id"] = prev_owner;
        }
      );
    });
  }
  removeOwnerShip(){
    const numSelected = this.selection.selected.length;
    if (numSelected === 0) {
      alert("Select at least one suspect,please");
      return;
    }

    this.selection.selected.forEach(element => {
      let prev_owner = element["owner_User_Long_Id"];
      element["owner_User_Long_Id"] = null;
      this.riskService.removeOwnerShip(element["risk_Assmnt_Id"]).subscribe(data => { },
        error => {
          element["owner_User_Long_Id"] = prev_owner;
        }
      );
    });
  }
  approveRisk(){
    const numSelected = this.selection.selected.length;
    if (numSelected === 0) {
      alert("Select at least one suspect,please");
      return;
    }

    var tindex = this.getSelectedIndex();
    this.selection.selected.forEach(element => {
      this.dataSource.data.splice(tindex,1);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.selection = new SelectionModel<risk>(true, []);
      this.riskService.approveRisk(element["risk_Assmnt_Id"], element['cust_No']).subscribe(data => { },
        error => {
          
        }
      );
    });
  }
  declineRisk(){
    const numSelected = this.selection.selected.length;
    if (numSelected === 0) {
      alert("Select at least one suspect,please");
      return;
    }

    var tindex = this.getSelectedIndex();
    this.selection.selected.forEach(element => {
      this.dataSource.data.splice(tindex,1);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.selection = new SelectionModel<risk>(true, []);
      this.riskService.riskDecline(element["risk_Assmnt_Id"]).subscribe(data => { },
        error => {
          
        }
      );
    });
  }

  getSelectedIndex(){
    var sd = "";
    this.selection.selected.forEach(element => {
      sd = element["risk_Assmnt_Id"];
    });
    // console.log("=");
    var tindex = 0;
    this.dataSource.data.forEach((element,index) => {
      if(element["risk_Assmnt_Id"] == sd ){
        tindex = index;
      }
    });
    // console.log("selected index:");
    // console.log(tindex);
    return tindex;
  }

}

