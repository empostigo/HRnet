// React
import { useState, useRef, useEffect } from "react"

// Components
import Calendar from "../Calendar/Calendar"

// Calculation
import { standardDate } from "../../utils/fillCalendar"

// assets
import resetField from "../../assets/xmark.svg"

// Style
import datePickerStyle from "./DatePicker.module.scss"

/**
 * DatePicker component allowing users to select a date from a popup calendar.
 *
 * @param {Object} props Component props
 * @param {string} props.name The name attribute of the input element.
 * @param {string} props.label The label text for the date picker.
 * @param {boolean} props.formSubmitted State indicating if the form has been submitted.
 * @param {Function} props.onDateChange Callback function to handle date changes.
 */
const DatePicker = ({ name, label, formSubmitted, onDateChange }) => {
  const [isCalendarVisible, setCalendarVisibility] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showReset, setShowReset] = useState(false)

  const inputRef = useRef(null)
  const calendarRef = useRef(null)

  /**
   * Handles the selection of a date from the calendar.
   *
   * @param {Date|string} date The selected date, either as a Date object or a string.
   */
  const handleDateSelect = date => {
    setSelectedDate(typeof date === "string" ? standardDate(date) : date)
    setCalendarVisibility(false)
    onDateChange(selectedDate)
    if (inputRef.current) {
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
    setSelectedDate(new Date())
    onDateChange(new Date())
  }

  const hasClickOutside = event => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target) &&
      !inputRef.current.contains(event.target)
    )
      setCalendarVisibility(false)
  }

  useEffect(() => {
    if (formSubmitted) setShowReset(false)

    document.addEventListener("mousedown", hasClickOutside)
    return () => document.removeEventListener("mousedown", hasClickOutside)
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
            <img
              src={resetField}
              alt="Reset input"
              className={datePickerStyle.xmark}
            />
          </button>
        )}
      </div>
      {isCalendarVisible && (
        <div ref={calendarRef} className={datePickerStyle.calendarWrapper}>
          <Calendar
            inputId={name}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>
      )}
    </article>
  )
}

export default DatePicker
