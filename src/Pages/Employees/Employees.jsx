// Components
import { Link } from "react-router-dom"
import DataTable from "../../components/DataTable/DataTable"

// Style
import employeesStyle from "./Employees.module.scss"

const Employees = () => {
  return (
    <>
      <main className={employeesStyle.main}>
        <h1>Current Employees</h1>
        <DataTable />
        <Link to="/">Home</Link>
      </main>
    </>
  )
}

export default Employees
