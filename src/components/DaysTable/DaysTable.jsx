// React
import { useState } from "react"

// Style
import daysStyle from "./DaysTable.module.scss"

/**
 * Represents a table displaying days of a month, allowing selection, and indicating disabled days.
 *
 * @param {{ days: { monthTable: number[]; disableDays: number[]; }; date: Date; tableHasChange: boolean; onChange: (day: number) => void; }} props
 * @param {{ monthTable: number[]; disableDays: number[]; }} props.days Object containing the days of the month and disabled days.
 * @param {number[]} props.days.monthTable Array of days in the month.
 * @param {number[]} props.days.disableDays Array of days that should be disabled.
 * @param {Date} props.date The currently selected date.
 * @param {boolean} props.tableHasChange Flag indicating if the table has been changed (e.g., by navigating to a different month).
 * @param {(day: number) => void} props.onChange Callback function to handle day selection.
 */
const DaysTable = ({ days, date, tableHasChange, onChange }) => {
  const daysTable = days.monthTable
  const disableDays = days.disableDays

  const selectedDayIndex = daysTable.indexOf(1) + date.getDate() - 1
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
    for (let i = 0; i < daysTable.length; i += 7) {
      let tmpColumn = []
      for (let j = i; j <= i + 6; j++) {
        tmpColumn.push(
          <td
            key={`${i}-${j}`}
            className={`
              ${daysStyle.day}
              ${
                j === selectedIndex && !tableHasChange
                  ? !disableDays.find(element => element === j)
                    ? daysStyle["day--selected"]
                    : ""
                  : ""
              }
              ${
                j === 0 || disableDays.find(element => element === j)
                  ? daysStyle["day--disable"]
                  : ""
              }
            `}
            onClick={() => {
              setSelectedIndex(j)
              onChange(daysTable[j])
            }}
          >
            {daysTable[j]}
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
