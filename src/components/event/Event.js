import React, { useState, useContext } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EventForm from "./EventForm";
import { EventContext } from "./EventProvider";
import moment from "moment";
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';




export default ({ event , className  }) => {

  const { deleteEvent } = useContext(EventContext)
  

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);




  return (

    <Row>
      <Col sm="10">
        <Card className="event" body>
          <CardTitle>{event.title}</CardTitle>
          <CardText>Event Type: {event.eventType.name}</CardText>
          <CardText>{moment(event.startTime,'HH:mm').format('hh:mm a') }--{moment(event.endTime,'HH:mm').format('hh:mm a') }</CardText>
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
                    () => {
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