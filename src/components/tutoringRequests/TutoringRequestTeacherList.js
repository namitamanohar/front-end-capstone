// filter through all tutoring request and filter through them to get matching userId that goes with the localstorage; sent that filtered array to the teacherRequestTeacher.js


import React, { useContext } from "react"
import { TutoringRequestContext } from "./TutoringRequestProvider"
import moment from "moment"
import "./TutoringRequests.css"
import TutoringRequestTeacher from "./TutoringRequestTeacher"




export default () => {
  const { tutoringRequests } = useContext(TutoringRequestContext)

  
  console.log("ALL the tutoring requests", tutoringRequests)
  
  const activeTeacherTutoringRequests = tutoringRequests.filter(
    t => {return t.userId === parseInt(localStorage.getItem("digi_student")) }
    ) || {} 
    
    const CurrentTutoringRequests = activeTeacherTutoringRequests.filter( e => {
      if(moment(e.date).valueOf() > Date.now()){
          return e 
      }
  }) || {}

 
    
    const sortedTutoringRequests = CurrentTutoringRequests.sort((a, b) => moment(a.date).valueOf() -moment(b.date).valueOf())




  return (
    <>
      <div className="tutoring">
        <div className="tutoringAndTutorLogo">
            <h3>Tutoring Requests</h3>
            <img className="tutorLogo" src={require ("../images/tutor.svg")}/> 
        </div>
          <div className="tutoringRequests">
            {
              CurrentTutoringRequests.map(a =>
                  <TutoringRequestTeacher key={a.id} tutoringRequest={a}
                  />
                  
                  )
                }
        
          </div>
    </div>
    </>
  )

}