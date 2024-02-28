// React
import { useEffect, useState } from "react"

// Components
import Select from "../Select/Select"
import Pagination from "../Pagination/Pagination"
import UList from "../UList/UList"
import DaysTable from "../DaysTable/DaysTable"

// Calendar filling function
import createMonthsCalendars from "../../utils/fillCalendar"

// Style
import calendarStyle from "./Calendar.module.scss"

const Calendar = ({ date }) => {
  const [year, setYear] = useState(date.getFullYear())

  const [month, setMonth] = useState(date.getMonth())
  const [day, setDay] = useState(date.getDate())

  const onMonthChange = (month) => {
    setMonth(month)
  }

  const onYearChange = (year) => {
    setYear(year)
  }

  const createYearTable = () => {
    const lastYear = Math.ceil(year / 10) * 10 - 1
    const yearsTable = []
    for (let i = 1900; i <= lastYear; i++) {
      if (i % 10 === 0) {
        yearsTable.push(null)
        if (i >= 1910)
          yearsTable.push(null)
      }
      yearsTable.push(i)
    }

    return yearsTable
  }

  const yearsTable = createYearTable()

  const calendarTables = createMonthsCalendars(year)
  const monthsList = calendarTables.map(item => item.month)

  return (
    <article className={calendarStyle.calendar}>
      <div className={calendarStyle.navbar}>
        <Select style="calendarStyle" initValue={monthsList[month]} onValueChange={onMonthChange}>
          <UList list={monthsList} className={calendarStyle} />
        </Select>
        <Select style="calendarStyle" initValue={year} onValueChange={onYearChange}>
          <Pagination items={yearsTable} />
        </Select>
      </div>
    </article>
  )
}

export default Calendar
