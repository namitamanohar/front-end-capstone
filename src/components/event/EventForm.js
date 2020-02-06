import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider"
import "./Events.css"
import { EventTypeContext } from "./EventTypeProvider"

export default (props) => {
    const { addEvent, updateEvent, events } = useContext(EventContext)
    const [event, setEvent] = useState({})
    const { eventTypes } =useContext(EventTypeContext)
    
    console.log(props.eventObject)
    // const editMode = props.match.params.hasOwnProperty("eventId")

    const eventTypeNumber =parseInt(event.eventTypeId)
    console.log(eventTypeNumber)

    const handleControlledInputChange = (evt) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEvent = Object.assign({}, event)
        newEvent[evt.target.name] = evt.target.value
        console.log(newEvent)
        setEvent(newEvent)
    }

    const setDefaults = () => {
        if (props.editMode) {
            const eventId = parseInt(props.eventObject.id)
            const selectedEvent = events.find(e => e.id === eventId) || {}
            setEvent(selectedEvent)
            console.log(selectedEvent)
        
        }
    }

    useEffect(() => {
        setDefaults()
    }, [events])

    const constructNewEvent = () => {
        if (props.editMode) {
            updateEvent({
                id: event.id,
                title: event.title,
                userId: parseInt(localStorage.getItem("digi_student"), 10),
                startTime: event.startTime,
                endTime: event.endTime,
                eventTypeId: eventTypeNumber,
                date: event.eventDate
                
            })
               
        } else {
            addEvent({
                title: event.title,
                startTime: event.startTime,
                endTime: event.endTime,
                eventTypeId: parseInt((eventTypeNumber),10),
                date: event.eventDate,
                userId: parseInt(localStorage.getItem("digi_student"), 10)
            })
            
        }
        }
    


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
                    defaultValue={event.title}
                    required
                    autoFocus
                    className="form-control"
                    placeholder="Event name"
                    proptype="varchar"
                    onChange={handleControlledInputChange}
                    />
            </div>
        </fieldset>

            <fieldset>
                    <div className="form-group">
                <label htmlFor="eventTypeId">Pick the Type of Event</label>
                <select
                    
                    name="eventTypeId"
                    defaultValue={event.eventTypeId}
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
                    defaultValue={event.startTime}
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
                    defaultValue={event.endTime}
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
                    id="eventDate"
                    name="eventDate"
                    defaultValue={event.eventDate}
                    required
                    className="form-control"
                    placeholder="Event Date"
                    onChange={handleControlledInputChange}
                    />
            </div>
        </fieldset>
            <button type="submit" onClick={evt => 
                    {evt.preventDefault() 
                    constructNewEvent()
                    }}
                className="btn btn-primary"> {props.editMode ? "Edit Event": "Add Event"} </button>
        </form>
    )
}