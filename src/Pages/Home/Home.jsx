// React
import { useState } from "react"

// React Router
import { Link } from "react-router-dom"

// React Hook Form
import { useForm } from "react-hook-form"

// RTK / React Redux
import { useDispatch } from "react-redux"
import { addEmployee } from "../../features/employees/employeesSlice"

// Components
import { Select } from "em-react-calendar-test9"
import UList from "../../components/UList/UList"
import DatePicker from "../../components/DatePicker/DatePicker"

// Data
import states from "../../data/states"

// Style
import homeStyle from "./Home.module.scss"
import Modal from "../../components/Modal/Modal"

const Home = () => {
  const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"]

  const [hidden, setHidden] = useState(true)
  const closeModal = () => {
    setHidden(true)
    setFormSubmitted(false)
  }

  const [formSubmitted, setFormSubmitted] = useState(false)

  const [state, setState] = useState(states[0].name)
  const [department, setDepartment] = useState(departments[0])
  const [selectedBirthDate, setSelectedBirthDate] = useState(null)
  const [selectedStartDate, setSelectedStartDate] = useState(null)

  const dispatch = useDispatch()
  const { register, reset, handleSubmit } = useForm()
  const submitForm = data => {
    const employee = {}
    for (const [key, value] of Object.entries(data)) employee[key] = value
    employee["birthDate"] = selectedBirthDate
    employee["startDate"] = selectedStartDate
    employee["state"] = state
    employee["department"] = department
    dispatch(addEmployee(employee))

    reset()

    setSelectedBirthDate(null)
    setSelectedStartDate(null)
    setState(states[0].name)
    setDepartment(departments[0])

    setHidden(false)
    setFormSubmitted(true)
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
          <input type="text" id="first-name" {...register("firstname")} autoComplete="true" required />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" {...register("lastname")} autoComplete="true" required />

          <DatePicker name="birthDatePicker" label="Date of Birth" formSubmitted={formSubmitted} onDateChange={onBirthDateChange} />
          <DatePicker name="startDatePicker" label="Start Date" formSubmitted={formSubmitted} onDateChange={onStartDateChange} />

          <fieldset className={homeStyle.fieldset}>
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" autoComplete="true" {...register("street")} required />

            <label htmlFor="city">City</label>
            <input id="city" type="text" autoComplete="true" {...register("city")} required />

            <label htmlFor="state">State</label>
            <Select value={state} id={"state"} onValueChange={onStateChange}>
              <UList list={states.map(state => state.name)} />
            </Select>

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" autoComplete="true" {...register("zipCode")} required />
          </fieldset>

          <label htmlFor="department">Department</label>
          <Select value={department} id={"department"} onValueChange={onDepartmentChange}>
            <UList list={departments} />
          </Select>
          <input type="submit" />
        </form>
        {
          !hidden &&
          <Modal message={"Employee Created!"} closeModal={closeModal} />
        }
      </main>
    </>
  )
}

export default Home
