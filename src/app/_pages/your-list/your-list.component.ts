import { Component } from '@angular/core';
import { ListComponent } from '../../_components/list/list.component';

@Component({
  selector: 'app-your-list',
  templateUrl: './your-list.component.html',
  styleUrls: ['./your-list.component.sass'],
  imports: [ListComponent],
  standalone: true,
})
export class YourListComponent {
  constructor() {}
}
