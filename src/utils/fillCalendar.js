// Arrays for week days and months
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = (year) => {
  return {
    "January": 31,
    "February": getFebruaryNbOfDays(year),
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "September": 30,
    "October": 31,
    "November": 30,
    "December": 31
  }
}

export const getFebruaryNbOfDays = (year) => (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 29 : 28

export const getFirstDayOfTheMonth = (date) => {
  if (date.getDate() === 1) return date.getDay()

  const month = date.getMonth()
  const year = date.getFullYear()

  return new Date(year, month, 1).getDay()
}

export const getFirstDayOfTheYear = (year) => new Date(year, 0, 1).getDay()

export const linearCalendar = (year) => {
  const yearArray = months(year)

  let daysArray = []
  Object.values(yearArray).forEach(nbDays => {
    for (let i = 1; i <= nbDays; i++) daysArray.push(i)
  })

  return daysArray
}

export const createMonthsCalendars = (year) => {
  const NB_DAYS = 42
  const nbOfDaysInMonths = month(year)

  const monthsArray = {}
  for (let month in nbOfDaysInMonths) {
    const firstDayOfTheMonth = getFirstDayOfTheMonth(year,)
    const flatCalendar = linearCalendar(year)

    let flatMonth = []
    const firstDayOfJanuaryTable = nbOfDaysInMonth.December - firstJanuary + 1
    for (let i = firstDayOfJanuaryTable; i <= nbOfDaysInMonth.December; i++) flatMonth.push(i)
    for (let i = firstJanuary; i < NB_DAYS; i++) flatMonth.push(flatCalendar.shift())
  }

}
