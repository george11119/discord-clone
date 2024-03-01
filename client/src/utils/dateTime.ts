// adds "hour" number of hours to the passed in date object
const addHours = (date: Date, hour: number): Date => {
  date.setTime(date.getTime() + hour * 60 * 60 * 1000)
  return date
}

// formats date to look like: MM/DD/YYYY, HH:MM PM
export const formatDateTime = (date: Date): string => {
  // get current timezone
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

  // timestamps are 8 hours ahead for some reason, subtract 8 to passed in date
  const modifiedDate = addHours(new Date(date), -8)

  // idk what this does, it just works :/
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(modifiedDate)
}
