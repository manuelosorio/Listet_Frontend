import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent {
  public user: string;

  constructor(private route: ActivatedRoute) {
    this.user = route.snapshot.params['username'];
  }
}
