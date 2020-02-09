// teacher tutoring request card if is .approved === false show under pending requests with accepte and delete button if .approved === true than  

import React, { useContext } from "react"
import { PrefixContext } from "../auth/PrefixProvider"


export default ({tutoringRequest}) => {

  console.log("teacher Teacher Tutoring Request", tutoringRequest)

  if(tutoringRequest.approved === false ){
      // const prefixName=prefixes.find( p => {
      //   return p.id === tutoringRequest.user.prefixId
      // } )
    
    return (
      <section className="tutoringRequestPending">
        <h3 className="tutoringRequest__studentName"> {tutoringRequest.user.lastName}</h3>
        <p className="tutoringRequest__price">Date: {tutoringRequest.date}</p>    
        <p className="tutoringRequest__price">Tutoring Time: {tutoringRequest.startTime}-{tutoringRequest.endTime}</p>    
      </section>
    )


  }else {
    return (
      <section className="tutoringRequestAccepted">
        <h3 className="tutoringRequest__Teacher"> {tutoringRequest.user.lastName}</h3>
        <p className="tutoringRequest__price">Date: {tutoringRequest.date}</p>    
        <p className="tutoringRequest__price">Tutoring Time: {tutoringRequest.startTime}-{tutoringRequest.endTime}</p>    
      </section>
    )

  }

}





