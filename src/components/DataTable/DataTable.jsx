// React
import { useState } from "react"

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
  /*
          {
            employees.map(employee =>
              <tr className={dataTableStyle.data}>
                <td className={dataTableStyle.data} key={crypto.randomUUID()}>{employee.firstname}Emmanuel</td>
                <td className={dataTableStyle.data} key={crypto.randomUUID()}>{employee.lastname}Postigo</td>
                <td className={dataTableStyle.data} key={crypto.randomUUID()}>{employee.startDate}03/22/2024</td>
                <td className={dataTableStyle.data} key={crypto.randomUUID()}>{employee.department}Sales</td>
                <td className={dataTableStyle.data} key={crypto.randomUUID()}>{employee.birthDate}09/14/1978</td>
                <td className={dataTableStyle.data} key={crypto.randomUUID()}>{employee.street}Papin</td>
                <td className={dataTableStyle.data} key={crypto.randomUUID()}>{employee.city}Valence</td>
                <td className={dataTableStyle.data} key={crypto.randomUUID()}>{employee.state}California</td>
                <td className={dataTableStyle.data} key={crypto.randomUUID()}>{employee.zipCode}26000</td>
              </tr>
            )
          }
  */

  const employees = useSelector(selectEmployees)
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
          <tr className={dataTableStyle.row}>
            <td className={`${dataTableStyle.data} ${dataTableStyle.dataFirstname}`}>Emmanuel</td>
            <td className={dataTableStyle.data}>Postigo</td>
            <td className={dataTableStyle.data}>03/22/2024</td>
            <td className={dataTableStyle.data}>Sales</td>
            <td className={dataTableStyle.data}>09/14/1978</td>
            <td className={dataTableStyle.data}>Papin</td>
            <td className={dataTableStyle.data}>Valence</td>
            <td className={dataTableStyle.data}>California</td>
            <td className={dataTableStyle.data}>26000</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default DataTable
