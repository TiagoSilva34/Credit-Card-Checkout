import { CardProps } from "./interface"

const Card = ({children, className}: CardProps) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Card 