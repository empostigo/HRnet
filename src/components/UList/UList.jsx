const UList = ({ list, className, onChange }) => {
  return (
    <ul className={className.list}>
      {
        list.map(item => <li key={`item-${item}`} className={className.item} onClick={() => onChange(item)}>{item}</li>)
      }
    </ul>
  )
}

export default UList

