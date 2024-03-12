const getMonths = (year) => {
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
    const firstDayOfTheMonth = getFirstDayOfTheMonth(new Date(year, month, 1))

    const nbOfPreviousDaysMonth = (months[month].month === "January" ? 31 : months[month - 1].days)
    const firstDayOfMonthTable = nbOfPreviousDaysMonth - (firstDayOfTheMonth === 0 ? 7 : firstDayOfTheMonth) + 1
    for (let i = firstDayOfMonthTable; i <= nbOfPreviousDaysMonth; i++) flatMonth.push(i)
    for (let i = 1; i <= months[month].days; i++) flatMonth.push(i)
    const leftToFill = NB_DAYS - flatMonth.length
    for (let i = 1; i <= leftToFill; i++) flatMonth.push(i)


    const monthObject = {
      month: months[month].month,
      monthTable: flatMonth
    }
    monthsArray.push(monthObject)
  }

  return monthsArray
}

export const getMonthTable = (year, selectedMonth) => {
  console.log(selectedMonth)
  const NB_DAYS = 42
  const months = getMonths(year)

  const flatMonth = []
  const firstDayOfTheMonth = getFirstDayOfTheMonth(new Date(year, selectedMonth, 1))

  const nbOfPreviousDaysMonth = (months[selectedMonth].month === "January" ? 31 : months[selectedMonth - 1].days)
  const firstDayOfMonthTable = nbOfPreviousDaysMonth - (firstDayOfTheMonth === 0 ? 7 : firstDayOfTheMonth) + 1
  for (let i = firstDayOfMonthTable; i <= nbOfPreviousDaysMonth; i++) flatMonth.push(i)
  for (let i = 1; i <= months[selectedMonth].days; i++) flatMonth.push(i)
  const leftToFill = NB_DAYS - flatMonth.length
  for (let i = 1; i <= leftToFill; i++) flatMonth.push(i)

  return {
    month: months[selectedMonth].month,
    monthTable: flatMonth
  }
}

export default createMonthsCalendars
