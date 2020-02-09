// candy card 
import React, { useContext } from "react"
import { PrefixContext } from "../auth/PrefixProvider"


export default ({prefix, subject, tutoringRequest}) => {

  const { prefixes } = useContext(PrefixContext)

  if(tutoringRequest.approved === false ){
      
    return (
      <section className="tutoringRequestPending">
        <h3 className="tutoringRequest__teacher">{prefix.name}.{tutoringRequest.user.lastName}</h3>
        <p className="tutoringRequest__subject">Subject {subject.name}</p>
        <p className="tutoringRequest__date">Date: {tutoringRequest.date}</p>    
        <p className="tutoringRequest__time">Tutoring Time: {tutoringRequest.startTime}-{tutoringRequest.endTime}</p>    
      </section>
    )


  }else {
    return (
      <section className="tutoringRequestAccepted">
        <h3 className="tutoringRequest__teacher">{prefix.name} {tutoringRequest.user.lastName}</h3>
        <p className="tutoringRequest__subject">Subject: {subject.name}</p>    
        <p className="tutoringRequest__date">Date: {tutoringRequest.date}</p>    
        <p className="tutoringRequest__time">Tutoring Time: {tutoringRequest.startTime}-{tutoringRequest.endTime}</p>    
      </section>
    )

  }

}



