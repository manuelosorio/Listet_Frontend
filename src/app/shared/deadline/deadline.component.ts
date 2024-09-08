import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FeatherModule } from 'angular-feather';

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
  hasDeadline?: boolean;
  deadlineDate?: Date;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deadline']) {
      let currentDeadline = changes['deadline'].currentValue;
      // let prevDeadline = changes.deadline.previousValue;
      this.deadlineDate = currentDeadline;
      let date = new Date(currentDeadline);
      this.hasDeadline = !(
        currentDeadline === null || currentDeadline === undefined
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
