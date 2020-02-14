import React, { useState, useEffect } from "react"


export const MessageContext = React.createContext()


export const MessageProvider = (props) => {
    const [messages, setMessages] = useState([])

    const getMessages = () => {
        return fetch("http://localhost:8088/messages?_expand=user&_expand=messageType")
            .then(res => res.json())
            .then(setMessages)
    }

    const addMessage = message => {
        
        return fetch("http://localhost:8088/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
            .then(getMessages)
    }

    const deleteMessage = messageId => {
        return fetch(`http://localhost:8088/messages/${messageId}`, {
            method: "DELETE",
        })
            .then(getMessages)
    }

    const updateMessage = message => {
        return fetch(`http://localhost:8088/messages/${message.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
            .then(getMessages)
    }

 
    useEffect(() => {
        getMessages()
    }, [])

    useEffect(() => {
        console.log("****  Message APPLICATION STATE CHANGED  ****")
    }, [messages])

    return (
        <MessageContext.Provider value={{
            messages, addMessage, deleteMessage, updateMessage
        }}>
            {props.children}
        </MessageContext.Provider>
    )
}