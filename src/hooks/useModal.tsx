import { useState } from "react"

const useModal = () => {
    const [show, setShow] = useState<boolean>(false)

    const toggleModal = () => {
        setShow(!show)
    }

    return {
        show,
        setShow,
        toggleModal
    }
}

export default useModal