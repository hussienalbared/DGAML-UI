import { Component, OnInit } from '@angular/core';
import { Element } from '@angular/compiler';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alarm-brief',
  templateUrl: './alarm-brief.component.html',
  styleUrls: ['./alarm-brief.component.css']
})
export class AlarmBriefComponent implements OnInit {
  // dataSource = datta.acAlarm;
  displayedColumns = ['alarmId', 'primaryObjLevelCode', 'routineName',
    'routineCategoryCode', 'routineDescription', 'runDate'];

  datasource2: /*Element2[]=[]*/any=[];
  processed:Element2[]=[];
  constructor(private http:HttpClient) {


  }

  ngOnInit() {
    // private key,private code;
    // let Url="http://localhost:8081/aml/api/v1/alarms?key="+this.key+"&code="+this.code;
   
this.getData();  

  }
  getData()
  {
    let Url="http://localhost:8081/aml/api/v1/alarms?key=1&code=A";
    this.http.get<Element1>(Url).subscribe(data => {
  this.datasource2=data.acAlarm;    
   console.log("length of datasorce 2 "+this.datasource2.length);
   this.processData()
    });


  }
  processData() {
    console.log("length of datasorce 2 "+this.datasource2.length);

    this.datasource2.forEach((alarm) => {
if(alarm.acroutine.length==0){
  var x: Element2 = {
    alarmId: 0, primaryObjLevelCode: '', routineCategoryCode: '',
    routineDescription: '', routineName: '', runDate: ''
  };
  x.alarmId = alarm.alarmId;
  x.primaryObjLevelCode = alarm.primaryObjLevelCode;
  x.routineName = alarm.routineName;
  x.runDate = alarm.runDate;

  this.processed.push(x);

}

      alarm.acroutine.forEach((ac) => {
        var x: Element2 = {
          alarmId: 0, primaryObjLevelCode: '', routineCategoryCode: '',
          routineDescription: '', routineName: '', runDate: ''
        };
        x.routineCategoryCode = ac.routineCategoryCode;
        x.routineDescription = ac.routineDescription;

        x.alarmId = alarm.alarmId;
        x.primaryObjLevelCode = alarm.primaryObjLevelCode;
        x.routineName = alarm.routineName;
        x.runDate = alarm.runDate;

        this.processed.push(x);
      });


    })
 
    this.datasource2 = this.processed;
  }
}


export interface Element2 {
  alarmId: number;
  primaryObjLevelCode: string;
  routineName: string;
  routineCategoryCode: string;
  routineDescription: string;
  runDate: string;

}
export interface Element1{
  acAlarm:any;
}
// const datta = {
//   "acAlarm": 
//   [
//     {
//         "alarmId": 7,
//         "acroutine": [],
//         "actualValuesText": "dhj",
//         "alarmCategoryCd": "aaa",
//         "alarmDescription": "abc",
//         "alarmStatusCode": "act",
//         "alarmSubcategoryCd": "ajk",
//         "alarmTypeCd": "dgd",
//         "alarmedObjKey": 2,
//         "alarmedObjLevelCode": "B",
//         "alarmedObjName": "sjhs",
//         "alarmedObjNumber": "cgg",
//         "createDate": "2013-03-06T22:00:00.000+0000",
//         "createUserId": "45",
//         "employeeInd": "a",
//         "logicalDeleteInd": "a",
//         "moneyLaunderingRiskScore": 12,
//         "primaryObjKey": 45,
//         "primaryObjLevelCode": "fhh",
//         "primaryObjName": "jhhdj",
//         "primaryObjNumber": "sjhs",
//         "productType": "abc",
//         "routineId": 45,
//         "routineName": "routinen",
//         "runDate": "2013-03-05T22:00:00.000+0000",
//         "suppressionEndDate": "2013-03-05T22:00:00.000+0000",
//         "terrorFinancingRiskScore": 15,
//         "versionNumber": 45
//     },
//     {
//         "alarmId": 8,
//         "acroutine": [],
//         "actualValuesText": "dhj",
//         "alarmCategoryCd": "aaa",
//         "alarmDescription": "abc",
//         "alarmStatusCode": "act",
//         "alarmSubcategoryCd": "ajk",
//         "alarmTypeCd": "dgd",
//         "alarmedObjKey": 2,
//         "alarmedObjLevelCode": "B",
//         "alarmedObjName": "sjhs",
//         "alarmedObjNumber": "cgg",
//         "createDate": "2013-03-06T22:00:00.000+0000",
//         "createUserId": "45",
//         "employeeInd": "a",
//         "logicalDeleteInd": "a",
//         "moneyLaunderingRiskScore": 12,
//         "primaryObjKey": 45,
//         "primaryObjLevelCode": "fhh",
//         "primaryObjName": "jhhdj",
//         "primaryObjNumber": "sjhs",
//         "productType": "abc",
//         "routineId": 46,
//         "routineName": "routinen",
//         "runDate": "2013-03-05T22:00:00.000+0000",
//         "suppressionEndDate": "2013-03-05T22:00:00.000+0000",
//         "terrorFinancingRiskScore": 15,
//         "versionNumber": 45
//     },
//     {
//       "alarmId": 6,
//       "acroutine": [
//         {
//           "routineId": 1030,
//           "alarmCategoryCd": null,
//           "alarmSubcategoryCd": null,
//           "alarmTypeCd": null,
//           "createDate": "1905-07-09T22:00:00.000+0000",
//           "createUserId": "test",
//           "currentInd": "E",
//           "dfltSuppressDurationCount": 2,
//           "endDate": "1905-07-09T22:00:00.000+0000",
//           "endUserId": null,
//           "executionProbabilityRate": 0.1,
//           "headerId": 111,
//           "logicalDeleteInd": "F",
//           "lstupdateDate": null,
//           "lstupdateUserId": null,
//           "moneyLaunderingBayesWeight": 4,
//           "objLevelCode": null,
//           "orderInHeader": null,
//           "primaryObjNumberVarName": null,
//           "productTypeCode": "C  ",
//           "riskFactorInd": null,
//           "rootKey": null,
//           "routineCategoryCode": "A  ",
//           "routineCodeLocationDesc": "test",
//           "routineDescription": "test",
//           "routineDurationCount": 3,
//           "routineName": "test",
//           "routineRunFrequencyCode": null,
//           "routineShortDescription": "test",
//           "routineStatusCode": "D  ",
//           "routineTypeCode": null,
//           "routingGroupId": null,
//           "routingUserLongId": null,
//           "saveTrigTransInd": null,
//           "skipIfNoTransCurrDayInd": null,
//           "terrorFinancingBayesWeight": null,
//           "versionNumber": 1,
//           "vsdDeploymentName": null,
//           "vsdWindowName": null
//         }
//       ],
//       "actualValuesText": "dhj",
//       "alarmCategoryCd": "aaa",
//       "alarmDescription": "abc",
//       "alarmStatusCode": "act",
//       "alarmSubcategoryCd": "ajk",
//       "alarmTypeCd": "dgd",
//       "alarmedObjKey": 2,
//       "alarmedObjLevelCode": "B",
//       "alarmedObjName": "sjhs",
//       "alarmedObjNumber": "cgg",
//       "createDate": "2013-03-06T22:00:00.000+0000",
//       "createUserId": "45",
//       "employeeInd": "a",
//       "logicalDeleteInd": "a",
//       "moneyLaunderingRiskScore": 12,
//       "primaryObjKey": 45,
//       "primaryObjLevelCode": "fhh",
//       "primaryObjName": "jhhdj",
//       "primaryObjNumber": "sjhs",
//       "productType": "abc",
//       "routineId": 1030,
//       "routineName": "ahgdh",
//       "runDate": "2013-03-05T22:00:00.000+0000",
//       "suppressionEndDate": "2013-03-05T22:00:00.000+0000",
//       "terrorFinancingRiskScore": 15,
//       "versionNumber": 45
//     },
//     {
//       "alarmId": 2,
//       "acroutine": [
//         {
//           "routineId": 1030,
//           "alarmCategoryCd": null,
//           "alarmSubcategoryCd": null,
//           "alarmTypeCd": null,
//           "createDate": "1905-07-09T22:00:00.000+0000",
//           "createUserId": "test",
//           "currentInd": "E",
//           "dfltSuppressDurationCount": 2,
//           "endDate": "1905-07-09T22:00:00.000+0000",
//           "endUserId": null,
//           "executionProbabilityRate": 0.1,
//           "headerId": 111,
//           "logicalDeleteInd": "F",
//           "lstupdateDate": null,
//           "lstupdateUserId": null,
//           "moneyLaunderingBayesWeight": 4,
//           "objLevelCode": null,
//           "orderInHeader": null,
//           "primaryObjNumberVarName": null,
//           "productTypeCode": "C  ",
//           "riskFactorInd": null,
//           "rootKey": null,
//           "routineCategoryCode": "A  ",
//           "routineCodeLocationDesc": "test",
//           "routineDescription": "test",
//           "routineDurationCount": 3,
//           "routineName": "test",
//           "routineRunFrequencyCode": null,
//           "routineShortDescription": "test",
//           "routineStatusCode": "D  ",
//           "routineTypeCode": null,
//           "routingGroupId": null,
//           "routingUserLongId": null,
//           "saveTrigTransInd": null,
//           "skipIfNoTransCurrDayInd": null,
//           "terrorFinancingBayesWeight": null,
//           "versionNumber": 1,
//           "vsdDeploymentName": null,
//           "vsdWindowName": null
//         }
//       ],
//       "actualValuesText": "dhj",
//       "alarmCategoryCd": "aaa",
//       "alarmDescription": "abc",
//       "alarmStatusCode": "cls",
//       "alarmSubcategoryCd": "ajk",
//       "alarmTypeCd": "dgd",
//       "alarmedObjKey": 2,
//       "alarmedObjLevelCode": "B",
//       "alarmedObjName": "sjhs",
//       "alarmedObjNumber": "cgg",
//       "createDate": "1905-06-26T22:00:00.000+0000",
//       "createUserId": "45",
//       "employeeInd": "a",
//       "logicalDeleteInd": "a",
//       "moneyLaunderingRiskScore": 12,
//       "primaryObjKey": 45,
//       "primaryObjLevelCode": "fhh",
//       "primaryObjName": "jhhdj",
//       "primaryObjNumber": "sjhs",
//       "productType": "abc",
//       "routineId": 1030,
//       "routineName": "ahgdh",
//       "runDate": "1905-06-27T22:00:00.000+0000",
//       "suppressionEndDate": "1905-06-27T22:00:00.000+0000",
//       "terrorFinancingRiskScore": 15,
//       "versionNumber": 45
//     }
//   ],
//   "id": {
//     "objKey": 2,
//     "objLevelCode": "B"
//   },
//   "alertCount": 4,
//   "complianceUserid": null,
//   "createdOn": "2018-12-14",
//   "employeeInd": null,
//   "moneyLaunderingScore": 101,
//   "objName": "Test2",
//   "objNumber": "002",
//   "oldestAlert": 11,
//   "pepInd": null,
//   "riskClassificationCode": null,
//   "totalAmount": 2001,
//   "transactionsCount": 1001
// }