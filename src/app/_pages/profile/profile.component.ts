import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  public user: string
  constructor(private route: ActivatedRoute) {
    this.user = route.snapshot.params.username;
  }

  ngOnInit(): void {
  }

}
