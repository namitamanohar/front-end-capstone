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
    // tutoring Requests is a state variable and setTutoringRequests sets the state variable 

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

    const deleteTutoringRequest = tutoringRequest => {
        return fetch(`http://localhost:8088/TutoringRequests/${tutoringRequest.id}`, {
            method: "DELETE",
        })
            .then(getTutoringRequests)
    }

    const updateTutoringRequest = tutoringRequest => {
        return fetch(`http://localhost:8088/TutoringRequests/${tutoringRequest.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tutoringRequest)
        })
            .then(getTutoringRequests)
    }
    const editTutoringRequest = tutoringRequest => {
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
            tutoringRequests, addTutoringRequest, deleteTutoringRequest, updateTutoringRequest, editTutoringRequest
        }}>
            {props.children}
        </TutoringRequestContext.Provider>
    )
}