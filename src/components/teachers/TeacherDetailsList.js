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

   const sortedTeacherMessages= teacherMessages.sort((a, b) => moment(a.date).valueOf() -moment(b.date).valueOf())


 return (

        <div className="teacherMessages">
        {
          teacherMessages.map(m =>
            <TeacherAnnouncement key={m.id} teacherMessage={m} 
            />)
        }
      </div>

 )

}

