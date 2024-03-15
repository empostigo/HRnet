// Components
import { useState } from "react"
import Select from "../../components/Select/Select"
import UList from "../../components/UList/UList"

// Style
import homeStyle from "./Home.module.scss"
import DatePicker from "../../components/DatePicker/DatePicker"

const Home = () => {
  const [value, setValue] = useState(0)
  const onValueChange = (value) => {
    setValue(value)
  }

  const test = []
  for (let i = 0; i < 16; i++) test.push(i)

  return (
    <main className={homeStyle.main}>
      <DatePicker name="birthDate" />
      <Select initValue={value} onValueChange={onValueChange}>
        <UList list={test} />
      </Select>
    </main>
  )
}

export default Home
