import React, { useContext } from "react"

import "./Messages.css"
import { MessageContext } from "./MessageProvider"
import Message from "./Message"



export default (props) => {
  const { messages } = useContext(MessageContext)
  

   const activeTeacherMessages = messages.filter(
     m => {return m.userId = parseInt(localStorage.getItem("digi_student"),10) }
   ) || {} 

   
   

  return (

    <div className="Messages">
      {
        activeTeacherMessages.map(m =>
           <Message key={m.id} message={m} {...props}
           />)
      }

    </div>
  )

}