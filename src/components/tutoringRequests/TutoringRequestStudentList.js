import React, { useContext } from "react"
import { TutoringRequestContext } from "./TutoringRequestProvider"
import TutoringRequestStudent from "./TutoringRequestStudent"
import "./TutoringRequests.css"
import { PrefixContext } from "../auth/PrefixProvider"
import { SubjectContext } from "../auth/SubjectProvider"
import moment from "moment"


export default (props) => {
  const { tutoringRequests } = useContext(TutoringRequestContext)
  const { prefixes } = useContext(PrefixContext)
  const { subjects } = useContext(SubjectContext)

   const activeTutoringRequests = tutoringRequests.filter(
     t => {return t.activeUserId = parseInt(localStorage.getItem("digi_student"),10) }
   ) || {} 

   console.log("SOS", parseInt(localStorage.getItem("digi_student")))
   console.log("activer tutor requests STUDENT", activeTutoringRequests)

   activeTutoringRequests.sort((a, b) => moment(a.date).valueOf() -moment(b.date).valueOf())
   

  return (

    <div className="tutoringRequests">
      {
        activeTutoringRequests.map(a =>
           <TutoringRequestStudent key={a.id} tutoringRequest={a}
            prefix ={prefixes.find( p => {
            return p.id === a.user.prefixId
          } )}
            subject = {subjects.find( s => {
              return s.id === a.user.subjectId
            })} {...props}
           />)
      }

    </div>
  )

}