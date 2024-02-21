// React
import { useEffect, useState } from "react"

// Calendar filling function
import createMonthsCalendars from "../../utils/fillCalendar"

const Calendar = ({ date }) => {
  const year = date.getFullYear()

  const [month, setMonth] = useState(date.getMonth())
  const [day, setDay] = useState(date.getDate())

  const calendarTables = createMonthsCalendars(year)

  return (
    <article>
      <h3>{calendarTables[month].month}</h3>
    </article>
  )
}

export default Calendar
