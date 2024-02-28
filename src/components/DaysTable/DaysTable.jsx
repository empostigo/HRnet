const DaysTable = ({ days }) => {
  return (
    <div>
      {
        days.map(day => <div>{day}</div>)
      }
    </div>
  )
}

export default DaysTable
