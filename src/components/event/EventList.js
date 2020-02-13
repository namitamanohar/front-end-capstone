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

    
    const eventsAndTutoringRequests = []
    
    const activeTutoringRequests = tutoringRequests.filter(
        t => {return t.activeUserId = parseInt(localStorage.getItem("digi_student"),10) }
        ) || {} 
        console.log("active tutoring requests", activeTutoringRequests)

     const tutoringRequestAccepted= activeTutoringRequests.filter(a => {
           if (a.approved === true && a.hasOwnProperty('timestamp') === true){
           return eventsAndTutoringRequests.push(a) 
        }
      }) || {}

      console.log("tutoringRequestsAccepted", tutoringRequestAccepted)
  
    const {
        buttonLabel,
        className
      } = props;
    
      const [modal, setModal] = useState(false);

      const toggle = () => setModal(!modal);
   

   const activeUserEvents = events.filter(e => 
    {return e.userId === parseInt(localStorage.getItem("digi_student"),10)
   }) || {}

//    const sortedEvents = activeUserEvents.sort((a, b) => moment(a.date).valueOf() -moment(b.date).valueOf())

  const eventsActive= activeUserEvents.map(a =>{
       eventsAndTutoringRequests.push(a)
   }) || {}


   console.log("eventsAndTutoringRequests",eventsAndTutoringRequests)

   const CurrentEventsAndTutoringRequests = eventsAndTutoringRequests.filter( e => {
       if(moment(e.date).valueOf() > Date.now()){
           return e 
       }
   }) || {}

   const sortedEventsAndTutoringRequests = CurrentEventsAndTutoringRequests.sort((a, b) => moment(a.date).valueOf() -moment(b.date).valueOf())
    return (
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
                    <ModalHeader toggle={toggle}>Events </ModalHeader>

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