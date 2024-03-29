// Assets
import upCaret from "../../assets/carets/caret-up.svg"
import disabledUpCaret from "../../assets/carets/caret-up-grey.svg"
import downCaret from "../../assets/carets/caret-down.svg"
import disabledDownCaret from "../../assets/carets/caret-down-grey.svg"

// Style
import sortingHeaderStyle from "./SortingHeader.module.scss"

/**
 * A header component for sorting tables or lists.
 * It displays sorting arrows (up and down) that change appearance based on the sorting state.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be displayed in the sorting header.
 * @param {Object} props.sortingItem - An object containing the sorting state.
 * @param {boolean} props.sortingItem.enableUp - If true, the up-caret will be active (indicating ascending sort is enabled).
 * @param {boolean} props.sortingItem.enableDown - If true, the down-caret will be active (indicating descending sort is enabled).
 */
const SortingHeader = ({ text, sortingItem }) => {
  return (
    <div className={sortingHeaderStyle.wrapper}>
      <p className={sortingHeaderStyle.text}>{text}</p>
      <button className={sortingHeaderStyle.button}>
        <img
          className={sortingHeaderStyle.icon}
          src={sortingItem.enableUp ? upCaret : disabledUpCaret}
          alt="Tri ascendant"
        />
        <img
          className={`${sortingHeaderStyle.icon} ${sortingHeaderStyle.iconDown}`}
          src={sortingItem.enableDown ? downCaret : disabledDownCaret}
          alt="Tri descendant"
        />
      </button>
    </div>
  )
}

export default SortingHeader
