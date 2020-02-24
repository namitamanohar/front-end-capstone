import React, { useState, useEffect } from "react"

export const UserTypeContext = React.createContext()

export const UserTypeProvider = (props) => {
    const [userTypes, setUserTypes] = useState([])

    const getUserTypes = () => {
        return fetch("http://localhost:8088/userTypes")
            .then(res => res.json())
            .then(setUserTypes)
    }

    
    /*
        Load all UserTypes when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getUserTypes()
    }, [])

    useEffect(() => {
        console.log("****  UserTypes APPLICATION STATE CHANGED  ****")
    }, [userTypes])

    return (
        <UserTypeContext.Provider value={{
            userTypes
        }}>
            {props.children}
        </UserTypeContext.Provider>
    )
}