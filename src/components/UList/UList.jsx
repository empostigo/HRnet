// Style
import ulistStyle from "./UList.module.scss"

const UList = ({ list, onChange }) => {

  return (
    <ul className={ulistStyle.ul}>
      {
        list.map(item => <li key={`item-${item}`} onClick={() => onChange(item)} className={ulistStyle.li}>{item}</li>)
      }
    </ul>
  )
}

export default UList

