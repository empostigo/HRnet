// React
import React, { isValidElement, useEffect, useRef, useState } from "react"

// Styles
import singleSelectStyle from "./SingleSelect.module.scss"
import calendarSelectStyle from "./CalendarSelect.module.scss"
import Pagination from "../Pagination/Pagination"

const Select = ({ initValue, style = "singleSelect", children }) => {
  const selectStyle = style === "singleSelect" ? singleSelectStyle : calendarSelectStyle

  const [dropdownState, setDropdownState] = useState({ open: false })
  const [buttonValue, setButtonValue] = useState(initValue)

  const wrapper = useRef()

  const toggleDropdown = () =>
    setDropdownState({ open: !dropdownState.open })

  const setValue = (value) => {
    setButtonValue(value)
    setDropdownState({ open: false })
  }

  const hasClickOutside = (event) => {
    if (wrapper.current && !wrapper.current.contains(event.target))
      setDropdownState({ open: false })
  }

  useEffect(() => {
    document.addEventListener("mousedown", hasClickOutside)

    return () => document.removeEventListener("mousedown", hasClickOutside)
  }, [])

  const childrenWithProps = React.Children.map(children, child => {
    if (React, isValidElement(child)) return React.cloneElement(child, { onChange: setValue })

    return child
  })

  return (
    <div className={selectStyle.wrapper} ref={wrapper}>
      <div>
        <button onClick={toggleDropdown} className={selectStyle.button}>{buttonValue}</button>
        <img />
      </div>
      {
        dropdownState.open &&
        /*
      <ul className={selectStyle.list}>
        {
          list.map(item => <li key={`item-${item}`} className={selectStyle.item} onClick={() => setValue(item)}>{item}</li>)
        }
      </ul>
        */
        //<Pagination items={list} style={selectStyle} setContent={setValue} />
        childrenWithProps
      }
    </div>
  )
}

export default Select
