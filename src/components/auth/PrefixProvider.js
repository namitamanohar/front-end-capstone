import React, { useState, useEffect } from "react"

export const PrefixContext = React.createContext()

export const PrefixProvider = (props) => {
    const [prefixes, setPrefixes] = useState([])

    const getPrefixes = () => {
        return fetch("http://localhost:8088/prefixes")
            .then(res => res.json())
            .then(setPrefixes)
    }

    
    /*
        Load all animals when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getPrefixes()
    }, [])

    useEffect(() => {
        console.log("****  Prefix APPLICATION STATE CHANGED  ****")
    }, [prefixes])

    return (
        <PrefixContext.Provider value={{
            prefixes
        }}>
            {props.children}
        </PrefixContext.Provider>
    )
}