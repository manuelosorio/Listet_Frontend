import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.sass'],
    encapsulation: ViewEncapsulation.None,
    imports: [RouterLink, RouterLinkActive, RouterOutlet]
})
export class SettingsComponent {
  constructor() {}
}
