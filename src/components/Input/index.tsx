import { InputProps } from "./interface"

const Input = ({
    type,
    placeholder,
    value,
    className,
    onChange,
    onFocus,
    name,
    maxLength
}: InputProps) => {
    return (
        <input maxLength={maxLength} name={name} onFocus={onFocus} type={type} placeholder={placeholder} className={className} value={value} onChange={onChange} />
    )
}

export default Input