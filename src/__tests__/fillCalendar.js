import createMonthsCalendars, {
  getFebruaryNbOfDays,
  getFirstDayOfTheMonth,
  standardDate
} from "../utils/fillCalendar"

describe("Given I select a month from the months array", () => {
  test("Then I get the number of days for this month", () => {
    let nbDays = getFebruaryNbOfDays(2024)
    expect(nbDays).toEqual(29)
    nbDays = getFebruaryNbOfDays(2023)
    expect(nbDays).toEqual(28)
  })
})

describe("Given I have a date", () => {
  test("Then I get the week day of the first of the month", () => {
    // 2024/01/26
    let testDate = new Date(2024, 0, 26)
    const firstTest = getFirstDayOfTheMonth(testDate)
    expect(firstTest).toEqual(1)

    // 2024/02/01
    testDate = new Date(2024, 1, 1)
    const secondTest = getFirstDayOfTheMonth(testDate)
    expect(secondTest).toEqual(4)

    // 2024/10/05
    testDate = new Date(2024, 9, 5)
    const thirdTest = getFirstDayOfTheMonth(testDate)
    expect(thirdTest).toEqual(2)
  })
})

describe("Given I have a date", () => {
  test("Then I can get a standard date", () => {
    let date = standardDate("02/21/2024")
    expect(date).toEqual(new Date(2024, 1, 21))

    date = standardDate(null)
    expect(date).toEqual(new Date())
  })
})

describe("Given I have a year", () => {
  test("Then I generate the table representing all months of that year", () => {
    const testResult = [
      {
        month: "January",
        monthTable: [
          31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7,
          8, 9, 10
        ],
        disableDays: [0, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
      },
      {
        month: "February",
        monthTable: [
          28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
          17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 1, 2, 3, 4, 5, 6,
          7, 8, 9
        ],
        disableDays: [0, 1, 2, 3, 33, 34, 35, 36, 37, 38, 39, 40, 41]
      },
      {
        month: "March",
        monthTable: [
          25, 26, 27, 28, 29, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
          16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2,
          3, 4, 5, 6
        ],
        disableDays: [0, 1, 2, 3, 4, 36, 37, 38, 39, 40, 41]
      },
      {
        month: "April",
        monthTable: [
          31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9,
          10, 11
        ],
        disableDays: [0, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
      },
      {
        month: "May",
        monthTable: [
          28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
          18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5,
          6, 7, 8
        ],
        disableDays: [0, 1, 2, 34, 35, 36, 37, 38, 39, 40, 41]
      },
      {
        month: "June",
        monthTable: [
          26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
          15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2,
          3, 4, 5, 6
        ],
        disableDays: [0, 1, 2, 3, 4, 5, 36, 37, 38, 39, 40, 41]
      },
      {
        month: "July",
        monthTable: [
          30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7,
          8, 9, 10
        ],
        disableDays: [0, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
      },
      {
        month: "August",
        monthTable: [
          28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
          17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3,
          4, 5, 6, 7
        ],
        disableDays: [0, 1, 2, 3, 35, 36, 37, 38, 39, 40, 41]
      },
      {
        month: "September",
        monthTable: [
          25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
          14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1,
          2, 3, 4, 5
        ],
        disableDays: [0, 1, 2, 3, 4, 5, 6, 37, 38, 39, 40, 41]
      },
      {
        month: "October",
        monthTable: [
          29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
          19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6,
          7, 8, 9
        ],
        disableDays: [0, 1, 33, 34, 35, 36, 37, 38, 39, 40, 41]
      },
      {
        month: "November",
        monthTable: [
          27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
          16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3,
          4, 5, 6, 7
        ],
        disableDays: [0, 1, 2, 3, 4, 35, 36, 37, 38, 39, 40, 41]
      },
      {
        month: "December",
        monthTable: [
          24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
          14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          31, 1, 2, 3, 4
        ],
        disableDays: [0, 1, 2, 3, 4, 5, 6, 38, 39, 40, 41]
      }
    ]

    const monthsArray = createMonthsCalendars(2024)
    expect(monthsArray).toEqual(testResult)
  })
})
