import React, { useContext, useState, useEffect } from "react"
import { AbsentRequestContext } from "./AbsentRequestProvider"
import "./AbsentRequests.css"
import { UserContext } from "../users/UserProvider"

export default (props) => {
    const { addAbsentRequest } = useContext(AbsentRequestContext)
    const [absentRequest, setAbsentRequest] = useState({})
    
    // useState to make the absentRequest form a controlled component; the absentRequest state variable is set by setAbsentRequest 

    const { users } = useContext(UserContext)

    const teacherArray = users.filter(u => {
      if( u.prefixId != 4 ){
        return u 
      }
    })

    // onChange sets the state variable absentRequest to the object that contains value from the name attribute on the input 
    const handleControlledInputChange = (evt) => {
     
        const newAbsentRequest = Object.assign({}, absentRequest)
        newAbsentRequest[evt.target.name] = evt.target.value
        setAbsentRequest(newAbsentRequest)
        
    }

    
    const constructNewAbsentRequest = () => {
        // POST method on that adds an absentRequest  
            addAbsentRequest({
                title: absentRequest.title,              
                approved:false,
                date: absentRequest.AbsentRequestDate,
                startTime:absentRequest.startTime, 
                endTime:absentRequest.endTime,
                timestamp:Date.now(),
                userId: parseInt((absentRequest.teacher),10),
                activeUserId: parseInt(localStorage.getItem("digi_student"), 10)
            })
            
        
        }
    

// JSX to display the absentRequestForm 
    return (
        <form className="AbsentRequestForm">
            <h2 className="AbsentRequestForm__title">Make An Absent Request</h2>
            <fieldset>
            <div className="form-group">
                <label htmlFor="title">Reason for Absence</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={absentRequest.title}
                    required
                    autoFocus
                    className="form-control"
                    placeholder="Reason for Absence"
                    proptype="varchar"
                    onChange={handleControlledInputChange}
                    />
            </div>
        </fieldset>
            <fieldset>
            <div className="form-group">
                <label htmlFor="AbsentRequestTeacher">Pick the teacher</label>
                <select
                    name="teacher"
                    value={absentRequest.teacher}
                    className="form-control"
                    onChange={handleControlledInputChange}
                >
                    <option value="0">Select the teacher</option>
                    {teacherArray.map(t => (
                        <option key={t.id} value={t.id}>
                            {t.prefix.name}.{t.lastName}
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
                    defaultValue={absentRequest.startTime}
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
                    defaultValue={absentRequest.endTime}
                    className="form-control" 
                    onChange={handleControlledInputChange}
                    />
            </div>
            </fieldset>

            <fieldset>
            <div className="form-group">
                <label htmlFor="date">Date of Absence: Past or Present?</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={absentRequest.date}
                    required
                    className="form-control"
                    placeholder="AbsentRequest Date"
                    onChange={handleControlledInputChange}
                    />
            </div>
        </fieldset>
            <button type="submit" onClick={evt => 
                    {evt.preventDefault() 
                    constructNewAbsentRequest()
                    }}
                className="btn btn-primary"> Add Absent Request</button>
        </form>
    )
}



