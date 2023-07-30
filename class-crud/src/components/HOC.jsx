import { createContext, useContext, useRef } from "react"

export const HOC = (Component) => {
    const NewComponent = () => {
        const reference = useRef()
        return (
            <>
                <Component reference={reference} />
            </>
        )
    }
    return NewComponent
}