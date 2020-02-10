// teacher Absent request card if is .approved === false show under pending requests with accepted and delete button if .approved === true than  
// put an accept button: onclick add timestamp and update object accepted: false to true; 
// put a decline button: onlick add timestamp and keep accepted:false

import React, { useContext } from "react"
import moment from "moment"
import { AbsentRequestContext } from "./AbsentRequestProvider"
import { UserContext } from "../users/UserProvider"

export default ({ absentRequest }) => {

  const { updateAbsentRequest } = useContext(AbsentRequestContext)

  const { users } = useContext(UserContext)

  const studentName = users.filter(u => {
    return u.id === absentRequest.activeUserId
  })

  

  const acceptAbsentRequest = () => {
      updateAbsentRequest({
        id:absentRequest.id, 
        approved:true 
      })
  }

  // const declineAbsentRequest = () => {
  //   updateAbsentRequest({
  //     id:absentRequest.id, 
  //     timestamp: Date.now(), 
  //     approved:false,  
  //   })
  // }

  if(absentRequest.approved === false ){
     
    
    return (
      <section className="AbsentRequestPending">
        <h4 className="AbsentRequest__reason">Reason:{absentRequest.title}</h4>
        <p className="AbsentRequest__student">Student Name: {studentName.map(s => {return s.firstName})} {studentName.map(s => {return s.lastName})}</p>
        <p className="AbsentRequest__date">Date of Absence: {moment(absentRequest.date).format("MM/DD/YYYY")}</p>    
        <p className="AbsentRequest__dateOfRequest">Date of Request: {moment(absentRequest.timestamp).format("MM/DD/YYYY")}</p>    
        <p className="AbsentRequest__time">Absent Time: {moment(absentRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(absentRequest.endTime,'HH:mm').format('hh:mm a') }</p> 
        <button className="acceptAbsentRequest"
        onClick = {
          () => {
            acceptAbsentRequest()
          }
        }>Open</button>     
        {/* <button className="declineAbsentRequest"
        onClick ={
          () => {
            declineAbsentRequest()
          }
        }>Decline</button>      */}

      </section>
    )


  }
  // else {
  //   return (
  //     <section className="AbsentRequestAccepted">
  //       <h4 className="AbsentRequest__reason">{AbsentRequest.title}</h4>
  //       <p className="AbsentRequest__student">Student Name: {studentName.map(s => {return s.firstName})} {studentName.map(s => {return s.lastName})}</p>
  //       <p className="AbsentRequest__date">Date: {moment(AbsentRequest.date).format("MM/DD/YYYY")}</p>    
  //       <p className="AbsentRequest__time">Absent Time: {moment(AbsentRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(AbsentRequest.endTime,'HH:mm').format('hh:mm a') }</p>        
  //     </section>
  //   )

  // }

}





