// React
import { useState, useRef, useEffect } from "react"

// Components
import Calendar from "../Calendar/Calendar"

// assets
import resetField from "../../assets/xmark.svg"

// Style
import datePickerStyle from "./DatePicker.module.scss"

const DatePicker = ({ name, label, formSubmitted, onDateChange }) => {
  const [isCalendarVisible, setCalendarVisibility] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showReset, setShowReset] = useState(false)

  const inputRef = useRef(null)
  const calendarRef = useRef(null)

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setCalendarVisibility(false)
    onDateChange(selectedDate)
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
      inputRef.current.value = ""
      setShowReset(false)
    }
    setSelectedDate("")
    onDateChange(null)
  }

  const hasClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target) && !inputRef.current.contains(event.target))
      setCalendarVisibility(false)
  }

  useEffect(() => {
    if (formSubmitted) setShowReset(false)

    document.addEventListener("mousedown", hasClickOutside)
    return () =>
      document.removeEventListener("mousedown", hasClickOutside)

  }, [formSubmitted, showReset])

  return (
    <article className={datePickerStyle.container}>
      <div className={datePickerStyle.input}>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          type="text"
          onClick={toggleCalendar}
          ref={inputRef}
          className={datePickerStyle.input}
          required
        />
        {showReset && !formSubmitted && (
          <button onClick={resetInput} className={datePickerStyle.reset}>
            <img src={resetField} alt="Reset input" className={datePickerStyle.xmark} />
          </button>
        )}
      </div>
      {isCalendarVisible && (
        <div ref={calendarRef} className={datePickerStyle.calendarWrapper}>
          <Calendar inputId={name} onDateSelect={handleDateSelect} />
        </div>
      )}
    </article>
  )
}

export default DatePicker
