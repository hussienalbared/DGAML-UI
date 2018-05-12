import {risk} from '../../models/risk.model';
import {ViewChild, OnInit, Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {classifier} from '../../models/classifier.model';

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

  displayedColumns = ['riskAssessmentId', 'partyName', 'partyNumber', 'riskClassification', 'proposedRiskClassification', 'createDate', 'ownerUserLongId'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumnsforClassfirerTable = ['riskClassifierId', 'riskClassifierName', 'createDate', 'riskClassifierDesc', 'classifierThreshold' , 'weight'];
  @ViewChild(MatPaginator) paginatorClassifier: MatPaginator;
  @ViewChild(MatSort) sortClassifier: MatSort;

  constructor(private http: HttpClient) {
  }

  getRecord(row: any) {
    console.log(row);
    this.riskId = row.riskAssessmentId;
    this.customerName = row.partyName;
    this.customerNumber = row.partyNumber;
    this.createDate = row.createDate;
  }

  ngOnInit() {
    const url = 'http://localhost:8081/aml/api/accountriskassigment';
    this.http.get<risk[]>(url).subscribe(data => {
      this.result = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.getDataSecondTable();

  }

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
    this.http.get<classifier[]>(url).subscribe(data => {
      this.result2 = data;
      this.dataSourceTable2 = new MatTableDataSource(data);
      this.dataSourceTable2.paginatorClassifier = this.paginatorClassifier;
      this.dataSourceTable2.sort = this.sortClassifier;
    });
  }

}
