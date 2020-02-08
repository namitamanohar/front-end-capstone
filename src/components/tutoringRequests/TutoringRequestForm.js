import React, { useContext, useState, useEffect } from "react"
import { TutoringRequestContext } from "./TutoringRequestProvider"
import "./TutoringRequests.css"

import { UserContext } from "../users/UserProvider"

export default (props) => {
    const { addTutoringRequest, updateTutoringRequest, TutoringRequests } = useContext(TutoringRequestContext)
    const [TutoringRequest, setTutoringRequest] = useState({})
    

    const { users } = useContext(UserContext)

    const teacherArray = users.filter(u => {
      if( u.prefixId > 0 ){
        return u 
      }
    })

    

    const handleControlledInputChange = (evt) => {
     
        const newTutoringRequest = Object.assign({}, TutoringRequest)
        newTutoringRequest[evt.target.name] = evt.target.value
        setTutoringRequest(newTutoringRequest)
        console.log("tutoring Request to see id", TutoringRequest)
    }

    

    const constructNewTutoringRequest = () => {
         
            addTutoringRequest({
      
                startTime: TutoringRequest.startTime,
                endTime: TutoringRequest.endTime,
                approved:false,
                date: TutoringRequest.TutoringRequestDate,
                userId: parseInt((TutoringRequest.teacher),10),
                activeUserId: parseInt(localStorage.getItem("digi_student"), 10)
            })
            
        
        }
    


    return (
        <form className="TutoringRequestForm">
            <h2 className="TutoringRequestForm__title">Make Tutoring Request</h2>
            
            <fieldset>
            <div className="form-group">
                <label htmlFor="TutoringRequestTeacher">Pick the teacher</label>
                <select
                    name="teacher"
                    value={TutoringRequest.teacher}
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
                    defaultValue={TutoringRequest.startTime}
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
                    defaultValue={TutoringRequest.endTime}
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
                    id="TutoringRequestDate"
                    name="TutoringRequestDate"
                    value={TutoringRequest.date}
                    required
                    className="form-control"
                    placeholder="TutoringRequest Date"
                    onChange={handleControlledInputChange}
                    />
            </div>
        </fieldset>
            <button type="submit" onClick={evt => 
                    {evt.preventDefault() 
                    constructNewTutoringRequest()
                    }}
                className="btn btn-primary"> Add Tutoring Request</button>
        </form>
    )
}



