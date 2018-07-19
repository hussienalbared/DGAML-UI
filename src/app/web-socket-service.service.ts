import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

var SockJs = require("sockjs-client");
var Stomp = require("stompjs");

@Injectable()
export class WebSocketServiceService {

  constructor() { }

  // Open connection with the back-end socket
  public connect() {
    let socket = new SockJs(`${environment.ipAddress}/socket`);

    let stompClient = Stomp.over(socket);

    return stompClient;
  }
}
