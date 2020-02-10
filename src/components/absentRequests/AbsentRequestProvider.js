// add tutoring request from 

import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const AbsentRequestContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const AbsentRequestProvider = (props) => {
    const [absentRequests, setAbsentRequests] = useState([])

    const getAbsentRequests = () => {
        return fetch("http://localhost:8088/absentRequests?_expand=user")
            .then(res => res.json())
            .then(setAbsentRequests)
    }

    const addAbsentRequest = absentRequest => {
        
        return fetch("http://localhost:8088/absentRequests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(absentRequest)
        })
            .then(getAbsentRequests)
    }

    const deleteAbsentRequest = absentRequestId => {
        return fetch(`http://localhost:8088/absentRequests/${absentRequestId}`, {
            method: "DELETE",
        })
            .then(getAbsentRequests)
    }

    const updateAbsentRequest = absentRequest => {
        return fetch(`http://localhost:8088/absentRequests/${absentRequest.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(absentRequest)
        })
            .then(getAbsentRequests)
    }

    /*
        Load all animals when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getAbsentRequests()
    }, [])

    useEffect(() => {
        console.log("****  AbsentRequest APPLICATION STATE CHANGED  ****")
    }, [absentRequests])

    return (
        <AbsentRequestContext.Provider value={{
            absentRequests, addAbsentRequest, deleteAbsentRequest, updateAbsentRequest
        }}>
            {props.children}
        </AbsentRequestContext.Provider>
    )
}