export class DateUtil {
  private readonly date: any;
  private readonly debugString?: string;
  constructor(date: Date | string, debugString?: string) {
    this.date = date;
    this.debugString = debugString;
  }
  private months = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];

  format(format?: string) {
    if (!!this.date) {
      const date = new Date(this.date);
      // date.setUTCDate(date.getUTCDate() + 1);
      let day = '' + date.getDate();
      const year = date.getFullYear();
      switch (format) {
        case 'yyyy-mm-dd': {
          let month = '' + date.getMonth();
          if (month.length < 2) {
            month = '0' + month;
          }
          if (day.length < 2) {
            day = '0' + day;
          }
          return [year, month, day].join('-');
        }
        // case 'mmm dd, yyyy' : {
        //   return;
        // }
        default: {
          const month = this.months[date.getMonth()];
          return `${month} ${day}, ${year}`;
        }
      }
    }
    return '';
  }
  getTime(): number {
    return new Date(this.date).getTime();
  }
  private difference() {
    return (
      Math.floor(new Date().getTime() / 1000) -
      Math.floor(new Date(this.date).getTime() / 1000)
    );
  }
  getFormattedTimeDifference() {
    const seconds = this.difference();
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);
    const months = Math.floor(seconds / 2629743);
    const years = Math.floor(seconds / 31556926);
    if (years > 1) {
      return `${years} years ago`;
    }
    if (years === 1) {
      return '1 year ago';
    }
    if (months > 1) {
      return `${months} months ago`;
    }
    if (months === 1) {
      return '1 month ago';
    }
    if (days > 1) {
      return `${days} days ago`;
    }
    if (days === 1) {
      return '1 day ago';
    }
    if (hours > 1) {
      return `${hours} hours ago`;
    }
    if (hours === 1) {
      return '1 hour ago';
    }
    if (minutes > 1) {
      return `${minutes} minutes ago`;
    }
    if (minutes === 1) {
      return '1 minute ago';
    }
    if (seconds > 1) {
      return `${seconds} seconds ago`;
    }
    return '1 second ago';
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
