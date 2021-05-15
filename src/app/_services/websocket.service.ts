import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent, Observable, Subscriber } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { CommentModel } from '../models/comment.model';
import { CommentEvents } from '../helper/comment.events';
import { ListItemEvents } from '../helper/list-item.events';
import { ListItemModel } from '../models/list-item.model';
import { ListEvents } from '../helper/list.events';
import { ListModel } from '../models/list.model';

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
        transports: ['polling'],
      });
      this.socket.emit('join', connectionData);
    }
  }

  listen(event: Partial<string | CommentEvents | ListItemEvents>) {
    return new Observable((subscriber: Subscriber<any>) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });
    });
  }

  /* --------- Comment Events ----------- */
  public onCreateComment(): Observable<CommentModel> {
    return fromEvent(this.socket, `${CommentEvents.CREATE_COMMENT}`);
  }

  public onUpdateComment(): Observable<CommentModel> {
    return fromEvent(this.socket, `${CommentEvents.UPDATE_COMMENT}`);
  }

  public onDeleteComment(): Observable<CommentModel> {
    return fromEvent(this.socket, `${CommentEvents.DELETE_COMMENT}`);
  }

  /* --------- End Comment Events ------- */

  /* --------- List Events -------------- */
  public onDeleteList(): Observable<ListModel> {
    return fromEvent(this.socket, `${ListEvents.DELETE_List}`);
  }
  public onAddItem(): Observable<Partial<ListItemModel & { isEditing: boolean }>> {
    return fromEvent(this.socket, `${ListItemEvents.ADD_ITEM}`);
  }

  public onUpdateItem(): Observable<ListItemModel> {
    return fromEvent(this.socket, ListItemEvents.UPDATE_ITEM);
  }

  public onDeleteItem(): Observable<ListItemModel> {
    return fromEvent(this.socket, `${ListItemEvents.DELETE_ITEM}`);
  }

  public onCompleteItem(): Observable<any> {
    return fromEvent(this.socket, `${ListItemEvents.COMPLETE_ITEM}`);
  }

  /* --------- End List Events ---------- */
  emit(event: string | CommentEvents | ListItemEvents, data: any) {
    this.socket.emit(event, data);
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
