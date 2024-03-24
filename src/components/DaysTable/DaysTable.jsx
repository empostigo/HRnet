// Calculation
import { getFirstDayOfTheMonth, getLastDayOfTheMonth, standardDate } from "../../utils/fillCalendar"

// Style
import { useEffect, useState } from "react"
import daysStyle from "./DaysTable.module.scss"

const DaysTable = ({ days, date, onChange }) => {
  date = standardDate(date)

  const firstDayOfTheMonth = getFirstDayOfTheMonth(date)
  const lastDayOfTheMonth = getLastDayOfTheMonth(date)
  const selectedDayIndex = days[days.indexOf(firstDayOfTheMonth + date.getDate() - 1)];
  const [selectedIndex, setSelectedIndex] = useState(selectedDayIndex)

  const defineMonth = (dayIndex) => {
    if (dayIndex < days.indexOf(firstDayOfTheMonth)) return { day: days[dayIndex], month: 0 }

    if (dayIndex > days.lastIndexOf(lastDayOfTheMonth)) return { day: days[dayIndex], month: 2 }

    return { day: days[dayIndex], month: 1 }
  }

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
              onChange(defineMonth(j))
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
    setSelectedIndex(selectedDayIndex)
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
