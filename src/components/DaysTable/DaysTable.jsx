// Style
import { useState } from "react"
import daysStyle from "./DaysTable.module.scss"
import { getFirstDayOfTheMonth } from "../../utils/fillCalendar"

const DaysTable = ({ days, onChange }) => {
  const nbDaysTable = 42

  const today = new Date()
  const todayDayIndex = days[days.indexOf(getFirstDayOfTheMonth(today)) + today.getDate() - 1]

  const [selectedIndex, setSelectedIndex] = useState(todayDayIndex)
  const [isSelected, setIsSelected] = useState(Array(nbDaysTable).fill(false))
  const daysName = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri", "Sat."].map(day => <th key={`${day}-${crypto.randomUUID()}`}>{day}</th>)
  const tableDays = () => {
    let column = []
    for (let i = 0; i <= days.length; i += 7) {
      let tmpColumn = []
      for (let j = i; j <= i + 6; j++)
        tmpColumn.push(
          <td
            key={`${i}-${j}-${crypto.randomUUID()}`}
            className={`${daysStyle.day} ${j === selectedIndex ? daysStyle["day--selected"] : ""}`}
            onClick={() => {
              setIsSelected(previousState => previousState.map((day, index) => j === index ? true : day))
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
