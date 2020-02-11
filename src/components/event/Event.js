import React, { useState, useContext } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EventForm from "./EventForm";
import { EventContext } from "./EventProvider";
import moment from "moment";
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';




export default ({ event , className, history }) => {

  const { deleteEvent } = useContext(EventContext)
  console.log("event Object", event)
  // const {
  //   className
  // } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);




  return (

    <Row>
      <Col sm="10">
        <Card body>
          <CardTitle>{event.title}</CardTitle>
          <CardText>Event Type: {event.eventType.name}</CardText>
          <CardText>{moment(event.startTime,'HH:mm').format('hh:mm a') }--{moment(event.endTime,'HH:mm').format('hh:mm a') }</CardText>
          <CardText>Date: {moment(event.date).format("MM/DD/YYYY")}</CardText>
          <Button  color="secondary" onClick={toggle}>Edit </Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
                      <ModalHeader toggle={toggle}>Add New Event</ModalHeader>

                        <ModalBody>
                          <EventForm editMode={true} eventObject={event} />
                        </ModalBody>
                      <ModalFooter>
                    </ModalFooter>
                  </Modal> 
                  <Button  color="primary" 
                  onClick={
                    () => {
                      console.log(event.id, "should be the id")
                      deleteEvent(event.id)
                      
                    }
                  }>Delete </Button>
        </Card>
     </Col>
    </Row>

      // <section className="event">
      //   <h3 className="event__title">{event.title}</h3>
      //   <div className="event__type">Event Type: {event.eventType.name}</div>
      //   <div className="event__date">When: {moment(event.startTime,'HH:mm').format('hh:mm a') }--{moment(event.endTime,'HH:mm').format('hh:mm a') }</div>
      //   <div className="event__date">Date:  {moment(event.date).format("MM/DD/YYYY")}</div>
      // </section>
    
  )
}