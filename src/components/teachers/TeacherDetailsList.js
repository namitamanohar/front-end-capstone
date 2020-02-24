import React, { useContext  } from "react"
import { Button, Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap';
import { MessageContext } from "../messages/MessageProvider";
import TeacherAnnouncement from "./TeacherAnnouncement";
import moment from "moment"

export default ({ teacher }) => {

  const { messages } = useContext(MessageContext)

  // take teacher object and filter through to get the messages 

  const teacherMessages= messages.filter(m => {
    return m.userId === teacher.id 
  }) || {}

  console.log(teacherMessages)

  // sort messages by date 
   const sortedTeacherMessages= teacherMessages.sort((a, b) => moment(a.date).valueOf() -moment(b.date).valueOf())
  // only shows messages from today and upcoming 
   const currentTeacherMessages = teacherMessages.filter( e => {
    if(moment(e.date).valueOf() + 86400000 > Date.now()){
        return e 
    }
}) || {}


 return (
  // maps through the messages and sends the message object to the Teacher Announcement component 
        <div className="teacherMessages">
        {
          currentTeacherMessages.map(m =>
            <TeacherAnnouncement key={m.id} teacherMessage={m} 
            />)
        }
      </div>

 )

}

