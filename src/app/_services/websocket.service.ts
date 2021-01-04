import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: any;
  comments: Subject<any>;
  constructor() {
    this.socket = io(environment.websocket, {
      withCredentials: true
    });
    this.comments = (this.connect()
      .pipe((myResponse: any): any => {
      return myResponse;
    }) as Subject<any>);
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
}
