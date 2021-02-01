import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, fromEvent, Subscriber } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Comment } from "../models/comment.model";
import { CommentEvents } from "../helper/comment.events";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private socket: Socket;
  private connectionData: string;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }
  connect(connectionData) {
    if (this.isBrowser) {
      this.connectionData = connectionData;
      this.socket = io(environment.websocket, {
        withCredentials: true,
        path: '/socket-io',
        transports: ["polling"],
        forceNew: true,
      });
    }
  }
  listen(event: string) {
    return new Observable((subscriber: Subscriber<any>) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });
    });
  }
  public onCreateComment(): Observable<Comment> {
    return fromEvent(this.socket, `${CommentEvents.CREATE_COMMENT}`);
  }
  public onUpdateComment(): Observable<Comment> {
    return fromEvent(this.socket, `${CommentEvents.UPDATE_COMMENT}`)
  }
  public onDeleteComment(): Observable<Comment> {
    return fromEvent(this.socket, `${CommentEvents.DELETE_COMMENT}`)
  }
  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
  disconnect(): void {
    this.socket.disconnect();
  }
}
