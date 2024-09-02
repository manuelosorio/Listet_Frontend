import { Component, OnInit } from '@angular/core';
import { CanonicalService } from './shared/canonical.service';
import { UsersService } from './_services/users.service';
import { environment } from '../environments/environment';

import { FooterComponent } from './_components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './_components/nav/nav.component';
import { AlertComponent } from './_components/alert/alert.component';
import { SearchComponent } from './_components/search/search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  standalone: true,
  imports: [
    FooterComponent,
    RouterOutlet,
    NavComponent,
    AlertComponent,
    SearchComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'Listet';
  constructor(
    private canonicalService: CanonicalService,
    private userService: UsersService
  ) {}
  ngOnInit() {
    this.userService.isAuth().subscribe();
    this.canonicalService.setCanonicalURL(`${environment.url}`);
  }
}
