// React
import { useEffect, useState } from "react"

/**
 * Renders a paginated list allowing navigation through items by mouse wheel or keyboard arrows.
 *
 * @param {{ items: any[]; itemsPerPage?: number; onChange: (item: any) => void; }} props
 * @param {any[]} props.items The array of items to paginate.
 * @param {number} [props.itemsPerPage=12] The number of items to display per page. Defaults to 12.
 * @param {(item: any) => void} props.onChange Callback function called when an item is clicked.
 */
const Pagination = ({ items, itemsPerPage = 12, onChange }) => {
  const totalPages = Math.ceil(items.length / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(totalPages)

  /**
   * Changes the current page number within the allowed range.
   *
   * @param {number} newPage The page number to navigate to. This is actually the offset from the current page, not an absolute page number.
   */
  const changePage = newPage => {
    setCurrentPage(previousPage => {
      const updatedPage = previousPage + newPage
      return Math.max(1, Math.min(updatedPage, totalPages))
    })
  }

  const handleWheel = event => {
    event.preventDefault()
    const scrollY = event.deltaY

    scrollY < 0 ? changePage(-1) : changePage(1)
  }

  /**
   * Handles keyboard events to allow pagination control via ArrowUp and ArrowDown keys.
   *
   * @param {KeyboardEvent} event The keyboard event triggered by user action.
   */
  const handleKeyDown = event => {
    if (event.key === "ArrowUp") {
      event.preventDefault()
      changePage(-1)
    } else if (event.key === "ArrowDown") {
      event.preventDefault()
      changePage(1)
    }
  }

  /**
   * Sets up event listeners for mouse wheel and keyboard navigation.
   * Ensures proper cleanup on component unmount to prevent memory leaks.
   */
  useEffect(() => {
    const container = document.getElementById("itemContainer")
    container.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      container.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const itemsToShow = items.slice(startIndex, endIndex)

  return (
    <ul id="itemContainer" tabIndex="0">
      {itemsToShow.map(item => (
        <li
          key={`${item}-${crypto.randomUUID()}`}
          style={{ cursor: item === null ? "default" : "pointer" }}
          onClick={() => item !== null && onChange(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default Pagination
