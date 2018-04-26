import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AccountSearchComponent } from './account-search/account-search.component';
import { SearchAccountService } from './search-account.service';
import { HttpModule, Http } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlaramSearchComponent } from './alaram-search/alaram-search.component';
import { PartySearchComponent } from './party-search/party-search.component';
import { ExternalPartySearchComponent } from './external-party-search/external-party-search.component';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatCardModule, MatTooltipModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MainContentComponent } from './main-content/main-content.component';
// import { SuspectsComponent } from './components/suspect/suspects/suspects.component';

import { AlarmBriefComponent } from './components/alarms/alarm-brief/alarm-brief.component';
import { TransactionBriefComponent } from './components/transactions/transaction-brief/transaction-brief.component';
import { SuspectDetailsComponent } from './components/suspect/suspect-details/suspect-details.component';
import { SuspectDetailUipageComponent } from './components/suspect/suspect-detail-uipage/suspect-detail-uipage.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ForwardComponent } from './components/suspect/forward/forward.component';
import { SuspectsComponent } from './components/suspect/suspects/suspects.component';
import { SelectCloseReasonComponent } from './components/alarms/select-close-reason/select-close-reason.component';
import { AlarmDetail1Component } from './components/alarms/alarm-detail-1/alarm-detail-1.component';
import { TransactionDetailsComponent } from './components/transactions/transaction-details/transaction-details.component';
import { AccountDetailComponent } from './components/accounts/account-detail/account-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountSearchComponent,
    AlaramSearchComponent,
    PartySearchComponent,
    ExternalPartySearchComponent,
    SideMenuComponent,
    TopBarComponent,
    MainContentComponent,
    SuspectsComponent,
  
    AlarmBriefComponent,
  
    TransactionBriefComponent,
  
    SuspectDetailsComponent,
  
    SuspectDetailUipageComponent,
  
    ForwardComponent,
  
    SelectCloseReasonComponent,
  
    AlarmDetail1Component,
  
    TransactionDetailsComponent,
  
    AccountDetailComponent,
  
   
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    RouterModule.forRoot([
      {
        path: 'account',
        component: AccountSearchComponent
      },
      {
        path: 'alarm',
        component: AlaramSearchComponent
      }
      ,
      {
        path: 'party',
        component: PartySearchComponent
      }
      ,
      {
        path: 'external',
        component: ExternalPartySearchComponent
      }
      ,{
        path:'suspects',
        component:SuspectsComponent
      }
      ,{

        path:'suspectDetail/:obj_key/:obj_level_code/:obj_number',
        component:SuspectDetailUipageComponent
      }
      ,{
        path:'alarmDetail-1/:alarmId',
        component:AlarmDetail1Component
      },
      {
        path:'TransactionDeatil/:ttrn',
        component:TransactionDetailsComponent

      }
      ,{
        path:'accountDetail/:accountNumber/:obj_number/:obj_key/:obj_level_code',
        component:AccountDetailComponent

      }
      
    ])
  ],
  providers: [SearchAccountService, Http, HttpClient],
  bootstrap: [AppComponent],
   entryComponents:[ForwardComponent,SelectCloseReasonComponent],
})
export class AppModule { }
