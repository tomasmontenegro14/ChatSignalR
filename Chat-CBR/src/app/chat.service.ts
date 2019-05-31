
import { Injectable } from '@angular/core';

// import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Observable, Subject } from 'rxjs';

import { Messages, Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private connection: signalR.HubConnection;
  private messages: Messages = [];
  private messages$: Subject<Messages> = new Subject<Messages>();

  constructor() {
    this.iniciarConexion();
    this.registrarEventos();
  }

  private iniciarConexion() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/hub')
      .build();
    this.connection.start().catch(error => {
      debugger;
      console.log(error);
    });
  }

  private registrarEventos() {
    this.connection.on('messageReceived', (message: Message) => {
      this.messages.push(message);
      this.messages$.next(this.messages);
    });
  }

  getReceiver(): Observable<Messages> {
    return this.messages$;
  }

  sendMessage(newMessage: Message): Promise<void> {
    return this.connection.invoke('newMessage', newMessage);
  }
}
