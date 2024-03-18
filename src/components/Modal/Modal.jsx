// React
import { useState } from "react"

// assets
import closing from "../../assets/closing.svg"

// Style
import modalStyle from "./Modal.module.scss"

const Modal = ({ message, closeModal }) => {
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
