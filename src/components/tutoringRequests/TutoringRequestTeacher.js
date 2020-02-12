// teacher tutoring request card if is .approved === false show under pending requests with accepted and delete button if .approved === true than  
// put an accept button: onclick add timestamp and update object accepted: false to true; 
// put a decline button: onlick add timestamp and keep accepted:false

import React, { useContext } from "react"
import { PrefixContext } from "../auth/PrefixProvider"
import moment from "moment"
import { TutoringRequestContext } from "./TutoringRequestProvider"
import { UserContext } from "../users/UserProvider"
import { EventContext } from "../event/EventProvider"

export default ({ tutoringRequest }) => {

  const { updateTutoringRequest } = useContext(TutoringRequestContext)

  const timestamp = tutoringRequest.hasOwnProperty('timestamp')


  const { users } = useContext(UserContext)

  const studentName = users.filter(u => {
    return u.id === tutoringRequest.activeUserId
  })

  
 console.log("student Name on teacher page", studentName)
  const acceptedTutoringRequest = () => {
      updateTutoringRequest({
        id:tutoringRequest.id, 
        timestamp: Date.now(), 
        approved:true 
      })

    
      
  }

  const declinedTutoringRequest = () => {
    updateTutoringRequest({
      id:tutoringRequest.id, 
      timestamp: Date.now(), 
      approved:false,  
    })
  }

  if(tutoringRequest.approved === false && timestamp === false   ){
     
    
    return (
      <section className="tutoringRequestPending">
        <h4 className="tutoringRequest__reason">Reason:{tutoringRequest.title}</h4>
        <p className="tutoringRequest__student">Student Name: {studentName.map(s => {return s.firstName})} {studentName.map(s => {return s.lastName})}</p>
        <p className="tutoringRequest__date">Date: {moment(tutoringRequest.date).format("MM/DD/YYYY")}</p>    
        <p className="tutoringRequest__time">Tutoring Time: {moment(tutoringRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(tutoringRequest.endTime,'HH:mm').format('hh:mm a') }</p> 
        <button className="acceptTutoringRequest"
        onClick = {
          () => {
            acceptedTutoringRequest()
          }
        }>Accept</button>     
        <button className="declineTutoringRequest"
        onClick ={
          () => {
            declinedTutoringRequest()
          }
        }>Decline</button>     

      </section>
    )

  }else if(tutoringRequest.approved === true && timestamp ===true ) {
    return (
      <section className="tutoringRequestAccepted">
        <h4 className="tutoringRequest__reason">{tutoringRequest.title}</h4>
        <p className="tutoringRequest__student">Student Name: {studentName.map(s => {return s.firstName})} {studentName.map(s => {return s.lastName})}</p>
        <p className="tutoringRequest__date">Date: {moment(tutoringRequest.date).format("MM/DD/YYYY")}</p>    
        <p className="tutoringRequest__time">Tutoring Time: {moment(tutoringRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(tutoringRequest.endTime,'HH:mm').format('hh:mm a') }</p>        
      </section>
    )

  }else if (tutoringRequest.approved === false && timestamp === true ){
    return(
      ""
    )
  }


}





