import React, { Component } from "react";
import { DownArrow } from "./DownArrow";

export interface DatePickerProps {
  date: Date;
  onDateChange(date: Date): void;
}

class DatePicker extends Component<DatePickerProps, {}> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date: Date) {
    this.props.onDateChange(date);
  }

  addDays(numDays: number) {
    let newDate = new Date(this.props.date);
    newDate.setHours(0, 0, 0, 0);
    newDate.setDate(newDate.getDate() + numDays);
    this.handleChange(newDate);
  }

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
        const month = date.getMonth() + 1;
        const monthString = month < 10 ? "0" + month : month;
        const dayOfMonth = date.getDate();
        const dayOfMonthString =
          dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        return `${dayName} ${dayOfMonthString}/${monthString}`;
      }
    }
  }

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
        <div className="day-picker-arrow" onClick={() => this.addDays(-1)}>
          <DownArrow degrees={90} />
        </div>
        <span className="day-title">{this.prettyDate(this.props.date)}</span>
        <div className="day-picker-arrow" onClick={() => this.addDays(1)}>
          <DownArrow degrees={-90} />
        </div>
      </div>
    );
  }
}

export default DatePicker;
