import React, { useContext } from "react"
import moment from "moment"
import "./Messages.css"
import { MessageContext } from "./MessageProvider"
import Message from "./Message"


export default (props) => {
  const { messages } = useContext(MessageContext)
  
// takes all the messages and filters to the activer user; the property userId corresponds to the teacher 

   const activeTeacherMessages = messages.filter(
     m => {return m.userId === parseInt(localStorage.getItem("digi_student"),10) }
   ) || {} 

  //  sort the activeTeacherMessages by date 

   const sortedActiveTeacherMessages = activeTeacherMessages.sort((a, b) => moment(a.date).valueOf() -moment(b.date).valueOf())

  return (
// activeTeacherMessages array is mapped and the individiual object is sent to the Message component 
    <div className="messages">
      {
        activeTeacherMessages.map(m =>
           <Message key={m.id} message={m} {...props}
           />)
      }

    </div>
  )

}