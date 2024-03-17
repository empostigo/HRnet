// React
import { useState } from "react"

// React Router
import { Link } from "react-router-dom"

// Components
import Select from "../../components/Select/Select"
import UList from "../../components/UList/UList"
import DatePicker from "../../components/DatePicker/DatePicker"

// Data
import { states } from "../../data/states"

// Style
import homeStyle from "./Home.module.scss"

const Home = () => {
  const [value, setValue] = useState(0)
  const onValueChange = (value) => {
    setValue(value)
  }


  const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"]

  return (
    <>
      <header className={homeStyle.header}><h1>HRnet</h1></header>
      <main className={homeStyle.main}>
        <Link to="/employees">View Current Employees</Link>
        <h2>Create Employee</h2>
        <form action="#" id="create-employee" className={homeStyle.form}>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" />

          <DatePicker name="birthDate" label="Date of Birth" />
          <DatePicker name="startDate" label="Start Date" />

          <fieldset className={homeStyle.fieldset}>
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" />

            <label htmlFor="city">City</label>
            <input id="city" type="text" />

            <label htmlFor="state">State</label>
            <Select initValue={states[0].name} onValueChange={setValue}>
              <UList list={states.map(state => state.name)} />
            </Select>

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" />
          </fieldset>

          <label htmlFor="department">Department</label>
          <Select initValue={departments[0]} onValueChange={setValue}>
            <UList list={departments} />
          </Select>
        </form>
      </main>
    </>
  )
}

export default Home
