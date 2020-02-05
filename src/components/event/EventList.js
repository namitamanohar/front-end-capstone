import React, { useContext } from "react"

import "./Events.css"
import { EventContext } from "./EventProvider"
import Event from "./Event"



export default (props) => {
    const { events } = useContext(EventContext)
   

   const activerUserEvents = events.filter(e => 
    {return e.userId === parseInt(localStorage.getItem("digi_student"),10)
   })


    return (
        <>
            <h1>Events</h1>
            <div className="events">

                {
                    activerUserEvents.map(e => {
                        return <Event key={e.id} event={e} />
                    })
                }
           
            </div>
        </>
    )
}