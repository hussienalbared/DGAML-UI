import { CommentService } from './services/comment.service';
import { WebSocketServiceService } from './web-socket-service.service';
import { CommentComponent } from './components/suspect/comment/comment.component';
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
  MatInputModule, MatCardModule, MatTooltipModule, MatToolbarModule, MatRadioModule, MatSnackBarModule, MatSlideToggleModule, MatSliderModule, MatSelectModule, MatRippleModule, MatProgressBarModule, MatProgressSpinnerModule, MatNativeDateModule, MatGridListModule, MatDatepickerModule, MatStepperModule, MatChipsModule, MatButtonToggleModule, MatAutocompleteModule, MatTabsModule, MatIconModule
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

import { RiskService } from './services/risk.service';
import { UserService } from './services/user.service';

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
import { AccountAlarmInBriefComponent } from './components/accounts/account-alarm-in-brief/account-alarm-in-brief.component';
import { AccountsService } from './services/accounts.service';
import { Section3Component } from './components/accounts/section3/section3.component';
import { AccountDetailSearchComponent } from './components/accounts/account-detail-search/account-detail-search.component';
import { TabsServiceService } from './services/tabs-service.service';
import { AddTabDirective } from './directives/add-tab.directive';

import { RiskComponent } from './components/risk/risk.component';

import { RiskForwardComponent } from './components/risk/risk-forward/risk-forward.component';
import { NgProgressModule } from 'ngx-progressbar';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserComponent } from './components/user/user.component';
import { AddNewUserComponent } from './components/user/add-new-user/add-new-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { AddGroupComponent } from './components/group/add-group/add-group.component';
import { EditGroupComponent } from './components/group/edit-group/edit-group.component';
import { GroupService } from './services/group.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AttachmentComponent } from './components/attachment/attachment.component';
import { AttachmentService } from './services/attachment.service';

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
    AccountAlarmInBriefComponent,

    Section3Component,

    AccountDetailSearchComponent,
    RiskComponent,

    AddTabDirective,

    RiskForwardComponent,

    WelcomeComponent,

    UserComponent,

    AddNewUserComponent,

    UpdateUserComponent,
    AddGroupComponent,

    EditGroupComponent,

    UserProfileComponent,
    CommentComponent,

    AttachmentComponent,

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

    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    NgProgressModule,

    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatGridListModule,
    RouterModule.forRoot([
      //   {
      //   path: '',
      //   component: WelcomeComponent
      //   ,canActivate: [AuthGuardService]
      // },
      // {
      //   path: 'welcome',
      //   component: WelcomeComponent
      //   // ,canActivate: [AuthGuardService]
      // },
      {
        path: '',
        component: LoginComponent
        // ,canActivate: [AuthGuardService]
      },
      {
        path: 'welcom',
        component: WelcomeComponent
        // ,canActivate: [AuthGuardService]
      },
      {
        path: 'login',
        component: LoginComponent
        // ,canActivate: [AuthGuardService]
      },
      { path: 'account', 
        component: AccountSearchComponent
        , canActivate: [AuthGuardService] 
      },
      { path: 'alarm', 
        component: AlaramSearchComponent
        , canActivate: [AuthGuardService] 
      },
      { path: 'party', 
        component: PartySearchComponent
        , canActivate: [AuthGuardService] 
      },
      { path: 'external', 
        component: ExternalPartySearchComponent
        , canActivate: [AuthGuardService] 
      },
      {
        path: 'suspects',
        component: SuspectsComponent
        ,canActivate: [AuthGuardService]
      },
      {
        path: 'suspectDetail/:obj_key/:obj_level_code/:obj_number',
        component: SuspectDetailUipageComponent
        , canActivate: [AuthGuardService]
      },
      {
        path: 'alarmDetail/:alarmId',
        component: AlarmDetail1Component
        , canActivate: [AuthGuardService]
      },
      {
        path: 'accountDetail/:accountNumber/:obj_key/:obj_level_code',
        component: AccountDetailComponent
        , canActivate: [AuthGuardService]
      },
      {
        path: 'accountDetailSearch/:accountNumber/:account_Key',
        component: AccountDetailSearchComponent
        , canActivate: [AuthGuardService]
      },
      {
        path: 'TransactionDeatil/:ttrn',
        component: TransactionDetailsComponent
        , canActivate: [AuthGuardService]
      },
      {
        path: 'risk',
        component: RiskComponent
        , canActivate: [AuthGuardService]
      },
      { path: 'user', 
        component: UserComponent
        , canActivate: [AuthGuardService] 
      },
      { 
        path:'groups',
        component:AddGroupComponent
      },
      {
        path: 'editGroup/:id',
        component: EditGroupComponent
       
      },
      {
        path:'profile',
        component:UserProfileComponent
      },
      { path: 'comment', 
        component: CommentComponent
        , canActivate: [AuthGuardService] 
      },
      
{
  path:'attachment/:obj_key/:obj_level_code',
  component:AttachmentComponent
}

    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8081'],
        blacklistedRoutes: ['http://localhost:8081/aml/auth']
      }
    }),
  ],
  providers: [AuthService, AuthGuardService, JwtHelperService, SuspectsService, AccountsService, RiskService, 
    TabsServiceService,UserService,GroupService,CommentService,WebSocketServiceService,AttachmentService],

  bootstrap: [AppComponent],
  entryComponents: [ForwardComponent, SelectCloseReasonComponent, RiskForwardComponent,AddNewUserComponent,UpdateUserComponent],
})
export class AppModule { }
