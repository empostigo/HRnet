// Components
import { useState } from "react"
import Select from "../../components/Select/Select"
import UList from "../UList/UList"
import SortingHeader from "../SortingHeader/SortingHeader"

// Style
import dataTableStyle from "./DataTable.module.scss"

const DataTable = () => {
  const nbEntries = ["10", "25", "50", "100"]
  const sorting = ["First Name", "Last Name", "Start Date", "Department", "Date of Birth", "Street", "City", "State", "Zip Code"]

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
              sorting.map(header => <th key={header}><SortingHeader text={header} /></th>)
            }
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default DataTable
