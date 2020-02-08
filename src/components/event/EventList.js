import React, { useContext, useState } from "react"
import "./Events.css"
import { EventContext } from "./EventProvider"
import Event from "./Event"

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EventForm from "./EventForm";




export default (props) => {
    const { events } = useContext(EventContext)

    const {
        buttonLabel,
        className
      } = props;
    
      const [modal, setModal] = useState(false);

      const toggle = () => setModal(!modal);
   

   const activerUserEvents = events.filter(e => 
    {return e.userId === parseInt(localStorage.getItem("digi_student"),10)
   })


    return (
        <>
            <h1>Events</h1>
            <div className="events-Button">
                <div className="events">

                    {
                        activerUserEvents.map(e => {
                            return <Event key={e.id} event={e} className={className} {...props}/>
                        })
                    }
            
                </div>
                <div className="addEvent-button">
                    <img className="addButton" src={require ("./addImage.svg")}
                        // onclick here for opening the modal 
                        onClick={toggle}
                    />                   
                </div>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Events </ModalHeader>

                    <ModalBody>
                        <EventForm  {...props} />
                    </ModalBody>
                    <ModalFooter>
                    {/* <Button color="danger" onClick={toggle}>Add Event!</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button> */}
                    </ModalFooter>
                </Modal>
            </div>
        </>
    )
}