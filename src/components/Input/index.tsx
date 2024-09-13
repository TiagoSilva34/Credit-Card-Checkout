import { InputProps } from "./interface"

const Input = ({
    type,
    placeholder,
    value,
    className,
    onChange
}: InputProps) => {
    return (
        <input type={type} placeholder={placeholder} className={className} value={value} onChange={onChange} />
    )
}

export default Input