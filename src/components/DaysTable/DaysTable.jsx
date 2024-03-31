// React
import { useState } from "react"

// Style
import daysStyle from "./DaysTable.module.scss"

/**
 * DaysTable component displays a table of days for a given month, highlighting selected days, and marking disabled days as non-interactive.
 * It allows users to select a day from the month, which could be used for date pickers or calendar views.
 *
 * @param {object} props - The properties passed to the component.
 * @param {object} props.days - Contains arrays representing days in the month and days to be disabled.
 * @param {number[]} props.days.monthTable - An array of days in the month, typically 1 through 28, 30, or 31, depending on the month.
 * @param {number[]} props.days.disableDays - An array of days that should be marked as disabled and not selectable.
 * @param {Date} props.date - The currently selected date, used to determine which day to highlight as selected.
 * @param {boolean} props.tableHasChange - Indicates if the table has been updated, such as when changing months.
 * @param {Function} props.onChange - A callback function to handle the event when a new day is selected from the table.
 */
const DaysTable = ({ days, date, tableHasChange, onChange }) => {
  const { monthTable, disableDays } = days

  const selectedDayIndex = monthTable.indexOf(1) + date.getDate() - 1
  const [selectedIndex, setSelectedIndex] = useState(selectedDayIndex)

  const daysName = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri", "Sat."].map(
    day => <th key={`${day}`}>{day}</th>
  )

  /**
   * Generates the table rows and cells representing days in the calendar month.
   * Each day cell is interactive and can be selected unless it's disabled.
   *
   * @returns {JSX.Element[]} An array of table row elements, each containing seven day cells.
   */
  const tableDays = () => {
    let column = []
    for (let i = 0; i < monthTable.length; i += 7) {
      let tmpColumn = []
      for (let j = i; j <= i + 6; j++) {
        tmpColumn.push(
          <td
            key={`${i}-${j}`}
            className={`
              ${daysStyle.day}
              ${j === selectedIndex && !tableHasChange
                ? !disableDays.find(element => element === j)
                  ? daysStyle["day--selected"]
                  : ""
                : ""
              }
              ${j === 0 || disableDays.find(element => element === j)
                ? daysStyle["day--disable"]
                : ""
              }
            `}
            onClick={() => {
              setSelectedIndex(j)
              onChange(monthTable[j])
            }}
          >
            {monthTable[j]}
          </td>
        )
      }

      column.push(tmpColumn)
    }

    return column
  }

  return (
    <table className={daysStyle.wrapper}>
      <tbody>
        <tr>{daysName}</tr>
        {tableDays().map(table => (
          <tr key={`${crypto.randomUUID()}`}>{table}</tr>
        ))}
      </tbody>
    </table>
  )
}

export default DaysTable
