import { ToastsManager } from 'ng2-toastr';
import { NotificationService } from './../../services/notification.service';
import { element } from 'protractor';
import { RiskForwardComponent } from './risk-forward/risk-forward.component';
import { RiskService } from './../../services/risk.service';
import { AuthService } from '../../services/auth.service';
import { risk } from './../../models/risk.model';

import { ViewChild, OnInit, Component, ViewContainerRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {classifier} from '../../models/classifier.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

import { environment } from '../../../environments/environment';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
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
    private authService: AuthService,
              private riskService: RiskService,
              public translate: TranslateService,
            private notification:NotificationService,
            public toastr: ToastsManager, vcr: ViewContainerRef) {

              this.toastr.setRootViewContainerRef(vcr);
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
    
    this.riskId = row.risk_Assmnt_Id;
    this.customerName = row.cust_Name;
    this.customerNumber = row.cust_No;
    this.createDate = row.create_Date;
    this.currentClassification = row.risk_Class;
    this.suggestedClassification = row.proposed_Risk_Class;
    this.user = row.owner_User_Long_Id;
  }

  ngOnInit() {
    const url = environment.ipAddress+'/aml/api/accountriskassigment/getObject';
    this.http.get<risk[]>(url).subscribe(data => {
      this.result = data;
      this.dataSource = new MatTableDataSource(data);
      //
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
     this.getDataSecondTable();

  }

  // ngAfterViewInit() {
  //   
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
    const url = environment.ipAddress+'/aml/api/acriskclassifier';
    this.http.get<classifier[]>(url).subscribe(data2 => {
      this.result2 = data2;
      this.dataSourceTable2 = new MatTableDataSource(data2);
      
      this.dataSourceTable2.paginator = this.paginatorClassifier;
      this.dataSourceTable2.sort = this.sortClassifier;
      
    });
    //this.dataSource.sort = this.sort;
  }

  //Forward
  openDialog(){
    
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
    //  
    //  
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
    let loggedUser = this.authService.userName ;

    this.selection.selected.forEach(element => {
      let prev_owner = element["owner_User_Long_Id"];
      element["owner_User_Long_Id"] = loggedUser;
      
      this.riskService.takeOwnerShipService(element["risk_Assmnt_Id"],loggedUser).subscribe(data => {
        this.notification.riskNotifictionOwner(element["risk_Assmnt_Id"],'take-ownership-risk',localStorage.getItem('id'))

        this.toastr.success('You have been assigned to the suspect', 'Success!');
       },
        error => {
          element["owner_User_Long_Id"] = prev_owner;

          this.toastr.error('Got an issue, check the connection ', 'Oops!');
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
      this.riskService.removeOwnerShip(element["risk_Assmnt_Id"]).subscribe(data => {
        
        
        this.notification.riskNotifictionOwner(element["risk_Assmnt_Id"],'remove-ownership-risk',localStorage.getItem('id'))

        this.toastr.success('You have been removed from the suspect', 'Success!');
      },
        error => {
          element["owner_User_Long_Id"] = prev_owner;
          this.toastr.error('Got an issue, check the connection ', 'Oops!');
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
      this.riskService.approveRisk(element["risk_Assmnt_Id"], element['cust_No']).subscribe(data => {
        this.notification.riskNotifictionOwner(element["risk_Assmnt_Id"],'approve-risk',localStorage.getItem('id'))

        this.toastr.success('Approve operation done sucssefully ', 'Success!');
       },
        error => {
          this.toastr.error('Got an issue, check the connection ', 'Oops!');
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
      this.riskService.riskDecline(element["risk_Assmnt_Id"]).subscribe(data => {
        this.notification.riskNotifictionOwner(element["risk_Assmnt_Id"],'decline-risk',localStorage.getItem('id'))

        this.toastr.success('Delete operation done sucssefully ', 'Success!');
       },
        error => {
          this.toastr.error('Got an issue, check the connection ', 'Oops!');
        }
      );
    });
  }

  getSelectedIndex(){
    var sd = "";
    this.selection.selected.forEach(element => {
      sd = element["risk_Assmnt_Id"];
    });
    // 
    var tindex = 0;
    this.dataSource.data.forEach((element,index) => {
      if(element["risk_Assmnt_Id"] == sd ){
        tindex = index;
      }
    });
    // 
    // 
    return tindex;
  }
  ExportasCSV()
  {
    new Angular5Csv(this.result, 'My Report');
  }
  
 
}

