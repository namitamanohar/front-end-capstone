import React, { useState, useEffect } from "react"

export const SubjectContext = React.createContext()

export const SubjectProvider = (props) => {
    const [subjects, setSubjects] = useState([])

    const getSubjects = () => {
        return fetch("http://localhost:8088/subjects")
            .then(res => res.json())
            .then(setSubjects)
    }

    
    /*
        Load all animals when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getSubjects()
    }, [])

    useEffect(() => {
        console.log("****  Subject APPLICATION STATE CHANGED  ****")
    }, [subjects])

    return (
        <SubjectContext.Provider value={{
            subjects
        }}>
            {props.children}
        </SubjectContext.Provider>
    )
}