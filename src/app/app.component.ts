import { Component, OnInit } from '@angular/core';
import { CanonicalService } from './shared/canonical.service';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';
import { NavComponent } from '@components/nav/nav.component';
import { AlertComponent } from '@components/alert/alert.component';
import { SearchComponent } from '@components/search/search.component';
import { environment } from '@environments/environment';
import { UsersService } from '@services/users.service';

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
