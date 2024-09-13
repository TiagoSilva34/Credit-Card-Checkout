import { ButtonProps } from "./interface"

const Button = ({
    type,
    children,
    className,
    onClick
}: ButtonProps) => {
    return (
        <button type={type} className={className} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button