// React
import { useEffect, useState } from "react"

// React Redux
import { useSelector } from "react-redux"
import { selectEmployees } from "../../features/employees/employeesSlice"

// Components
import Select from "../../components/Select/Select"
import UList from "../UList/UList"
import SortingHeader from "../SortingHeader/SortingHeader"

// data
import states from "../../data/states"

// Style
import dataTableStyle from "./DataTable.module.scss"

const DataTable = () => {
  const nbEntries = [10, 25, 50, 100]
  const [entries, setEntries] = useState(nbEntries[0])
  const onNbEntriesChange = (nbEntries) => {
    setEntries(nbEntries)
  }
  const [currentPage, setCurrentPage] = useState(1)
  const previousPage = () => {
    setCurrentPage(currentPage - 1)
  }
  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const getStateAbbrev = stateName => {
    const stateObject = states.find(state => state.name === stateName)
    return stateObject ? stateObject.abbreviation : undefined
  }

  const employees = useSelector(selectEmployees)
  const [sortedEmployees, setSortedEmployees] = useState(employees)
  const nbEmployees = sortedEmployees.length
  const totalPages = Math.ceil(nbEmployees / entries)

  const generateSortFct = (fieldName, ascending = true, isDate = false) => {
    return (a, b) => {
      let aValue = a[fieldName]
      let bValue = b[fieldName]

      if (isDate) {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      if (aValue < bValue) return ascending ? -1 : 1
      if (aValue > bValue) return ascending ? 1 : -1
      return 0
    }
  }

  const [sorting, setSorting] = useState([
    {
      name: "firstname",
      text: "First Name",
      enableUp: true,
      enableDown: false
    },
    {
      name: "lastname",
      text: "Last Name",
      enableUp: false,
      enableDown: false
    },
    {
      name: "startDate",
      text: "Start Date",
      enableUp: false,
      enableDown: false
    },
    {
      name: "department",
      text: "Department",
      enableUp: false,
      enableDown: false
    },
    {
      name: "birthDate",
      text: "Date of Birth",
      enableUp: false,
      enableDown: false
    },
    {
      name: "street",
      text: "Street",
      enableUp: false,
      enableDown: false
    },
    {
      name: "city",
      text: "City",
      enableUp: false,
      enableDown: false
    },
    {
      name: "state",
      text: "State",
      enableUp: false,
      enableDown: false
    },
    {
      name: "zipCode",
      text: "Zip Code",
      enableUp: false,
      enableDown: false
    }
  ])


  const onSortingUsed = (header) => {
    setSorting(prevSorting => {
      const newSorting = prevSorting.map(item => {
        if (item.text === header.text) {
          const isAscending = !item.enableUp
          const isItDate = (header.name === "startDate" || header.name === "birthDate")
          return {
            ...item,
            enableUp: isAscending,
            enableDown: !isAscending,
            sortingFunction: generateSortFct(header.name, isAscending, isItDate)
          }
        }
        return {
          ...item,
          enableUp: false,
          enableDown: false
        }

      })

      const activeSorting = newSorting.find(item => item.text === header.text)
      if (activeSorting) {
        const sorted = [...employees].sort(activeSorting.sortingFunction)
        setSortedEmployees(sorted)
      }
      return newSorting
    }
    )
  }


  const employeeFields = ["firstname", "lastname", "startDate", "department", "birthDate", "street", "city", "state", "zipCode"]
  const employeesData = sortedEmployees.map((employee, index) => {
    const employeeData = employeeFields.map(field =>
      <td className={`${dataTableStyle.data} ${field === "firstname" ? dataTableStyle["dataFirstname"] : ""}`} key={`${field}- ${index}`}>
        {
          field === "state" ? getStateAbbrev(employee[field]) : employee[field]
        }
      </td>)
    return <tr className={dataTableStyle.row} key={index}>{employeeData}</tr>
  })

  const getEmployeesPage = (pageNumber, nbShownEmployees) => {
    const startIndex = (pageNumber - 1) * nbShownEmployees
    const endIndex = startIndex + nbShownEmployees

    return {
      employeesDataPage: employeesData.slice(startIndex, endIndex),
      startIndex: startIndex,
      endIndex: endIndex
    }
  }

  const { employeesDataPage, startIndex, endIndex } = getEmployeesPage(currentPage, entries)

  const paginationRange = (currentPage, totalPages) => {
    const range = []
    const nbButtons = Math.min(6, totalPages)
    let start = currentPage - Math.floor(nbButtons / 2)
    start = Math.max(start, 1)
    start = Math.min(start, 1 + totalPages - nbButtons)

    for (let i = start; i < start + nbButtons && i <= totalPages; i++) range.push(i)

    return range
  }

  const pageNumbers = paginationRange(currentPage, totalPages)

  useEffect(() => {
    const totalPages = Math.ceil(employees.length / entries)
    if (currentPage > totalPages) setCurrentPage(totalPages || 1)
  }, [entries, currentPage, employees.length])

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
            employeesDataPage
          }
        </tbody>
      </table>
      <div className={dataTableStyle.footer}>
        <p className={dataTableStyle.info}>{`Showing ${startIndex + 1} to ${endIndex} of ${nbEmployees} ${nbEmployees > 1 ? "entries" : "entry"}`}</p>
        <div className={dataTableStyle.wrapper}>
          <a onClick={previousPage} className={`${dataTableStyle.changePage} ${currentPage === 1 ? dataTableStyle.disable : ""}`}>Previous</a>
          {
            currentPage > 4 && totalPages > 6 && (
              <>
                <a className={dataTableStyle.navigator} onClick={() => setCurrentPage(1)}>1</a>
                {currentPage > 5 && <span className={dataTableStyle.ellipsis}>...</span>}
              </>
            )
          }
          {
            pageNumbers.map(pageNumber => (
              <a
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`${dataTableStyle.navigator} ${currentPage === pageNumber ? dataTableStyle.active : ""}`}
              >
                {pageNumber}
              </a>
            ))
          }
          {
            totalPages > 6 && currentPage < (totalPages - 3) && (
              <>
                {currentPage < (totalPages - 4) && <span className={dataTableStyle.ellipsis}>...</span>}
                <a className={dataTableStyle.navigator} onClick={() => setCurrentPage(totalPages)}>{totalPages}</a>
              </>
            )
          }
          <a onClick={nextPage} className={`${dataTableStyle.changePage} ${currentPage === totalPages ? dataTableStyle.disable : ""}`}>Next</a>
        </div>
      </div>
    </>
  )
}

export default DataTable
