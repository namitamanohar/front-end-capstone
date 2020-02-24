import React, { useState, useContext } from "react"
import moment from "moment";
import { Button, Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap';
import { MessageContext } from "./MessageProvider";


// TEACHER VIEW

export default  ({message, history }) => {

  const { deleteMessage } = useContext(MessageContext)

  // the Message card that displays the messageType, text, and date for the teacher view 
  return (
    <div>
    <Card className="message">
      <CardBody>
        <CardTitle className="message__typeId">{message.messageType.name}</CardTitle>
        <CardText className="message__text"> {message.text}</CardText>
        <CardText className="message__date">{moment(message.date).format("MM/DD/YYYY")}</CardText >
      <Button color="info" onClick={
        () => {
          {
            history.push(`/${message.id}`)
          }
        }
      }>Edit</Button>
      <Button color="secondary" onClick= {
        // onclick uses the DELETE method to delete the object corresponding with the message id 
        () => {
          deleteMessage(message.id)
        }
      }>Delete</Button>
      </CardBody>
    </Card>
  </div>
  )

}