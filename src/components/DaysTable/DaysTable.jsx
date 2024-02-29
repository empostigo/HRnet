// Style
import daysStyle from "./DaysTable.module.scss"

const DaysTable = ({ days }) => {
  const daysName = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri", "Sat."]
  const calendarColumn = () => {
    for (let day in daysName) {
    }
  }



  /*
    return (
      <div className={daysStyle.wrapper}>
        {
          days.map((day, index) => {
            <p></p>
            <div key={`${day}-${crypto.randomUUID()}`} className={daysStyle.day}>{day}</div>)
        }
        }
      </div>
    )
    */
}

export default DaysTable
