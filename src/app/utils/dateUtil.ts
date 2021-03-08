export class DateUtil {
  date: any;
  constructor(date: Date) {
    this.date = date;
  }
  private months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
    "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

  format(format ?: string) {

    if (!!this.date) {
      const date = new Date(this.date);
      let day = '' + date.getDate();
      const year = date.getFullYear();
      switch (format) {
        case "yyyy-mm-dd": {
          let month = '' + date.getMonth();
          if (month.length < 2)
            month = '0' + month;
          if (day.length < 2)
            day = '0' + day;
          return [year,month,day].join('-')
        }
        default: {
          const month = this.months[date.getMonth()];
          return month + " " + day + ", " + year;
        }
      }

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
