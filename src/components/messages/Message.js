import React, { useState, useContext } from "react"
import moment from "moment";
import { Button, Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap';
import { MessageContext } from "./MessageProvider";



export default  ({message, history }) => {

  const { deleteMessage, updateMessage } = useContext(MessageContext)

  return (
    <div>
    <Card className="message">
      <CardBody>
        <CardTitle className="message__typeId">{message.messageType.name}</CardTitle>
        <CardText className="message__text"> {message.text}</CardText>
        <CardText className="message__date">{moment(message.date).format("MM/DD/YYYY")}</CardText >
      </CardBody>
      <Button onClick={
        () => {
          {
            history.push(`/${message.id}`)
          }
        }
      }>Edit</Button>
      <Button onClick= {
        () => {
          deleteMessage(message.id)
        }
      }>Delete</Button>
    </Card>
  </div>
  )

}