import { Component, Inject, OnInit } from '@angular/core';
import { CanonicalService } from './shared/canonical.service';
import { UsersService } from './_services/users.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
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
