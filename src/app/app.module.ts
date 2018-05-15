import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';


import { RouterModule } from '@angular/router';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutComponent } from './components/layout/layout.component';
import { CdkTableModule } from '@angular/cdk/table';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AccountSearchComponent } from './components/account-search/account-search.component';
import { AlaramSearchComponent } from './components/alaram-search/alaram-search.component';
import { PartySearchComponent } from './components/party-search/party-search.component';
import { ExternalPartySearchComponent } from './components/external-party-search/external-party-search.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { AuthService } from './services/auth.service';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function tokenGetter() {
  return localStorage.getItem('token');
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
    MatSelectModule,
  MatProgressSpinnerModule,
    
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'account', component: AccountSearchComponent },
      { path: 'alarm', component: AlaramSearchComponent },
      { path: 'party', component: PartySearchComponent },
      { path: 'external', component: ExternalPartySearchComponent },
      {
        path: 'suspects',
        component: SuspectsComponent,
        canActivate: [AuthGuardService]
      },
      { path: 'suspectDetail/:obj_key/:obj_level_code/:obj_number', component: SuspectDetailUipageComponent },
      { path: 'alarmDetail/:alarmId', component: AlarmDetail1Component },
      {
        path:'accountDetail/:accountNumber/:obj_key/:obj_level_code',
        component:AccountDetailComponent
      },
      {
        path:'TransactionDeatil/:ttrn',
        component:TransactionDetailsComponent
      }

    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [/^null$/],
        blacklistedRoutes: ['localhost:8081/aml/auth/']
      }
    }),
  ],
  providers: [AuthService, AuthGuardService, JwtHelperService, SuspectsService],
  bootstrap: [AppComponent],
  entryComponents: [ForwardComponent, SelectCloseReasonComponent],
})
export class AppModule { }
