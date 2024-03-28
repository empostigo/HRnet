export const getMonths = (year) => {
  return [
    { month: "January", days: 31 },
    { month: "February", days: getFebruaryNbOfDays(year) },
    { month: "March", days: 31 },
    { month: "April", days: 30 },
    { month: "May", days: 31 },
    { month: "June", days: 30 },
    { month: "July", days: 31 },
    { month: "August", days: 31 },
    { month: "September", days: 30 },
    { month: "October", days: 31 },
    { month: "November", days: 30 },
    { month: "December", days: 31 }
  ]
}

export const getFebruaryNbOfDays = (year) => (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 29 : 28

export const getFirstDayOfTheMonth = (date) => {

  if (date.getDate() === 1) return date.getDay()

  const month = date.getMonth()
  const year = date.getFullYear()

  return new Date(year, month, 1).getDay()
}

const createMonthsCalendars = (year) => {
  const NB_DAYS = 42
  const months = getMonths(year)

  let monthsArray = []
  for (let month in months) {
    const flatMonth = []
    const disableDays = []
    let disableDaysIndex = 0
    const firstDayOfTheMonth = getFirstDayOfTheMonth(new Date(year, month, 1))

    const nbOfPreviousDaysMonth = (months[month].month === "January" ? 31 : months[month - 1].days)
    const firstDayOfMonthTable = nbOfPreviousDaysMonth - (firstDayOfTheMonth === 0 ? 7 : firstDayOfTheMonth) + 1
    for (let i = firstDayOfMonthTable; i <= nbOfPreviousDaysMonth; i++) {
      flatMonth.push(i)
      disableDays.push(disableDaysIndex++)
    }
    for (let i = 1; i <= months[month].days; i++) {
      flatMonth.push(i)
      disableDaysIndex++
    }
    const leftToFill = NB_DAYS - flatMonth.length
    for (let i = 1; i <= leftToFill; i++) {
      flatMonth.push(i)
      disableDays.push(disableDaysIndex++)
    }

    const monthObject = {
      month: months[month].month,
      monthTable: flatMonth,
      disableDays: disableDays
    }
    monthsArray.push(monthObject)
  }

  return monthsArray
}

export const standardDate = date => {
  if (!date || date === null) return new Date()

  const removeZero = field => field = parseInt(field) - 1

  const splitDate = date.split("/")
  const month = removeZero(splitDate[0])
  const day = removeZero(splitDate[1]) + 1

  return new Date(new Date(splitDate[2], month, day))
}

export default createMonthsCalendars
