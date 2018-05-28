import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
 import * as $ from 'jquery';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private translate: TranslateService, private authService: AuthService) {
    translate.addLangs(['en', 'ar']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // translate.setDefaultLang('ar');
    // translate.use('ar');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  
changeLang(targLang:string){
  console.log("App");
}

}
