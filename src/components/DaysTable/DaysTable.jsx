// Calculation
import { getFirstDayOfTheMonth, standardDate } from "../../utils/fillCalendar"

// Style
import { useEffect, useState } from "react"
import daysStyle from "./DaysTable.module.scss"

const DaysTable = ({ days, date, tableHasChange, onChange }) => {
  const daysTable = days.monthTable
  const disableDays = days.disableDays

  const selectedDayIndex = daysTable.indexOf(1) + date.getDate() - 1
  const [selectedIndex, setSelectedIndex] = useState(selectedDayIndex)

  const daysName = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri", "Sat."].map(day => <th key={`${day}`}>{day}</th>)
  const tableDays = () => {
    let column = []
    for (let i = 0; i < daysTable.length; i += 7) {
      let tmpColumn = []
      for (let j = i; j <= i + 6; j++) {
        tmpColumn.push(
          <td
            key={`${i}-${j}`}
            className=
            {`
              ${daysStyle.day}
              ${j === selectedIndex && !tableHasChange ? (!disableDays.find(element => element === j) ? daysStyle["day--selected"] : "") : ""}
              ${j === 0 || disableDays.find(element => element === j) ? daysStyle["day--disable"] : ""}
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
        {
          tableDays().map(table =>
            <tr
              key={`${crypto.randomUUID()}`}
            >
              {table}
            </tr>)
        }
      </tbody>
    </table>
  )
}

export default DaysTable
