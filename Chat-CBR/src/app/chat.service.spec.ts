import { TestBed } from '@angular/core/testing';

import { HubConnectionBuilder } from '@aspnet/signalr';

import { ChatService } from './chat.service';

describe('ChatService', () => {
  let buildSpy: jasmine.SpyObj<HubConnectionBuilder>;
  beforeEach(() => {
    buildSpy = jasmine.createSpyObj('HubConnectionBuilder', {
      build: {
        on: () => { },
        start: () => ({ catch: () => { } })
      }
    });
    spyOn(HubConnectionBuilder.prototype, 'withUrl')
      .and.returnValue(buildSpy);
  });

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatService = TestBed.get(ChatService);
    expect(service).toBeTruthy();
  });

  it('debe conectarse por le URL correcta al HUB', () => {
    const service = new ChatService();

    expect(HubConnectionBuilder.prototype.withUrl).toHaveBeenCalledWith('/hubs');
    expect(buildSpy.build).toHaveBeenCalled();
  });
});
