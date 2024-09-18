import { ButtonProps } from "./interface"

const Button = ({
    type,
    children,
    className,
    onClick,
    disabled
}: ButtonProps) => {
    return (
        <button disabled={disabled} type={type} className={className} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button