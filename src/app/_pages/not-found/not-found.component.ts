import { Component } from '@angular/core';
import { FeatherModule } from 'angular-feather';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.sass'],
    standalone: true,
    imports: [FeatherModule]
})
export class NotFoundComponent {

  constructor() {
  }

}
