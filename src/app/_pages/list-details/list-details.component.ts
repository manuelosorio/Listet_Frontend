import { Component, OnDestroy, OnInit } from '@angular/core';
// import { WebsocketService } from "../../_services/websocket.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.sass']
})
export class ListDetailsComponent implements OnInit, OnDestroy {
  username: string;
  slug: string;
  constructor(
    private route: ActivatedRoute,
    // private webSocketService: WebsocketService
  ) {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }
}
