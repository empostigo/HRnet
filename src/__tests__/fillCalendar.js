import { createMonthsCalendars, getFebruaryNbOfDays, getFirstDayOfTheMonth, getFirstDayOfTheYear, linearCalendar } from "../utils/fillCalendar"

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

describe("Given I have a year", () => {
  test("Then I generate the table representing all months of that year", () => {
    const testResult = {
      January: [
        31, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30, 31, 1, 2, 3, 4, 5, 6, 7, 8,
        9, 10
      ],
      February: [
        28, 29, 30, 31, 1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
        27, 28, 29, 1, 2, 3, 4, 5, 6, 7,
        8, 9
      ],
      March: [
        25, 26, 27, 28, 29, 1, 2, 3, 4, 5,
        6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        26, 27, 28, 29, 30, 31, 1, 2, 3, 4,
        5, 6
      ],
      April: [
        31, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11
      ],
      May: [
        28, 29, 30, 1, 2, 3, 4, 5, 6, 7,
        8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
        28, 29, 30, 31, 1, 2, 3, 4, 5, 6,
        7, 8
      ],
      June: [
        26, 27, 28, 29, 30, 31, 1, 2, 3, 4,
        5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        25, 26, 27, 28, 29, 30, 1, 2, 3, 4,
        5, 6
      ],
      July: [
        30, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30, 31, 1, 2, 3, 4, 5, 6, 7, 8,
        9, 10
      ],
      August: [
        28, 29, 30, 31, 1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
        27, 28, 29, 30, 31, 1, 2, 3, 4, 5,
        6, 7
      ],
      September: [
        25, 26, 27, 28, 29, 30, 31, 1, 2, 3,
        4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
        14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
        24, 25, 26, 27, 28, 29, 30, 1, 2, 3,
        4, 5
      ],
      October: [
        29, 30, 1, 2, 3, 4, 5, 6, 7, 8,
        9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
        29, 30, 31, 1, 2, 3, 4, 5, 6, 7,
        8, 9
      ],
      November: [
        27, 28, 29, 30, 31, 1, 2, 3, 4, 5,
        6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        26, 27, 28, 29, 30, 1, 2, 3, 4, 5,
        6, 7
      ],
      December: [
        24, 25, 26, 27, 28, 29, 30, 1, 2, 3,
        4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
        14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
        24, 25, 26, 27, 28, 29, 30, 31, 1, 2,
        3, 4
      ]
    }
    const monthsArray = createMonthsCalendars(2024)
    expect(monthsArray).toEqual(testResult)
  })
})
