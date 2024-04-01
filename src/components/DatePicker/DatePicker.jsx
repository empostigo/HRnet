// React
import { useState, useRef, useEffect } from "react"

// Components
import { Calendar } from "em-react-calendar"

// assets
import resetField from "../../assets/xmark.svg"

// Style
import datePickerStyle from "./DatePicker.module.scss"

/**
 * Represents a DatePicker component allowing users to select a date.
 * This component integrates a popup calendar for date selection and provides a resettable input field.
 *
 * @param {Object} props - The props of the component.
 * @param {string} props.name - The name attribute for the input element, used for form submission.
 * @param {string} props.label - The text label associated with the date picker input.
 * @param {boolean} props.formSubmitted - A boolean indicating if the associated form has been submitted.
 * @param {Function} props.onDateChange - A callback function to handle the change in selected date.
 */
const DatePicker = ({ name, label, formSubmitted, onDateChange }) => {
  const [isCalendarVisible, setCalendarVisibility] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showReset, setShowReset] = useState(false)

  const inputRef = useRef(null)
  const calendarRef = useRef(null)

  /**
   * Handles the selection of a date from the calendar, either as a Date object or a string.
   * It updates the selected date, hides the calendar, triggers the onDateChange callback,
   * and shows the reset button.
   *
   * @param {Date|string} date - The date selected from the calendar.
   */
  const handleDateSelect = date => {
    setSelectedDate(date)
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
