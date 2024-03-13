// Calculation
import { getFirstDayOfTheMonth } from "../../utils/fillCalendar"

// Style
import { useEffect, useState } from "react"
import daysStyle from "./DaysTable.module.scss"

const DaysTable = ({ days, date, onChange }) => {
  const todayDayIndex = days[days.indexOf(getFirstDayOfTheMonth(date) + date.getDate() - 1)];
  const [selectedIndex, setSelectedIndex] = useState(todayDayIndex)

  const daysName = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri", "Sat."].map(day => <th key={`${day}`}>{day}</th>)
  const tableDays = () => {
    let column = []
    for (let i = 0; i < days.length; i += 7) {
      let tmpColumn = []
      for (let j = i; j <= i + 6; j++)
        tmpColumn.push(
          <td
            key={`${i}-${j}`}
            className={`${daysStyle.day} ${j === selectedIndex ? daysStyle["day--selected"] : ""}`}
            onClick={() => {
              setSelectedIndex(j)
              onChange(days[j])
            }}
          >
            {days[j]}
          </td>
        )

      column.push(tmpColumn)
    }

    return column
  }

  useEffect(() => {
    setSelectedIndex(todayDayIndex)
  }, [date])

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
