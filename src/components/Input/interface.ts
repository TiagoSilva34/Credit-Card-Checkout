export interface InputProps {
    type: string 
    value: string 
    placeholder: string 
    className: string 
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    name?: string
    maxLength?: any
}