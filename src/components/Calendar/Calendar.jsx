// React
import { useEffect, useState } from "react"

// Components
import Select from "../Select/Select"

// Calendar filling function
import createMonthsCalendars from "../../utils/fillCalendar"

// Style
import calendarStyle from "./Calendar.module.scss"

const Calendar = ({ date }) => {
  const year = date.getFullYear()

  const [month, setMonth] = useState(date.getMonth())
  const [day, setDay] = useState(date.getDate())

  const yearsTable = []
  for (let i = 1900; i <= year; i++) yearsTable.push(i)

  const calendarTables = createMonthsCalendars(year)
  const monthsList = calendarTables.map(item => item.month)

  return (
    <article className={calendarStyle.dropdown}>
      <div className={calendarStyle.navbar}>
        <Select list={monthsList} style="calendarStyle" initValue={monthsList[date.getMonth()]} />
        <Select list={yearsTable} style="calendarStyle" initValue={year} />
      </div>
    </article>
  )
}

export default Calendar
