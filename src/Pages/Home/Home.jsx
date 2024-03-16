// React
import { useState } from "react"

// React Router
import { Link } from "react-router-dom"

// Components
import Select from "../../components/Select/Select"
import UList from "../../components/UList/UList"
import DatePicker from "../../components/DatePicker/DatePicker"

// Style
import homeStyle from "./Home.module.scss"

const Home = () => {
  const [value, setValue] = useState(0)
  const onValueChange = (value) => {
    setValue(value)
  }

  const test = []
  for (let i = 0; i < 16; i++) test.push(i)

  return (
    <main className={homeStyle.main}>
      <h1>HRnet</h1>
      <Link to="/employees">View Current Employees</Link>
      <DatePicker name="birthDate" />
      <Select initValue={value} onValueChange={onValueChange}>
        <UList list={test} />
      </Select>
    </main>
  )
}

export default Home
