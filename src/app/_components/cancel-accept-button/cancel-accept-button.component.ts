import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancel-accept-button',
  templateUrl: './cancel-accept-button.component.html',
  styleUrls: ['./cancel-accept-button.component.sass']
})
export class CancelAcceptButtonComponent implements OnInit {
  @Input() buttonType: 'default' | 'primary';
  @Input() icon: 'check' | 'x';
  @Input() message: string;
  constructor() { }

  ngOnInit(): void {
  }

}
