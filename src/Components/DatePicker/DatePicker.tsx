import React, { Component } from "react";
import { DownArrow } from "../DownArrow/DownArrow";

export interface DatePickerProps {
  date: Date;
  onDateChange(date: Date): void;
}

/**
 * DatePicker is a controlled component which lets the user
 * click left and right to set a date
 */
class DatePicker extends Component<DatePickerProps, {}> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date: Date) {
    this.props.onDateChange(date);
  }

  //Adds numDays to the current date
  addDays(numDays: number) {
    let newDate = new Date(this.props.date);
    newDate.setHours(0, 0, 0, 0);
    newDate.setDate(newDate.getDate() + numDays);
    this.handleChange(newDate);
  }

  /**
   * Returns a user friendly string
   * representing the current date
   * */
  prettyDate(date: Date): string {
    switch (this.daysBetween(new Date(), date)) {
      case 0: {
        return "Today";
      }
      case 1: {
        return "Tomorrow";
      }
      case -1: {
        return "Yesterday";
      }
      default: {
        //otherwise just return "dd/mm"
        const month = date.getMonth() + 1;
        //zero pad the month
        const monthString = month < 10 ? "0" + month : month;
        const dayOfMonth = date.getDate();
        //zero pad the day
        const dayOfMonthString =
          dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        return `${dayName} ${dayOfMonthString}/${monthString}`;
      }
    }
  }

  //From https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript,
  daysBetween(a: Date, b: Date): number {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    const _MS_PER_DAY = 24 * 60 * 60 * 1000;
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  render() {
    return (
      <div className="day-picker">
        {/* Left pointing arrow subtracts one day from the date */}
        <div className="day-picker-arrow" onClick={() => this.addDays(-1)}>
          <DownArrow degrees={90} />
        </div>
        <span className="day-title">{this.prettyDate(this.props.date)}</span>
        {/* Right pointing arrow adds one day to the date */}
        <div className="day-picker-arrow" onClick={() => this.addDays(1)}>
          <DownArrow degrees={-90} />
        </div>
      </div>
    );
  }
}

export default DatePicker;
