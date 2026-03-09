import { Component, OnInit, inject } from '@angular/core';
import { CanonicalService } from '@shared/canonical.service';
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
    imports: [
        FooterComponent,
        RouterOutlet,
        NavComponent,
        AlertComponent,
        SearchComponent,
    ]
})
export class AppComponent implements OnInit {
  private canonicalService = inject(CanonicalService);
  private userService = inject(UsersService);

  title = 'Listet';
  ngOnInit() {
    this.userService.isAuth().subscribe();
    this.canonicalService.setCanonicalURL(`${environment.url}`);
  }
}
