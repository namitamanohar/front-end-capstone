import React from "react"


export default ({ event }) => {

  return (

      <section className="event">
        <h3 className="event__title">{event.title}</h3>
        <div className="event__type">Event Type: {event.eventType.name}</div>
        <div className="event__date">Date: {event.date}</div>
      </section>
    
  )
}