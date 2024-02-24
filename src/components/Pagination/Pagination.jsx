// React
import { useEffect, useState } from "react"

// Style
import paginationStyle from "./Pagination.module.scss"

const Pagination = ({ items, itemsPerPage = 12, onChange }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(items.length / itemsPerPage)

  const changePage = (newPage) => {
    setCurrentPage((previousPage) => {
      const updatedPage = previousPage + newPage
      return Math.max(1, Math.min(updatedPage, totalPages))
    })
  }

  const handleWheel = (event) => {
    event.preventDefault()
    const scrollY = event.deltaY

    scrollY < 0 ? changePage(-1) : changePage(1)
  }

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault()
      changePage(-1)
    } else if (event.key === "ArrowDown") {
      event.preventDefault()
      changePage(1)
    }
  }

  useEffect(() => {
    const container = document.getElementById("itemContainer")
    container.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("keydown", handleKeyDown)
    }
  }, [totalPages])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const itemsToShow = items.slice(startIndex, endIndex);


  return (
    <ul id="itemContainer" className={paginationStyle.list} tabIndex="0" >
      {itemsToShow.map(item =>
        <li key={item} className={paginationStyle.item} onClick={() => onChange(item)}>{item}</li>
      )}
    </ul>
  )
}

export default Pagination
