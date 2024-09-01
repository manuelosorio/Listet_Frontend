import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DateUtil } from '../../utils/dateUtil';
import { FeatherModule } from 'angular-feather';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-deadline',
  templateUrl: './deadline.component.html',
  styleUrls: ['./deadline.component.sass'],
  standalone: true,
  imports: [FeatherModule, DatePipe],
})
export class DeadlineComponent implements OnChanges {
  @Input()
  get deadline(): Date | string | null {
    return this._deadline || null;
  }
  set deadline(deadline: Date | string | null) {
    this._deadline = deadline;
  }
  private _deadline?: Date | string | null;
  @Input() isComplete!: boolean | number;
  isOverDue = false;
  formattedDeadline?: string;
  hasDeadline?: boolean;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deadline']) {
      let currentDeadline = changes['deadline'].currentValue;
      // let prevDeadline = changes.deadline.previousValue;
      let date = new DateUtil(currentDeadline);
      this.formattedDeadline = date.format();
      this.hasDeadline = !(
        this.formattedDeadline === undefined ||
        this.formattedDeadline.length === 0
      );
      this.isOverDue = this.hasDeadline
        ? date.getTime() <= new Date().getTime()
        : false;
    }
    if (changes['isComplete']) {
      this.isComplete = changes['isComplete'].currentValue === (1 || true);
    }
  }
}
