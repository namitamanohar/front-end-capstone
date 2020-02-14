import React, { useContext } from "react"
import moment from "moment"
import "./Messages.css"
import { MessageContext } from "./MessageProvider"
import Message from "./Message"



export default (props) => {
  const { messages } = useContext(MessageContext)
  

   const activeTeacherMessages = messages.filter(
     m => {return m.userId = parseInt(localStorage.getItem("digi_student"),10) }
   ) || {} 

   
   const sortedActiveTeacherMessages = activeTeacherMessages.sort((a, b) => moment(a.date).valueOf() -moment(b.date).valueOf())

  return (

    <div className="messages">
      {
        activeTeacherMessages.map(m =>
           <Message key={m.id} message={m} {...props}
           />)
      }

    </div>
  )

}