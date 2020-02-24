import React, { useState, useContext } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EventForm from "./EventForm";
import { EventContext } from "./EventProvider";
import moment from "moment";
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap';
import { PrefixContext } from "../auth/PrefixProvider";
import { SubjectContext } from "../auth/SubjectProvider";

// STUDENT VIEW   

export default ({ event , className  }) => {

  const { deleteEvent } = useContext(EventContext)
  
  const { prefixes } = useContext(PrefixContext)
  const { subjects } = useContext(SubjectContext)

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

// if the event has a timestamp means that is a tutoring Request and will be displayed differently 
if(event.hasOwnProperty('timestamp')===true){
  const prefix=prefixes.find(p => {
    return p.id === event.user.prefixId
  })

  const subject = subjects.find(s => {
    return s.id === event.user.subjectId 
  })


  return (

// event card for tutoringRequests that have been approved and have timestamp 
    <div>
    <Card className="event">
      <CardBody>
        <CardTitle className="tutoringRequest__title">{event.title}</CardTitle>
        <CardText className="tutoringRequest__teacer">{prefix.name}. {event.user.lastName} </CardText >
        <CardText className="tutoringRequest__subject">Subject: {subject.name}</CardText>
        <CardText className="tutoringRequest__date">Date: {moment(event.date).format("MM/DD/YYYY")}</CardText>
        <CardText className="tutoringRequest__time">Tutoring Time: {moment(event.startTime,'HH:mm').format('hh:mm a') }-{moment(event.endTime,'HH:mm').format('hh:mm a') }</CardText>  
      </CardBody>
    </Card>
  </div>
  )
}
else {
// card for events that has an edit button and delete button; when the edit button is clicked editMode true is sent and the eventObject that can then be accessed by props on the EventForm component; along with the modal opening 
return (

  <div> 
        <Card className="event">
          <CardBody>
          <CardTitle>{event.title}</CardTitle>
          <CardText>Event Type: {event.eventType.name}</CardText>
          <CardText>{moment(event.startTime,'HH:mm').format('hh:mm a') }-{moment(event.endTime,'HH:mm').format('hh:mm a') }</CardText>
          <CardText>Date: {moment(event.date).format("MM/DD/YYYY")}</CardText>
          <Button  color="secondary" onClick={toggle}>Edit </Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
                      <ModalHeader toggle={toggle}>Time to Plan!</ModalHeader>

                        <ModalBody>
                          <EventForm editMode={true} eventObject={event} setModal={setModal}  />
                        </ModalBody>
                      <ModalFooter>
                    </ModalFooter>
                  </Modal> 
                  <Button  color="primary" 
                  onClick={
// uses the DELETE method to remove the the corresponding event object from the JSON 
                    () => {
                      deleteEvent(event.id)
                      
                    }
                  }>Delete </Button>
          </CardBody>
        </Card>
    </div>  
    
  )
}
}
