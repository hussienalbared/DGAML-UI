import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
@NgModule({
  declarations: [
    AppComponent,
    AccountSearchComponent,
    AlaramSearchComponent,
    PartySearchComponent,
    ExternalPartySearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
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
