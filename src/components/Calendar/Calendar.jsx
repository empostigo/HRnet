// React
import { useState } from "react"

// Components
import Select from "../Select/Select"
import Pagination from "../Pagination/Pagination"
import DaysTable from "../DaysTable/DaysTable"

// Calendar filling function
import createMonthsCalendars from "../../utils/fillCalendar"

// Style
import calendarStyle from "./Calendar.module.scss"

const MonthList = ({ list, onChange }) => {
  return (
    <ul>
      {
        list.map(item => <li key={`item-${item}`} onClick={() => onChange(item)}>{item}</li>)
      }
    </ul>
  )
}

const Calendar = () => {
  const today = new Date()
  const [date, setDate] = useState(today)
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [day, setDay] = useState(today.getDate())

  const calendarTables = createMonthsCalendars(year)
  const monthsList = calendarTables.map(item => item.month)

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

  const onDayChange = (day) => {
    setDay(day)
  }

  const onMonthChange = (month) => {
    const index = calendarTables.findIndex(monthObject => monthObject.month === month)
    setMonth(index)
  }

  const onYearChange = (year) => {
    setYear(year)
  }

  const handleTodayButton = () => {
    setMonth(today.getMonth())
    setYear(today.getFullYear())
    setDay(today.getDate())

    setDate(new Date())
  }

  return (
    <article className={calendarStyle.calendar}>
      <header className={calendarStyle.header}>
        <button onClick={handleTodayButton}>
          <img />
        </button>
        <div className={calendarStyle.navbar}>
          <Select initValue={monthsList[month]} onValueChange={onMonthChange}>
            <MonthList list={monthsList} />
          </Select>
          <Select initValue={year} onValueChange={onYearChange}>
            <Pagination items={yearsTable} />
          </Select>
        </div>
      </header>
      <DaysTable days={calendarTables[month].monthTable} date={date} onChange={onDayChange} />
    </article>
  )
}

export default Calendar
