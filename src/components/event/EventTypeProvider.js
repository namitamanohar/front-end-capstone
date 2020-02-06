import React, { useState, useEffect } from "react"

export const EventTypeContext = React.createContext()

export const EventTypeProvider = (props) => {
    const [eventTypes, setEventTypes] = useState([])

    const getEventTypes = () => {
        return fetch("http://localhost:8088/eventTypes")
            .then(res => res.json())
            .then(setEventTypes)
    }

    
    /*
        Load all animals when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getEventTypes()
    }, [])

    useEffect(() => {
        console.log("****  EventType APPLICATION STATE CHANGED  ****")
    }, [eventTypes])

    return (
        <EventTypeContext.Provider value={{
            eventTypes
        }}>
            {props.children}
        </EventTypeContext.Provider>
    )
}