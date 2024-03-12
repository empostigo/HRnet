// React
import { useEffect, useState } from "react"

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

const Calendar = ({ date }) => {
  const [year, setYear] = useState(date.getFullYear())

  const [month, setMonth] = useState(date.getMonth())
  const [day, setDay] = useState(date.getDate())

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
    const today = new Date()

    setMonth(today.getMonth())
    setYear(today.getFullYear())
    setDay(today.getDate())
  }

  useEffect(() => {
    console.log(`${day}/${month + 1}/${year}`)
  }, [day, month, year])

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
      <DaysTable days={calendarTables[month].monthTable} onChange={onDayChange} />
    </article>
  )
}

export default Calendar
