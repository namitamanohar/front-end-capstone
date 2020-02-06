import React, { useState, useContext } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EventForm from "./EventForm";
import { EventContext } from "./EventProvider";



export default ({ event , className, history }) => {

  const { deleteEvent } = useContext(EventContext)
  console.log("event Object", event)
  // const {
  //   className
  // } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  return (

      <section className="event">
        <h3 className="event__title">{event.title}</h3>
        <div className="event__type">Event Type: {event.eventType.name}</div>
        <div className="event__date">When: { event.startTime}--{ event.endTime}</div>
        <div className="event__date">Date: { event.date}</div>
        <Button  color="secondary" onClick={toggle}>Edit </Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Add New Event</ModalHeader>

                    <ModalBody>
                
                        <EventForm editMode={true} eventObject={event} />
                        {/*
                        {
                          editMode:{event}
                        }
                        */}
                    </ModalBody>
                    <ModalFooter>
                  </ModalFooter>
                </Modal> 
        <Button  color="primary" 
        onClick={
          () => {
            deleteEvent(event)
            .then(() => {
              history.push("/")
            })
          }
        }>Delete </Button>
      </section>
    
  )
}