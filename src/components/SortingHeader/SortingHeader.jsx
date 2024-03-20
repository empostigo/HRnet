// Assets
import upCaret from "../../assets/caret-up.svg"
import downCaret from "../../assets/caret-down.svg"

// Style
import sortingHeaderStyle from "./SortingHeader.module.scss"

const SortingHeader = ({ text }) => {
  return (
    <div className={sortingHeaderStyle.wrapper}>
      <p className={sortingHeaderStyle.text}>{text}</p>
      <button className={sortingHeaderStyle.button}>
        <img className={sortingHeaderStyle.icon} src={upCaret} alt="Tri ascendant" />
        <img className={`${sortingHeaderStyle.icon} ${sortingHeaderStyle.iconDown}`} src={downCaret} alt="Tri descendant" />
      </button>
    </div>
  )
}

export default SortingHeader
