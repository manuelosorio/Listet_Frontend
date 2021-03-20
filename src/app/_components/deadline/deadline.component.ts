import { Component, Input, OnInit } from "@angular/core";
import { DateUtil } from "../../utils/dateUtil";

@Component({
  selector: 'app-deadline',
  templateUrl: './deadline.component.html',
  styleUrls: ['./deadline.component.sass']
})
export class DeadlineComponent implements OnInit {
  @Input() private deadline: Date
  @Input() isComplete: boolean;
  isOverDue: boolean = false
  formattedDeadline: string
  hasDeadline: boolean

  constructor() {
  }
  ngOnInit(): void {
    const date = new DateUtil(this.deadline);
    this.formattedDeadline = date.format();
    this.hasDeadline = !(this.formattedDeadline === undefined || this.formattedDeadline.length === 0);
    this.isOverDue = this.hasDeadline ? date.getTime() <= new Date().getTime() : false;
  }
}
