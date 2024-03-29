// React
import React, { isValidElement, useEffect, useRef, useState } from "react"

// Icons
import angleDown from "../../assets/arrows/angle-down.svg"
import angleUp from "../../assets/arrows/angle-up.svg"

// Styles
import selectStyle from "./Select.module.scss"

/**
 * Renders a custom dropdown list component.
 *
 * The `Select` component allows for the selection of an option from a dropdown list. It is a more customizable
 * alternative to the native HTML `select` element, enabling the use of custom styling and complex option rendering.
 * The component manages its open/closed state and communicates the selected value via a callback.
 *
 * @param {object} props - The component props.
 * @param {string} props.initValue - The initial value to display in the select button. This value is also used as the default selection.
 * @param {React.ReactNode} props.children - The child components or elements, usually `Option` components, to render inside the dropdown. These should be constructed to interact with the `Select` component via props.
 * @param {string} [props.id] - An optional ID for the select button, useful for associating the component with a label for accessibility purposes.
 * @param {function} props.onValueChange - A callback function that is invoked when a new value is selected from the dropdown. The new value is passed as an argument to this function.
 */
const Select = ({ initValue, children, id, onValueChange }) => {
  const [dropdownState, setDropdownState] = useState({ open: false })
  const [buttonValue, setButtonValue] = useState(initValue)
  const [wrapperHeight, setWrapperHeight] = useState(0)

  const wrapper = useRef()

  /**
   * Toggles the visibility of the dropdown list.
   */
  const toggleDropdown = () => setDropdownState({ open: !dropdownState.open })

  /**
   * Updates the currently selected value and closes the dropdown.
   *
   * @param {string} value - The selected value to set.
   */
  const setValue = value => {
    setButtonValue(value)
    onValueChange(value)
    setDropdownState({ open: false })
  }

  /**
   * Detects clicks outside of the component to close the dropdown.
   *
   * @param {MouseEvent} event - The mouse event.
   */
  const hasClickOutside = event => {
    if (wrapper.current && !wrapper.current.contains(event.target))
      setDropdownState({ open: false })
  }

  /**
   * Attaches and cleans up event listeners for detecting clicks outside the component.
   * Sets the initial selected value and calculates the dropdown wrapper height for positioning.
   */
  useEffect(() => {
    document.addEventListener("mousedown", hasClickOutside)

    if (wrapper.current) setWrapperHeight(wrapper.current.offsetHeight)

    setButtonValue(initValue)

    return () => document.removeEventListener("mousedown", hasClickOutside)
  }, [initValue])

  /**
   * Enhances the children components with additional props.
   *
   * This process involves mapping over each child element of the `Select` component,
   * and conditionally passing the `setValue` function as an `onChange` prop to each.
   * This enables child components to interact with the `Select` component by changing its state,
   * facilitating a two-way data binding pattern between the `Select` and its children.
   *
   * @returns {React.ReactNode[]} The array of React child elements with added props.
   */
  const childrenWithProps = React.Children.map(children, child => {
    if ((React, isValidElement(child)))
      return React.cloneElement(child, { onChange: setValue })

    return child
  })

  return (
    <div className={selectStyle.wrapper} ref={wrapper}>
      <button
        onClick={toggleDropdown}
        type="button"
        className={selectStyle.select}
        id={id}
      >
        <span className={selectStyle.text}>{buttonValue}</span>
        <img
          src={angleDown}
          alt="Open Dropdown"
          className={dropdownState.open ? selectStyle.hidden : ""}
        />
        <img
          src={angleUp}
          alt="Close Dropdown"
          className={!dropdownState.open ? selectStyle.hidden : ""}
        />
      </button>
      {dropdownState.open && (
        <div
          className={selectStyle.style}
          style={{
            position: "absolute",
            top: `${wrapperHeight}px`,
            border: "1px solid #f6f6f6"
          }}
        >
          {childrenWithProps}
        </div>
      )}
    </div>
  )
}

export default Select
