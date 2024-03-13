// Components
import { useState } from "react"
import Calendar from "../../components/Calendar/Calendar"
import Select from "../../components/Select/Select"
import UList from "../../components/UList/UList"

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
      < Calendar />
      <Select initValue={value} onValueChange={onValueChange}>
        <UList list={test} />
      </Select>
    </main>
  )
}

export default Home
