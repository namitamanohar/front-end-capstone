import React, { useContext } from "react"
import { Button, Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap';
import moment from "moment";

export default (teacherMessage) => {
console.log("teacherMessage for announcements",teacherMessage)

return (
//  card for teacher Message 
      <div>
        <Card className="teacherMessage">
          <CardBody>
            <CardTitle className="teacherMessage__typeId"> { teacherMessage.teacherMessage.messageType.name}</CardTitle>
            <CardText className="teacherMessage__text">  {teacherMessage.teacherMessage.text}</CardText>
            <CardText className="teacherMessage__date"> {moment(teacherMessage.teacherMessage.date).format("MM/DD/YYYY")}</CardText >
          </CardBody>
        </Card>
      </div>

)

}

