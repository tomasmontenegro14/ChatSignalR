import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Messages } from '../message';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  username: string;
  message: string;
  messages$: Observable<Messages>;

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.messages$ = this.chatService.getReceiver();
  }

  enviar() {
    this.chatService.sendMessage({username: this.username, message: this.message});
  }

}
