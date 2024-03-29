// Style
import ulistStyle from "./UList.module.scss"

/**
 * UList renders an unordered list based on the provided list array. Each list item is clickable,
 * calling the `onChange` function with the item's value.
 *
 * @param {Object} props The component props.
 * @param {Array} props.list An array of items to be rendered as list elements.
 * Each item in this array will be displayed as an individual list item (`<li>`).
 * @param {Function} props.onChange A callback function that is invoked when an item in the list is clicked.
 * This function is passed the value of the clicked item as its argument.
 */
const UList = ({ list, onChange }) => {
  return (
    <ul className={ulistStyle.ul}>
      {list.map(item => (
        <li
          key={`item-${item}`}
          onClick={() => onChange(item)}
          className={ulistStyle.li}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default UList
