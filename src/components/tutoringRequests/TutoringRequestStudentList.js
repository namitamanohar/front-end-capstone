import React, { useContext } from "react"
import { TutoringRequestContext } from "./TutoringRequestProvider"
import TutoringRequestStudent from "./TutoringRequestStudent"
import "./TutoringRequests.css"


export default () => {
  const { tutoringRequests } = useContext(TutoringRequestContext)

   const activeTutoringRequests = tutoringRequests.filter(
     t => {return t.activeUserId = parseInt(localStorage.getItem("digi_student"),10) }
   ) || {} 


   

  return (

    <div className="tutoringRequests">
      {
        activeTutoringRequests.map(a =>
           <TutoringRequestStudent key={a.id} tutoringRequest={a}
           />)
      }

    </div>
  )

}