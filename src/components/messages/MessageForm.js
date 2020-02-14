import React, { useContext, useState, useEffect } from "react"
import "./Messages.css"
import { MessageTypeContext } from "./MessageTypeProvider"
import { MessageContext } from "./MessageProvider"

export default (props) => {

    const { messages, addMessage, updateMessage} = useContext(MessageContext)
    const [message, setMessage] = useState({
      "text":"", 
      "messageTypeId":"", 
      "date":"", 
      "userId":""
  })
    
    const { messageTypes } = useContext(MessageTypeContext)

    const editMode = props.match.params.hasOwnProperty("messageBoardId")

    
    const handleControlledInputChange = (evt) => {
     
        const newMessage= Object.assign({}, message)
        newMessage[evt.target.name] = evt.target.value
        setMessage(newMessage)
        
    }

    const setDefaults = () => {
      if (editMode) {
          const messageBoardId = parseInt(props.match.params.messageBoardId)
          const selectedMessage= messages.find(m => m.id === messageBoardId) || {}
          console.log(selectedMessage)
          setMessage(selectedMessage)

      }
  }

  useEffect(() => {
      setDefaults()
  }, [messages])
    
    const constructNewMessage= () => {
         
       if (editMode) {
        updateMessage({
          id:message.id, 
          text: message.text,              
          date: message.date,
          messageTypeId: parseInt(message.messageTypeId),
          userId: parseInt(localStorage.getItem("digi_student"), 10)
      })
      .then(() => props.history.push("/messageBoard"))
       }else {

          addMessage({
              text: message.text,              
              date: message.date,
              messageTypeId: parseInt(message.messageTypeId),
              userId: parseInt(localStorage.getItem("digi_student"), 10)
          })
          .then(() => props.history.push("/messageBoard"))  
          
       }
            
        }
    

    return (
        <form className="messageForm">
            <h2 className="messageForm__title">{editMode ? "Edit Message" : "Create a Message"}</h2>
            <fieldset>
            <div className="form-group">
                <label htmlFor="text">Message</label>
                <input
                    type="text"
                    name="text"
                    value={message.text}
                    required
                    autoFocus
                    className="form-control"
                    placeholder="Message"
                    proptype="varchar"
                    onChange={handleControlledInputChange}
                    />
            </div>
        </fieldset>
            <fieldset>
            <div className="form-group">
                <label htmlFor="messageType">Pick the Message Type</label>
                <select
                    name="messageTypeId"
                    value={message.messageTypeId}
                    className="form-control"
                    onChange={handleControlledInputChange}
                >
                    <option value="0">Select the message type</option>
                    {messageTypes.map(m => (
                        <option key={m.id} value={m.id}>
                            {m.name}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
           <fieldset>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={message.date}
                    required
                    className="form-control"
                    onChange={handleControlledInputChange}
                    />
            </div>
        </fieldset>
            <button type="submit" onClick={evt => 
                    {evt.preventDefault() 
                    constructNewMessage()
                    setMessage({
                      "text":"", 
                      "messageTypeId":"", 
                      "date":"", 
                      "userId":""
                  })
                    }}
                className="btn btn-primary">{editMode ? "Edit Message" : "Add a Message"}</button>
        </form>
    )
}



