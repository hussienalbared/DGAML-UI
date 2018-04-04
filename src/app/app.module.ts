import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { AccountSearchComponent } from './account-search/account-search.component';
import { SearchAccountService } from './search-account.service';
import { HttpModule , Http } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlaramSearchComponent } from './alaram-search/alaram-search.component';
import { PartySearchComponent } from './party-search/party-search.component';
import { ExternalPartySearchComponent } from './external-party-search/external-party-search.component';
import { RouterModule} from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopBarComponent } from './top-bar/top-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    AccountSearchComponent,
    AlaramSearchComponent,
    PartySearchComponent,
    ExternalPartySearchComponent,
    SideMenuComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot([
      {
         path: 'account',
         component: AccountSearchComponent
      },
      {
        path: 'alarm',
        component:  AlaramSearchComponent

      }
      ,
      {
        path: 'party',
        component:  PartySearchComponent

      }
      ,
      {
        path: 'external',
        component:  ExternalPartySearchComponent

      }
   ])
  ],
  providers: [SearchAccountService, Http,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
