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


// filter out the tutoringRequest that corresponds with the active user; the property activeUserId corresponds with the student

   const activeTutoringRequests = tutoringRequests.filter(
     t => {return t.activeUserId === parseInt(localStorage.getItem("digi_student"),10) }
   ) || {} 

//  only shows tutoringRequest that are today or upcoming 
   const CurrentTutoringRequests = activeTutoringRequests.filter( e => {
    if(moment(e.date).valueOf() + 86400000 > Date.now()){
        return e 
    }
}) || {}
   
// sort the tutoringRequests by date 
   CurrentTutoringRequests.sort((a, b) => moment(a.date).valueOf() -moment(b.date).valueOf())
   

  return (
    // map through the tutoringRequests and send the tutoringRequest object, prefix of teacher and subject of teacher using the expand method to the TutoringRequestStudent Component 
    <div className="tutoringRequests">
      {
        CurrentTutoringRequests.map(a =>
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