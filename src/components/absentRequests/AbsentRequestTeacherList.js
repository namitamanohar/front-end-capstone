// filter through all absent request and filter through them to get matching userId that goes with the localstorage; sent that filtered array to the teacherRequestTeacher.js

import React, { useContext } from "react"
import { AbsentRequestContext } from "./AbsentRequestProvider"
import moment from "moment"
import "./AbsentRequests.css"
import AbsentRequestTeacher from "./AbsentRequestTeacher"


export default () => {
  const { absentRequests } = useContext(AbsentRequestContext)

  
// filter absentRequests by teacher which is the userId property to the teacher that is logged in 
  const activeTeacherAbsentRequests = absentRequests.filter(
    t => {return t.userId === parseInt(localStorage.getItem("digi_student")) }
    ) || {} 
    
    // sorts by date 
    const sortedAbsentRequests = activeTeacherAbsentRequests.sort((a, b) => moment(a.timestamp).valueOf() - moment(b.timestamp).valueOf())



// JSX that that maps the activeTeacherAbsentRequests and sends the indvidiual object to the AbsentRequesTeacher card 
  return (
    <>
      <div className="absences">
      <div className="absentAndTestLogo">
        <h3>Absent Requests</h3>
        <img className="testLogo" src={require ("../images/test.svg")}/> 
      </div>
        <div className="absentRequests">
          {
            activeTeacherAbsentRequests.map(a =>
                <AbsentRequestTeacher key={a.id} absentRequest={a}
                />
                
                )
              }
        </div>
        </div>
    </>
  )

}