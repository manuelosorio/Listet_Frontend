export class DateUtil {
  date: any;
  constructor(date: Date) {
    this.date = date;
  }
  private months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
    "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

  format() {
    if (!!this.date) {
      const date = new Date(this.date);
      const month = this.months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      return month + " " + day + ", " + year;
    }
    return '';
  }
  difference() {

  }
}
// enum Months {
//   JANUARY ,
//   FEBRUARY,
//   MARCH,
//   APRIL,
//   MAY,
//   JUNE,
//   JULY,
//   AUGUST,
//   SEPTEMBER,
//   OCTOBER,
//   NOVEMBER,
//   DECEMBER
// }
