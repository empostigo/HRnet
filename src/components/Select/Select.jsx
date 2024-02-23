// React
import { useEffect, useRef, useState } from "react"

// Styles
import singleSelectStyle from "./SingleSelect.module.scss"
import calendarSelectStyle from "./CalendarSelect.module.scss"

const Select = ({ list, style = "singleSelect" }) => {
  const selectStyle = style === "singleSelect" ? singleSelectStyle : calendarSelectStyle

  const [dropdownState, setDropdownState] = useState({ open: false })
  const wrapper = useRef()

  const toggleDropdown = () =>
    setDropdownState({ open: !dropdownState.open })


  const hasClickOutside = (event) => {
    if (wrapper.current && !wrapper.current.contains(event.target))
      setDropdownState({ open: false })
  }

  useEffect(() => {
    document.addEventListener("mousedown", hasClickOutside)

    return () => document.removeEventListener("mousedown", hasClickOutside)
  }, [])

  return (
    <div className={selectStyle.wrapper} ref={wrapper}>
      <div>
        <button onClick={toggleDropdown} className={selectStyle.button}>{list[0]}</button>
        <img />
      </div>
      {
        dropdownState.open &&
        (
          <ul className={selectStyle.list}>
            {
              list.map(item => <li key={`item-${item}`} className={selectStyle.item}>{item}</li>)
            }
          </ul>
        )
      }
    </div>
  )
}

export default Select
