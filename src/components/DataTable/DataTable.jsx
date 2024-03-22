// Components
import { useState } from "react"
import Select from "../../components/Select/Select"
import UList from "../UList/UList"
import SortingHeader from "../SortingHeader/SortingHeader"

// Style
import dataTableStyle from "./DataTable.module.scss"

const DataTable = () => {
  const nbEntries = ["10", "25", "50", "100"]
  const [sorting, setSorting] = useState([
    {
      text: "First Name",
      enableUp: true,
      enableDown: false
    },
    {
      text: "Last Name",
      enableUp: false,
      enableDown: false
    },
    {
      text: "Start Date",
      enableUp: false,
      enableDown: false
    },
    {
      text: "Department",
      enableUp: false,
      enableDown: false
    },
    {
      text: "Date of Birth",
      enableUp: false,
      enableDown: false
    },
    {
      text: "Street",
      enableUp: false,
      enableDown: false
    },
    {
      text: "City",
      enableUp: false,
      enableDown: false
    },
    {
      text: "State",
      enableUp: false,
      enableDown: false
    },
    {
      text: "Zip Code",
      enableUp: false,
      enableDown: false
    }
  ])

  const onSortingUsed = (header) => {
    setSorting(prevSorting =>
      prevSorting.map(item => {
        if (item.text === header.text) {
          if (item.enableUp) return { ...item, enableUp: false, enableDown: true }
          return { ...item, enableUp: true, enableDown: false }
        }

        return {
          ...item, enableUp: false, enableDown: false
        }
      })
    )
  }

  const [entries, setEntries] = useState(nbEntries[0])
  const onNbEntriesChange = (nbEntries) => {
    setEntries(nbEntries)
  }

  return (
    <>
      <div className={dataTableStyle.container}>
        <header className={dataTableStyle.header}>
          <div className={dataTableStyle.entries}>
            <span>Show</span>
            <Select initValue={nbEntries[0]} onValueChange={onNbEntriesChange}>
              <UList list={nbEntries} />
            </Select>
            <span>entries</span>
          </div>
          <div className={dataTableStyle.searching}>
            <label htmlFor="searchField">Search:</label>
            <input id="searchField" name="searchField" type="text" />
          </div>
        </header>
      </div>
      <table className={dataTableStyle.table}>
        <tbody className={dataTableStyle.tbody}>
          <tr className={dataTableStyle.headers}>
            {
              sorting.map(header => <th key={header.text} onClick={() => onSortingUsed(header)}><SortingHeader text={header.text} sortingItem={header} /></th>)
            }
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default DataTable
