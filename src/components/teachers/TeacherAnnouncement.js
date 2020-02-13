import React, { useContext } from "react"
import { Button, Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap';
import moment from "moment";

export default (teacherMessage) => {

  console.log("teacherMessage for modal",teacherMessage)

return (

      <div>
        <Card className="teacherMessage">
          <CardBody>
            {/* <CardTitle className="teacherMessage__typeId"> { teacherMessage.messageType.name}</CardTitle> */}
            <CardText className="teacherMessage__text">  {teacherMessage.teacherMessage.text}</CardText>
            <CardText className="teacherMessage__date"> {moment(teacherMessage.teacherMessage.date).format("MM/DD/YYYY")}</CardText >
          </CardBody>
        </Card>
      </div>

)

}

