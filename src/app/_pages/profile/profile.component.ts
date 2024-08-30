import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListComponent } from '../../_components/list/list.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.sass'],
    standalone: true,
    imports: [ListComponent]
})
export class ProfileComponent {
  public user: string;

  constructor(private route: ActivatedRoute) {
    this.user = route.snapshot.params.username;
  }

}
