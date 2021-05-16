import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancel-accept-button',
  templateUrl: './cancel-accept-button.component.html',
  styleUrls: ['./cancel-accept-button.component.sass']
})
export class CancelAcceptButtonComponent implements OnInit {
  @Input() buttonStyle: 'default' | 'primary';
  @Input() buttonType: 'button' | 'reset' | 'submit';
  @Input() icon: 'check' | 'x';
  @Input() disabled: boolean = false;
  @Input() message: string;
  constructor() { }

  ngOnInit(): void {
  }

}
