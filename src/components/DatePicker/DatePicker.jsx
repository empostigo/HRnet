// React
import { useState, useRef, useEffect } from "react"

// Components
import Calendar from "../Calendar/Calendar"

// assets
import resetField from "../../assets/xmark.svg"

// Style
import datePickerStyle from "./DatePicker.module.scss"

const DatePicker = ({ name }) => {
  const [isCalendarVisible, setCalendarVisibility] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showReset, setShowReset] = useState(false)

  const inputRef = useRef(null)
  const calendarRef = useRef(null)

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setCalendarVisibility(false)
    if (inputRef.current) {
      inputRef.current.value = date
      setShowReset(true)
    }
  }

  const toggleCalendar = () => {
    setCalendarVisibility(!isCalendarVisible)
  }

  const resetInput = () => {
    if (inputRef.current) {
      inputRef.current.value = null
      setShowReset(false)
    }
  }

  const hasClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target))
      setCalendarVisibility(false)
  }

  useEffect(() => {
    setShowReset(inputRef.current && inputRef.current.value !== "")

    document.addEventListener("mousedown", hasClickOutside)
    return () =>
      document.removeEventListener("mousedown", hasClickOutside)

  })

  return (
    <article className={datePickerStyle.container}>
      <div className={datePickerStyle.input}>
        <input
          id={name}
          type="text"
          onClick={toggleCalendar}
          ref={inputRef}
          className={datePickerStyle.input}
        />
        {showReset &&
          <button onClick={resetInput} className={datePickerStyle.reset}>
            <img src={resetField} alt="Reset input" className={datePickerStyle.xmark} />
          </button>
        }
      </div>
      {isCalendarVisible && (
        <div ref={calendarRef}>
          <Calendar inputId={name} onDateSelect={handleDateSelect} />
        </div>
      )}
    </article>
  )
}

export default DatePicker
