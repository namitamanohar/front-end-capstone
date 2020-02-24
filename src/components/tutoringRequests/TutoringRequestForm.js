import React, { useContext, useState, useEffect } from "react"
import { TutoringRequestContext } from "./TutoringRequestProvider"
import "./TutoringRequests.css"
import { UserContext } from "../users/UserProvider"

// STUDENT VIEW 
export default (props) => {
    const { addTutoringRequest, editTutoringRequest, tutoringRequests } = useContext(TutoringRequestContext)
    // useState is used to make the form a controlled component and have the form date stored in the local state variable tutoringRequest
    const [tutoringRequest, setTutoringRequest] = useState({
        "title":"", 
        "userId":"", 
        "startTime":"",
        "endTime":"",
        "date":""
    })

    
// editMode returns either true or false
    const editMode = props.match.params.hasOwnProperty("tutoringRequestId")

// filter the users to return the teachers for the dropdown
    const { users } = useContext(UserContext)
    const teacherArray = users.filter(u => {
      if( u.prefixId != 4 ){
        return u 
      }
    }) || {}

    
//  onchange is triggered by any change in form and sets the state of tutoringRequest to the name attribute of the input as an object 
    const handleControlledInputChange = (evt) => {
     
        const newTutoringRequest = Object.assign({}, tutoringRequest)
        newTutoringRequest[evt.target.name] = evt.target.value
        setTutoringRequest(newTutoringRequest)
    }

// setDefaults runs and if it is in editMode then it will find the tutoring request corresponding the the match.params integer
    const setDefaults = () => {
        if (editMode) {
            const tutoringRequestId = parseInt(props.match.params.tutoringRequestId)
            const selectedTutoringRequest = tutoringRequests.find(t => t.id === tutoringRequestId) || {}
            setTutoringRequest(selectedTutoringRequest)
            console.log("tutoringRequest to know useEffect", selectedTutoringRequest) 

        }
    }

    useEffect(() => {
        setDefaults()
    }, [tutoringRequests])

    const constructNewTutoringRequest = () => {

// if in editMode it will editTutoringRequest using the PUT method
        if (editMode){
            editTutoringRequest({
                id:tutoringRequest.id,
                title: tutoringRequest.title,
                startTime: tutoringRequest.startTime,
                endTime: tutoringRequest.endTime,
                approved:false,
                date: tutoringRequest.date,
                userId: parseInt((tutoringRequest.userId),10),
                activeUserId: parseInt(localStorage.getItem("digi_student"), 10)
            })
            .then(() => props.history.push("/"))
// else it will addTutoringRequest using the POST method
        } else {
            addTutoringRequest({
                title: tutoringRequest.title,
                startTime: tutoringRequest.startTime,
                endTime: tutoringRequest.endTime,
                approved:false,
                date: tutoringRequest.date,
                userId: parseInt((tutoringRequest.userId),10),
                activeUserId: parseInt(localStorage.getItem("digi_student"), 10)
            })
            .then(() => props.history.push("/"))
        } 
        
        }
    
// JSX code that displays the form if in editMode the h2 and submit button will be different

    return (
        <form className="TutoringRequestForm">
            <h2 className="TutoringRequestForm__title">{editMode ? "Edit Tutoring Request" : "Make Tutoring Request"}</h2>
            <fieldset>
            <div className="form-group">
                <label htmlFor="title">Tutoring Reason</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={tutoringRequest.title}
                    required
                    autoFocus
                    className="form-control"
                    placeholder="Tutoring Reason"
                    proptype="varchar"
                    onChange={handleControlledInputChange}
                    />
            </div>
        </fieldset>
            <fieldset>
            <div className="form-group">
                <label htmlFor="TutoringRequestTeacher">Pick the teacher</label>
                <select
                    name="userId"
                    value={tutoringRequest.userId}
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
                    value={tutoringRequest.startTime}
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
                    value={tutoringRequest.endTime}
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
                    value={tutoringRequest.date}
                    required
                    className="form-control"
                    placeholder="Tutoring Request Date"
                    onChange={handleControlledInputChange}
                    />
            </div>
        </fieldset>
            <button type="submit" onClick={evt => 
                    {evt.preventDefault()
                     constructNewTutoringRequest()
                    setTutoringRequest({
                        "title":"", 
                        "userId":"", 
                        "startTime":"",
                        "endTime":"",
                        "date":""
                    })
                    }}
                className="btn btn-primary">{editMode ? "Edit Tutoring Request" : "Add Tutoring Request"}</button>
        </form>
    )
}



