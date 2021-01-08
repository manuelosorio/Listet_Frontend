import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  // comments: Subject<any>;
  private socket: Socket;
  constructor(
    // tslint:disable-next-line:ban-types
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (this.isBrowser) {
      this.socket = io(environment.websocket, {
        withCredentials: true,
        path: 'socket-io',
      });
      // this.comments = (this.connect()
      //   .pipe((myResponse: any): any => {
      //     return myResponse;
      //   }) as Subject<any>);
    }
  }

  connect(): Subject<MessageEvent> {
    const observable = new Observable(observer => {
      this.socket.on('CreateComment', (data) => {
        console.log('comment has been created:', data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    const observer$ = new Observable((observer) => {
      observer.next();
    });
    return Subject.create(observer$, observable);
  }

  // createComment(comment) {
  //   this.comments.next();
  // }
  listen(event: string) {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
  disconnect() {
    this.socket.disconnect();
  }
}
