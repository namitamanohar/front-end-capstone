import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider"
import "./Events.css"
import { EventTypeContext } from "./EventTypeProvider"
import moment from "moment" 

export default (props) => {
    const { addEvent, updateEvent, events } = useContext(EventContext)
    const [event, setEvent] = useState({
        "title":"", 
        "eventTypeId":"", 
        "startTime":"",
        "endTime":"",
        "date":""
    })

// setEvent sets the event state variable to the object; making a event a controlled component 

    const { eventTypes } =useContext(EventTypeContext)
    

    const eventTypeNumber =parseInt(event.eventTypeId)
   
// onChange the input; the setEvent sets the event state variable the object containing the name attribute 

    const handleControlledInputChange = (evt) => {
        const newEvent = Object.assign({}, event)
        newEvent[evt.target.name] = evt.target.value
        console.log("newEvent",newEvent)
        setEvent(newEvent)
    }
// if in editMode find the event to selected to be edited 
    const setDefaults = () => {
        if (props.editMode) {
            const eventId = parseInt(props.eventObject.id)
            const selectedEvent = events.find(e => e.id === eventId) || {}
         setEvent(selectedEvent)
        }
    }

// mounts and updates when events changes 
    useEffect(() => {
        setDefaults()
    }, [events])

    const constructNewEvent = () => {
        if (props.editMode) {
        // use PUT method to edit the selected event 
            updateEvent({
                id: event.id,
                title: event.title,
                userId: parseInt(localStorage.getItem("digi_student"), 10),
                startTime: event.startTime,
                endTime: event.endTime,
                eventTypeId: eventTypeNumber,
                date: event.date
                
            })
               
        } else {
    // use the POST method to add the event 
            addEvent({
                title: event.title,
                startTime: event.startTime,
                endTime: event.endTime,
                eventTypeId: parseInt((eventTypeNumber),10),
                date: event.date,
                userId: parseInt(localStorage.getItem("digi_student"), 10)
            })
            
        }
        }
    

// JSX for the form; if in editMode change the h2 and submit button
    return (
        <form className="EventForm">
            <h2 className="EventForm__title">{props.editMode ? "Edit Event" : "Add Event"}</h2>
            
            <fieldset>
            <div className="form-group">
                <label htmlFor="eventName">Event name</label>
                <input
                    type="text"
                    id="eventName"
                    name="title"
                    value={event.title}
                    required
                    autoFocus
                    className="form-control"
                    placeholder="Event name"
                    proptype="varchar"
                    onChange={handleControlledInputChange}
                    />
            </div>
        </fieldset>

            <fieldset >
            <label htmlFor="eventTypeId">Pick the Type of Event</label>
                    <div className="form-group" > 
                 <select
                    name="eventTypeId"
                    value={event.eventTypeId}
                    className="form-control"
                    onChange={handleControlledInputChange}
                >
                    <option value="0">Select the type of Event</option>
                    {eventTypes.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
                
                </div>
                </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input 
                    type="time" 
                    min="09:00"
                    max="18:00"
                     required
                    id="startTime"
                    name="startTime"
                    value={event.startTime}
                    className="form-control"
                    onChange={handleControlledInputChange}
                    />
            </div>
        </fieldset>
            <fieldset>
            <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <input type="time"
                    min="09:00" 
                    max="18:00" 
                    required
                    id="endTime"
                    name="endTime"
                    value={event.endTime}
                    className="form-control" 
                    onChange={handleControlledInputChange}
                    />
            </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={event.date}
                    required
                    className="form-control"
                    placeholder="Event Date"
                    onChange={handleControlledInputChange}
                    />
            </div>
        </fieldset>
            <button type="submit"  onClick={evt => 
                    {evt.preventDefault() 
                    constructNewEvent()
                    props.setModal(false)
                    }}
                className="btn btn-primary"> {props.editMode ? "Edit Event": "Add Event"} </button>
        </form>
    )
}




