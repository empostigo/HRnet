// Style
import daysStyle from "./DaysTable.module.scss"

const DaysTable = ({ days }) => {
  const daysName = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri", "Sat."].map(day => <th key={`${day}-${crypto.randomUUID()}`}>{day}</th>)
  const tableDays = () => {
    let column = []
    for (let i = 0; i <= days.length; i += 7) {
      let tmpColumn = []
      for (let j = i; j <= i + 6; j++)
        tmpColumn.push(<th key={`${i}-${j}-${crypto.randomUUID()}`}>{days[j]}</th>)

      column.push(tmpColumn)
    }

    return column
  }

  return (
    <table>
      <tbody>
        <tr>{daysName}</tr>
        {
          tableDays().map(table => <tr key={`${crypto.randomUUID()}`}>{table}</tr>)
        }
      </tbody>
    </table>
  )
}

export default DaysTable
