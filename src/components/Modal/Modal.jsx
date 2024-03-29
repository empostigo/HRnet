// React
import { useEffect } from "react"

// assets
import closing from "../../assets/closing.svg"

// Style
import modalStyle from "./Modal.module.scss"

/**
 * Modal component for displaying messages with a close button.
 * Automatically closes when the "Escape" key is pressed.
 *
 * @param {Object} props Component props
 * @param {string} props.message Message to display inside the modal.
 * @param {Function} props.closeModal Callback function to trigger closing the modal.
 */
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
        <img
          src={closing}
          alt="Close modal"
          className={modalStyle.closing}
          onClick={closeModal}
        />
      </div>
    </div>
  )
}

export default Modal
