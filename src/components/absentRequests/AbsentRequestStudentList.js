import React, { useContext } from "react"
import { AbsentRequestContext } from "./AbsentRequestProvider"
import AbsentRequestStudent from "./AbsentRequestStudent"
import "./AbsentRequests.css"
import { PrefixContext } from "../auth/PrefixProvider"
import { SubjectContext } from "../auth/SubjectProvider"


export default () => {
  const { absentRequests } = useContext(AbsentRequestContext)
  const { prefixes } = useContext(PrefixContext)
  const { subjects } = useContext(SubjectContext)

   const activeAbsentRequests = absentRequests.filter(
     t => {return t.activeUserId = parseInt(localStorage.getItem("digi_student"),10) }
   ) || {} 

   
   

  return (

    <div className="AbsentRequests">
      {
        activeAbsentRequests.map(a =>
           <AbsentRequestStudent key={a.id} absentRequest={a}
            prefix ={prefixes.find( p => {
            return p.id === a.user.prefixId
          } )}
            subject = {subjects.find( s => {
              return s.id === a.user.subjectId
            })}
           />)
      }

    </div>
  )

}