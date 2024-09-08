import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { ListCommentsComponent } from '@components/list-comments/list-comments.component';
import { ListItemsComponent } from '@components/list-items/list-items.component';
import { ListHeaderComponent } from '@components/list-header/list-header.component';
import { WebsocketService } from '@services/websocket.service';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.sass'],
  standalone: true,
  imports: [ListHeaderComponent, ListItemsComponent, ListCommentsComponent],
})
export class ListDetailsComponent implements OnInit, OnDestroy {
  username!: string;
  slug!: string;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  onListEdit$!: Subscription;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute,
    private router: Router,
    private webSocketService: WebsocketService,
    private alertService: AlertService
  ) {
    if (this.isBrowser) {
      this.username = this.route.snapshot.params['username'];
      this.slug = this.route.snapshot.params['slug'];
      this.webSocketService.connect(`${this.slug}`);
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.onListEdit$ = this.webSocketService.onEditList().subscribe({
        next: res => {
          if (res.slug !== this.slug) {
            this.alertService.success('Redirecting soon.');
            setTimeout(() => {
              this.router.navigateByUrl(`l/${res.slug}`).finally(() => {
                location.reload();
              });
            }, 1000);
          }
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.onListEdit$.unsubscribe();
      this.webSocketService.disconnect();
    }
  }
}
