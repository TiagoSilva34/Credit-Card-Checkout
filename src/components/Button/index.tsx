import { ButtonProps } from "./interface"

const Button = ({
    type,
    children,
    className,
    onClick,
    disabled,
    style
}: ButtonProps) => {
    return (
        <button style={style} disabled={disabled} type={type} className={className} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button