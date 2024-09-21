import { ModalProps } from "./interface"

const Modal = ({children, className}: ModalProps) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Modal