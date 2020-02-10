// pending request: accepted: false and no timestamp false 
// accepted tutoring request has timestamp and accepted:true; should then go to events 
// declined tutoring request has timestamp and accepted: false 
import React, { useContext } from "react"
import { PrefixContext } from "../auth/PrefixProvider"
import moment from "moment"


export default ({prefix, subject, tutoringRequest}) => {

  const { prefixes } = useContext(PrefixContext)

  const timeStamp = tutoringRequest.hasOwnProperty('timestamp')
  
  if(tutoringRequest.approved === false && timeStamp === false ){
      
    return (
      <section className="tutoringRequestPending">
        <h3 className="tutoringRequest__teacher">{prefix.name}.{tutoringRequest.user.lastName}</h3>
        <p className="tutoringRequest__subject">Subject {subject.name}</p>
        <p className="tutoringRequest__title">Reason: {tutoringRequest.title}</p>
        <p className="tutoringRequest__date">Date: {moment(tutoringRequest.date).format("MM/DD/YYYY")}</p>    
        <p className="tutoringRequest__time">Tutoring Time: {moment(tutoringRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(tutoringRequest.endTime,'HH:mm').format('hh:mm a') }</p>       
      </section>
    )

  }else if(tutoringRequest.approved === true && timeStamp === true) {
    return (
      <section className="tutoringRequestAccepted">
        <h3 className="tutoringRequest__teacher">{prefix.name} {tutoringRequest.user.lastName}</h3>
        <p className="tutoringRequest__subject">Subject: {subject.name}</p>
        <p className="tutoringRequest__title">Reason: {tutoringRequest.title}</p>    
        <p className="tutoringRequest__date">Date: {moment(tutoringRequest.date).format("MM/DD/YYYY")}</p>    
        <p className="tutoringRequest__time">Tutoring Time: {moment(tutoringRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(tutoringRequest.endTime,'HH:mm').format('hh:mm a') }</p>    
      </section>
    )

  }else if(tutoringRequest.approved === false && timeStamp === true) {
    return (
      <section className="tutoringRequestDeclined">
        <h3 className="tutoringRequest__teacher">{prefix.name} {tutoringRequest.user.lastName}</h3>
        <p className="tutoringRequest__subject">Subject: {subject.name}</p>
        <p className="tutoringRequest__title">Reason: {tutoringRequest.title}</p>    
        <p className="tutoringRequest__date">Date: {moment(tutoringRequest.date).format("MM/DD/YYYY")}</p>    
        <p className="tutoringRequest__time">Tutoring Time: {moment(tutoringRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(tutoringRequest.endTime,'HH:mm').format('hh:mm a') }</p>    
      </section>
    )

}
}


