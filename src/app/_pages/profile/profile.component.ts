// profile.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListComponent } from '@components/list/list.component';
import { SearchDataService } from '@app/shared/search-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  imports: [ListComponent],
  providers: [SearchDataService],
  standalone: true,
})
export class ProfileComponent {
  public user: string;

  constructor(private route: ActivatedRoute) {
    this.user = route.snapshot.params['username'];
  }
}
``;
