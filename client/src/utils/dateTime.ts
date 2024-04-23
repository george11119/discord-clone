import {
  differenceInCalendarDays,
  format,
  isToday,
  isYesterday,
} from "date-fns"
import { Message } from "../../types.ts"
// adds "hour" number of hours to the passed in date object
// const addHours = (date: Date, hour: number): Date => {
//   date.setTime(date.getTime() + hour * 60 * 60 * 1000)
//   return date
// }

// formats date to look like: MM/DD/YYYY, HH:MM PM

export const dateFormatter = (date: Date, formatString: string): string => {
  return format(date, formatString)
}

export const messageDateFormatter = (
  date: Date,
  formatString: string = "MM/dd/yyyy hh:mm a",
): string => {
  if (isToday(date)) {
    return `Today at ${format(date, "hh:mm a")}`
  }

  if (isYesterday(date)) {
    return `Yesterday at ${format(date, "hh:mm a")}`
  }

  return format(date, formatString)
}

export const messagesSentOnDifferentDays = (
  message1: Message,
  message2: Message,
) => {
  if (differenceInCalendarDays(message1.createdAt, message2.createdAt) !== 0) {
    return true
  } else {
    return false
  }
}
