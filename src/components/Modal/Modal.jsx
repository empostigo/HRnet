// React
import { useEffect } from "react"

// assets
import closing from "../../assets/closing.svg"

// Style
import modalStyle from "./Modal.module.scss"

const Modal = ({ message, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "Escape") closeModal()
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [closeModal])

  return (
    <div className={modalStyle.container}>
      <div className={modalStyle.wrapper}>
        <p>{message}</p>
        <img src={closing} alt="Close modal" className={modalStyle.closing} onClick={closeModal} />
      </div>
    </div>
  )
}

export default Modal
