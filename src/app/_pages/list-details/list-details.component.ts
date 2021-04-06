import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { WebsocketService } from '../../_services/websocket.service';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.sass']
})
export class ListDetailsComponent implements OnInit, OnDestroy {
  username: string;
  slug: string;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute,
    private webSocketService: WebsocketService
  ) {
    if (this.isBrowser) {
      this.username = this.route.snapshot.params.username;
      this.slug = this.route.snapshot.params.slug;
      this.webSocketService.connect(`${this.username}-${this.slug}`);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.webSocketService.disconnect();
    }
  }
}
