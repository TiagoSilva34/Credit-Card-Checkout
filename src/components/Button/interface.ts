export interface ButtonProps {
    type: "submit" | "reset" | "button"
    className: string 
    children: React.ReactNode
    onClick: React.MouseEventHandler<HTMLButtonElement>
    disabled: boolean
    style: any
}