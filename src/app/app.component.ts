import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CanonicalService } from './shared/canonical.service';
import './test.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None
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
