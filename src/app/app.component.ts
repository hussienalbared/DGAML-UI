import { WebSocketServiceService } from './web-socket-service.service';
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

  public notifications = 0;
  public A=null;

  constructor(private translate: TranslateService, private authService: AuthService,private webSocketService: WebSocketServiceService) {
    translate.addLangs(['en', 'ar']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // translate.setDefaultLang('ar');
    // translate.use('ar');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    /******************************* */
    // Open connection with server socket
    
  //   let stompClient = this.webSocketService.connect();
  //   stompClient.connect({}, frame => {

  //   // Subscribe to notification topic
  //     stompClient.subscribe('/topic/notification', notifications => {
  //       // Update notifications attribute with the recent messsage sent from the server
  //       this.notifications = JSON.parse(notifications.body).count;
  //    })
  // });
}

  
changeLang(targLang:string){
  console.log("App");
}

}
