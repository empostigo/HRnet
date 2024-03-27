// React
import { useState } from "react"

// Components
import Select from "../Select/Select"
import Pagination from "../Pagination/Pagination"
import DaysTable from "../DaysTable/DaysTable"

// Calendar filling function
import createMonthsCalendars, { standardDate } from "../../utils/fillCalendar"

// Today button
import todayButton from "../../assets/today.svg"

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

const Calendar = ({ inputId, selectedDate, onDateSelect }) => {
  const usableDate = standardDate(selectedDate)

  const [year, setYear] = useState(usableDate.getFullYear())
  const [month, setMonth] = useState(usableDate.getMonth())
  const [day, setDay] = useState(usableDate.getDate())

  const calendarTables = createMonthsCalendars(year)
  const monthsList = calendarTables.map(item => item.month)

  const createYearTable = (year) => {
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
    yearsTable.push(null)

    return yearsTable
  }

  const yearsTable = createYearTable(2024)

  const formatField = field =>
    field.toString().length === 1 ? `0${field}` : field

  const onDayChange = (day) => {
    setDay(day)

    const newDate = `${formatField(month + 1)}/${formatField(day)}/${year}`
    document.getElementById(inputId).value = newDate
    onDateSelect(newDate)
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
    const newDate = `${formatField(today.getMonth() + 1)}/${formatField(today.getDate())}/${today.getFullYear()}`
    document.getElementById(inputId).value = newDate
    onDateSelect(newDate)
  }

  return (
    <article className={calendarStyle.calendar}>
      <header className={calendarStyle.header}>
        <button type="button" onClick={handleTodayButton} className={calendarStyle.today}>
          <img src={todayButton} alt="Today" className={calendarStyle.icon} />
        </button>
        <div className={calendarStyle.navbar}>
          <Select initValue={monthsList[usableDate.getMonth()]} onValueChange={onMonthChange}>
            <MonthList list={monthsList} />
          </Select>
          <Select initValue={usableDate.getFullYear()} onValueChange={onYearChange}>
            <Pagination items={yearsTable} />
          </Select>
        </div>
      </header>
      <DaysTable days={calendarTables[month]} date={selectedDate} onChange={onDayChange} />
    </article>
  )
}

export default Calendar
