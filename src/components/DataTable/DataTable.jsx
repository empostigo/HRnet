// React
import { useEffect, useState } from "react"

// React Redux
import { useSelector } from "react-redux"
import { selectEmployees } from "../../features/employees/employeesSlice"

// Components
import Select from "../../components/Select/Select"
import UList from "../UList/UList"
import SortingHeader from "../SortingHeader/SortingHeader"

// Style
import dataTableStyle from "./DataTable.module.scss"

const DataTable = () => {
  const nbEntries = [10, 25, 50, 100]
  const [entries, setEntries] = useState(nbEntries[0])
  const onNbEntriesChange = (nbEntries) => {
    setEntries(nbEntries)
  }


  const employees = useSelector(selectEmployees)
  const nbEmployees = employees.length
  const employeeFields = ["firstname", "lastname", "startDate", "department", "birthDate", "street", "city", "state", "zipCode"]
  const employeesData = employees.map((employee, index) => {
    const employeeData = employeeFields.map(field =>
      <td className={`${dataTableStyle.data} ${field === "firstname" ? dataTableStyle["dataFirstname"] : ""}`} key={`${field}- ${index}`}>{employee[field]}</td>)
    return <tr className={dataTableStyle.row} key={index}>{employeeData}</tr>
  })

  const getEmployeesPage = (pageNumber, nbShownEmployees) => {
    const startIndex = (pageNumber - 1) * nbShownEmployees
    const endIndex = startIndex + nbShownEmployees

    return employeesData.slice(startIndex, endIndex)
  }

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
        </header >
      </div >
      <table className={dataTableStyle.table}>
        <tbody className={dataTableStyle.tbody}>
          <tr className={dataTableStyle.theaders}>
            {
              sorting.map(header =>
                <th
                  key={header.text}
                  onClick={() => onSortingUsed(header)}
                >
                  <SortingHeader key={crypto.randomUUID()} text={header.text} sortingItem={header} />
                </th>
              )}
          </tr>
          {
            getEmployeesPage(1, entries)
          }
        </tbody>
      </table>
      <div className={dataTableStyle.footer}>
        <p>{`Showing of ${nbEmployees} ${nbEmployees > 1 ? "entries" : "entry"}`}</p>
      </div>
    </>
  )
}

export default DataTable
