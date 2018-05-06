import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {
  MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule,
  MatInputModule, MatCardModule, MatTooltipModule, MatToolbarModule, MatIconModule, MatRadioModule, MatTabsModule, MatSnackBarModule, MatSlideToggleModule, MatSliderModule, MatSelectModule, MatRippleModule, MatProgressBarModule, MatProgressSpinnerModule, MatNativeDateModule, MatGridListModule, MatDatepickerModule, MatStepperModule, MatChipsModule, MatButtonToggleModule, MatAutocompleteModule
} from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MainContentComponent } from './main-content/main-content.component';
// import { SuspectsComponent } from './components/suspect/suspects/suspects.component';

import { AlarmBriefComponent } from './components/alarms/alarm-brief/alarm-brief.component';
import { TransactionBriefComponent } from './components/transactions/transaction-brief/transaction-brief.component';
import { SuspectDetailsComponent } from './components/suspect/suspect-details/suspect-details.component';
import { SuspectDetailUipageComponent } from './components/suspect/suspect-detail-uipage/suspect-detail-uipage.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ForwardComponent } from './components/suspect/forward/forward.component';
import { SuspectsComponent } from './components/suspect/suspects/suspects.component';
import { SelectCloseReasonComponent } from './components/alarms/select-close-reason/select-close-reason.component';
import { AlarmDetail1Component } from './components/alarms/alarm-detail-1/alarm-detail-1.component';
import { TransactionDetailsComponent } from './components/transactions/transaction-details/transaction-details.component';
import { AccountDetailComponent } from './components/accounts/account-detail/account-detail.component';
import { SuspectsService } from './services/suspects.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LayoutComponent } from './components/layout/layout.component';
import { CdkTableModule } from '@angular/cdk/table';
import { LoginComponent } from './components/login/login.component';
import { MockAuthServiceService } from './services/mock-auth-service.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    LayoutComponent,
    LoginComponent,
  
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule
    ,
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
      , {
        path: 'suspects',
        component: SuspectsComponent
      }
      , {

        path: 'suspectDetail/:obj_key/:obj_level_code/:obj_number',
        component: SuspectDetailUipageComponent
      }
      , {
        path: 'alarmDetail-1/:alarmId',
        component: AlarmDetail1Component
      },
      {
        path: 'TransactionDeatil/:ttrn',
        component: TransactionDetailsComponent

      }
      , {
        path: 'accountDetail/:accountNumber/:obj_number/:obj_key/:obj_level_code',
        component: AccountDetailComponent
      }
      
     // {
      //   path:'home',
      //   component:LayoutComponent,
      //    outlet:'first',
        
        
      // },
      // {
      //   path:'',
      //   component:LoginComponent,
      //   outlet:'first'
      // }
    ])
  ],
  providers: [SearchAccountService, Http, HttpClient,
    SuspectsService,MockAuthServiceService],
  
  bootstrap: [AppComponent],
  exports:[ MatIconModule,
  CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule],
  entryComponents: [ForwardComponent, SelectCloseReasonComponent],
})
export class AppModule { }
