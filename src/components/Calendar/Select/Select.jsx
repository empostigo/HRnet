// React
import { useEffect, useRef, useState } from "react"

// Style
import selectStyle from "./Select.module.scss"

const Select = ({ list }) => {
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
    <div ref={wrapper}>
      <button onClick={toggleDropdown} className={selectStyle.button}>{list[0]}</button>
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
