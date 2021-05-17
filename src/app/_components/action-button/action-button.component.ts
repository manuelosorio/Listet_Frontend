import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['action-button.component.sass'],
})
export class ActionButtonComponent implements OnInit {
  @Input() buttonStyle: 'default' | 'primary';
  @Input() buttonType: 'button' | 'reset' | 'submit';
  @Input() icon: 'check' | 'x';
  @Input() disabled: boolean = false;
  @Input() message: string;
  constructor() { }

  ngOnInit(): void {
  }

}
