import { Component, OnInit } from '@angular/core';
import {CanonicalService} from './shared/canonical.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'Listet';
  constructor(
    private canonicalService: CanonicalService
  ) { }

  ngOnInit() {
    this.canonicalService.setCanonicalURL();
  }
}
