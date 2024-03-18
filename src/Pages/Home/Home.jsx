// React
import { useState } from "react"

// React Router
import { Link } from "react-router-dom"

// React Hook Form
import { useForm } from "react-hook-form"

// Components
import Select from "../../components/Select/Select"
import UList from "../../components/UList/UList"
import DatePicker from "../../components/DatePicker/DatePicker"

// Data
import { states } from "../../data/states"

// Style
import homeStyle from "./Home.module.scss"

const Home = () => {
  const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"]

  const [state, setState] = useState(states[0].name)
  const [department, setDepartment] = useState(departments[0])
  const [selectedBirthDate, setSelectedBirthDate] = useState(null)
  const [selectedStartDate, setSelectedStartDate] = useState(null)

  const { register, reset, handleSubmit } = useForm()
  const submitForm = data => {
    const employee = {}
    for (const [key, value] of Object.entries(data)) employee[key] = value
    employee["birthdate"] = selectedBirthDate
    employee["startDate"] = selectedStartDate
    employee["state"] = state
    employee["department"] = department

    localStorage.setItem(`employee-${localStorage.length + 1}`, JSON.stringify(employee))

    reset()

    setSelectedBirthDate(null)
    setSelectedStartDate(null)
    setState(states[0].name)
    setDepartment(departments[0])
  }

  const onStateChange = state => {
    setState(state)
  }

  const onDepartmentChange = department => {
    setDepartment(department)
  }

  const onBirthDateChange = () => {
    setSelectedBirthDate(document.getElementById("birthDatePicker").value)
  }

  const onStartDateChange = () => {
    setSelectedStartDate(document.getElementById("startDatePicker").value)
  }

  return (
    <>
      <header className={homeStyle.header}><h1>HRnet</h1></header>
      <main className={homeStyle.main}>
        <Link to="/employees">View Current Employees</Link>
        <h2>Create Employee</h2>
        <form action="#" id="create-employee" className={homeStyle.form} onSubmit={handleSubmit(submitForm)}>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" {...register("firstname")} />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" {...register("lastname")} />

          <DatePicker name="birthDatePicker" label="Date of Birth" onDateChange={onBirthDateChange} />
          <DatePicker name="startDatePicker" label="Start Date" onDateChange={onStartDateChange} />

          <fieldset className={homeStyle.fieldset}>
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" {...register("street")} />

            <label htmlFor="city">City</label>
            <input id="city" type="text" {...register("city")} />

            <label htmlFor="state">State</label>
            <Select initValue={state} onValueChange={onStateChange}>
              <UList list={states.map(state => state.name)} />
            </Select>

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" {...register("zipCode")} />
          </fieldset>

          <label htmlFor="department">Department</label>
          <Select initValue={department} onValueChange={onDepartmentChange}>
            <UList list={departments} />
          </Select>
          <input type="submit" />
        </form>
      </main>
    </>
  )
}

export default Home
