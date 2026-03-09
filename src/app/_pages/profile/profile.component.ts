// profile.component.ts
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListComponent } from '@components/list/list.component';
import { SearchDataService } from '@shared/search-data.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.sass'],
    imports: [ListComponent],
    providers: [SearchDataService]
})
export class ProfileComponent {
  private route = inject(ActivatedRoute);

  public user: string;

  constructor() {
    const route = this.route;

    this.user = route.snapshot.params['username'];
  }
}
``;
