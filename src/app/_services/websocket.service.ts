import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EMPTY, fromEvent, Observable, Subscriber } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '@environments/environment';
import { CommentEvents } from '@helpers/comment.events';
import { ListItemEvents } from '@helpers/list-item.events';
import { ListEvents } from '@helpers/list.events';
import { CommentModel } from '@models/comment.model';
import { ListModel } from '@models/list.model';
import { ListItemModel } from '@models/list-item.model';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private socket?: Socket;
  private connectionData?: string;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  connect(connectionData: string) {
    if (this.isBrowser) {
      this.connectionData = connectionData;
      if (environment.websocket) {
        this.socket = io(environment.websocket, {
          withCredentials: true,
          path: '/socket-io',
          transports: ['polling'],
        });
        this.socket.emit('join', connectionData);
      }
    }
  }
  private fromSocketEvent<T>(event: string): Observable<T> {
    if (!this.socket) {
      return EMPTY; // Return an empty observable if the socket is not defined.
    }
    return fromEvent(this.socket, event);
  }
  listen(event: Partial<string | CommentEvents | ListItemEvents>) {
    return new Observable((subscriber: Subscriber<any>) => {
      this.socket?.on(event, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  /* --------- List Events -------------- */
  public onEditList(): Observable<ListModel> {
    return this.fromSocketEvent<ListModel>(ListEvents.UPDATE_LIST);
  }
  public onDeleteList(): Observable<ListModel> {
    return this.fromSocketEvent<ListModel>(ListEvents.DELETE_LIST);
  }
  /* --------- End List Events ---------- */
  /* --------- List Items Events -------------- */
  public onAddItem(): Observable<ListItemModel> {
    return this.fromSocketEvent<ListItemModel>(ListItemEvents.ADD_ITEM);
  }

  public onUpdateItem(): Observable<ListItemModel> {
    return this.fromSocketEvent<ListItemModel>(ListItemEvents.UPDATE_ITEM);
  }

  public onDeleteItem(): Observable<ListItemModel> {
    return this.fromSocketEvent<ListItemModel>(ListItemEvents.DELETE_ITEM);
  }

  public onCompleteItem(): Observable<any> {
    return this.fromSocketEvent<ListItemModel>(ListItemEvents.COMPLETE_ITEM);
  }
  /* --------- End List Items Events ---------- */

  /* --------- Comment Events ----------- */
  public onCreateComment(): Observable<CommentModel> {
    return this.fromSocketEvent<CommentModel>(CommentEvents.CREATE_COMMENT);
  }

  public onUpdateComment(): Observable<CommentModel> {
    return this.fromSocketEvent<CommentModel>(CommentEvents.UPDATE_COMMENT);
  }

  public onDeleteComment(): Observable<CommentModel> {
    return this.fromSocketEvent<CommentModel>(CommentEvents.DELETE_COMMENT);
  }
  /* --------- End Comment Events ------- */
  emit(event: string | CommentEvents | ListItemEvents, data: any) {
    this.socket?.emit(event, data);
  }
  disconnect(): void {
    this.socket?.disconnect();
  }
}
