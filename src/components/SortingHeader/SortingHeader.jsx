// React
import { useState } from "react"

// Assets
import upCaret from "../../assets/carets/caret-up.svg"
import disabledUpCaret from "../../assets/carets/caret-up-grey.svg"
import downCaret from "../../assets/carets/caret-down.svg"
import disabledDownCaret from "../../assets/carets/caret-down-grey.svg"

// Style
import sortingHeaderStyle from "./SortingHeader.module.scss"

const SortingHeader = ({ text, sortingItem }) => {

  return (
    <div className={sortingHeaderStyle.wrapper}>
      <p className={sortingHeaderStyle.text}>{text}</p>
      <button className={sortingHeaderStyle.button} >
        <img className={sortingHeaderStyle.icon} src={sortingItem.enableUp ? upCaret : disabledUpCaret} alt="Tri ascendant" />
        <img className={`${sortingHeaderStyle.icon} ${sortingHeaderStyle.iconDown}`} src={sortingItem.enableDown ? downCaret : disabledDownCaret} alt="Tri descendant" />
      </button>
    </div>
  )
}

export default SortingHeader
