import React, { useContext, useState } from "react"
import "./Events.css"
import { EventContext } from "./EventProvider"
import Event from "./Event"
import moment from "moment"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EventForm from "./EventForm";
import { TutoringRequestContext } from "../tutoringRequests/TutoringRequestProvider"
// put here 



export default (props) => {
    const { events } = useContext(EventContext)

    const { tutoringRequests } = useContext(TutoringRequestContext)

    // empty array to store eventx and approved tutoring Requests

    const eventsAndTutoringRequests = []

    // filter out all the tutoringRequests that correspon with the active User logged in 

    const activeTutoringRequests = tutoringRequests.filter(
        t => {return t.activeUserId === parseInt(localStorage.getItem("digi_student"),10) }
        ) || {} 


// map through the  activeTutoringRequest array push the activeTutoringRquest object that has the approved property true and timestamp true into the eventsAndTutoringRequests array 

     const tutoringRequestAccepted= activeTutoringRequests.map(a => {
           if (a.approved === true && a.hasOwnProperty('timestamp') === true){
           return eventsAndTutoringRequests.push(a) 
        }
      }) || {}

  
    const {
        buttonLabel,
        className
      } = props;
    
      const [modal, setModal] = useState(false);

      const toggle = () => setModal(!modal);
   
// filter the events for the user logged in 
   const activeUserEvents = events.filter(e => 
    {return e.userId === parseInt(localStorage.getItem("digi_student"),10)
   }) || {}

// map through and push the activeuser in the eventsAndTutoringRequests array 
  const eventsActive = activeUserEvents.map(a => {
       eventsAndTutoringRequests.push(a)
   }) || {}


// filter out today's date and upcoming 
   const CurrentEventsAndTutoringRequests = eventsAndTutoringRequests.filter( e => {
       if(moment(e.date).valueOf() + 86400000 > Date.now()){
           return e 
       }
   }) || {}

//sort by date 

   const sortedEventsAndTutoringRequests = CurrentEventsAndTutoringRequests.sort((a, b) => moment(a.date).valueOf() -moment(b.date).valueOf())
    return (
        // maps CurrentEventsAndTutoringRequest and pushes the individiual object to the Event component 
        //  AddEvent Icon button that onClick opens the ModalBody that contains the EventForm component
        <>
    
            <div className="events-Button">
                <div className="events">

                    {
                        CurrentEventsAndTutoringRequests.map(e => {
                            return <Event key={`${e.id}_${e.date}`} event={e} className={className} {...props} setModal={setModal} modal={modal}/>
                        })
                    }
            
            
                <div className="addEvent-button">
                    <img className="addButton" src={require ("./addImage.svg")}
                        onClick={toggle}
                    />                   
                </div>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Time to Plan! </ModalHeader>

                    <ModalBody>
                        <EventForm setModal={setModal} {...props} />
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </div>
            </div>
        </>
    )
}