// add tutoring request from 

import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const TutoringRequestContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const TutoringRequestProvider = (props) => {
    const [tutoringRequests, setTutoringRequests] = useState([])

    const getTutoringRequests = () => {
        return fetch("http://localhost:8088/tutoringRequests?_expand=user")
            .then(res => res.json())
            .then(setTutoringRequests)
    }

    const addTutoringRequest = tutoringRequest => {
        
        return fetch("http://localhost:8088/tutoringRequests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tutoringRequest)
        })
            .then(getTutoringRequests)
    }

    const deleteTutoringRequest = tutoringRequestId => {
        return fetch(`http://localhost:8088/TutoringRequests/${tutoringRequestId}`, {
            method: "DELETE",
        })
            .then(getTutoringRequests)
    }

    const updateTutoringRequest = tutoringRequest => {
        return fetch(`http://localhost:8088/TutoringRequests/${tutoringRequest.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tutoringRequest)
        })
            .then(getTutoringRequests)
    }

    /*
        Load all animals when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getTutoringRequests()
    }, [])

    useEffect(() => {
        console.log("****  TutoringRequest APPLICATION STATE CHANGED  ****")
    }, [tutoringRequests])

    return (
        <TutoringRequestContext.Provider value={{
            tutoringRequests, addTutoringRequest, deleteTutoringRequest, updateTutoringRequest
        }}>
            {props.children}
        </TutoringRequestContext.Provider>
    )
}