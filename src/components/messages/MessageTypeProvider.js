import React, { useState, useEffect } from "react"

export const MessageTypeContext = React.createContext()

export const MessageTypeProvider = (props) => {
    const [messageTypes, setMessageTypes] = useState([])

    const getMessageTypes = () => {
        return fetch("http://localhost:8088/messageTypes")
            .then(res => res.json())
            .then(setMessageTypes)
    }

    
    
    useEffect(() => {
        getMessageTypes()
    }, [])

    useEffect(() => {
        console.log("****  MessageType APPLICATION STATE CHANGED  ****")
    }, [messageTypes])

    return (
        <MessageTypeContext.Provider value={{
            messageTypes
        }}>
            {props.children}
        </MessageTypeContext.Provider>
    )
}