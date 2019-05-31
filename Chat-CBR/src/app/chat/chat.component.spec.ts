import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Subject } from 'rxjs';

import { ChatComponent } from './chat.component';
import { ChatService } from '../chat.service';
import { Messages } from '../message';
import { FormsModule } from '@angular/forms';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatServiceSpy: jasmine.SpyObj<ChatService>;
  let messages$: Subject<Messages>;

  beforeEach(async(() => {
    messages$ = new Subject<Messages>();

    chatServiceSpy = jasmine.createSpyObj('ChatService', {
      getReceiver: messages$
    });

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ChatComponent],
      providers: [
        {
          provide: ChatService,
          useValue: chatServiceSpy
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe pintar tantos li como mensajes existan en la cola', () => {
    messages$.next([{ username: 'pepito', message: 'ola k ase' }, { username: 'pepita', message: 'vientos y ud que?' }]);
    fixture.detectChanges();

    const lis = fixture.debugElement.queryAll(By.css('li'));

    expect(lis.length).toBe(2);
  });
});
