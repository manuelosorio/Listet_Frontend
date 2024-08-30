import { Component, Input } from '@angular/core';
import { FeatherModule } from 'angular-feather';

@Component({
    selector: 'app-action-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['action-button.component.sass'],
    standalone: true,
    imports: [FeatherModule],
})
export class ActionButtonComponent {
  @Input() buttonStyle: 'default' | 'primary';
  @Input() buttonType: 'button' | 'reset' | 'submit';
  @Input() icon: 'check' | 'x';
  @Input() disabled: boolean = false;
  @Input() message: string;
  constructor() { }

}
