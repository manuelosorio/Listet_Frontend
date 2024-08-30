import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DateUtil } from '../../utils/dateUtil';
import { FeatherModule } from 'angular-feather';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-deadline',
    templateUrl: './deadline.component.html',
    styleUrls: ['./deadline.component.sass'],
    standalone: true,
    imports: [NgIf, FeatherModule]
})
export class DeadlineComponent implements OnChanges {
  @Input()
    get deadline() {
      return this._deadline;
    }
    set deadline(deadline: Date) {
      this._deadline = deadline;
    };
  private _deadline;
  @Input() isComplete: boolean;
  isOverDue = false;
  formattedDeadline: string;
  hasDeadline: boolean;
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.deadline) {
      let currentDeadline = changes.deadline.currentValue;
      // let prevDeadline = changes.deadline.previousValue;
      let date = new DateUtil(currentDeadline);
      this.formattedDeadline = date.format()
      this.hasDeadline = !(this.formattedDeadline === undefined || this.formattedDeadline.length === 0);
      this.isOverDue = this.hasDeadline ? date.getTime() <= new Date().getTime() : false;
    }
  }
}
