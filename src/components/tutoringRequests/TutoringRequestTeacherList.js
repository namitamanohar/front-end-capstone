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
    
    
  //   const studentName =[]
   
   
  //  const studentNameArray = activeTeacherTutoringRequests.map(a => {
  //    return users.filter(u => {
  //      return u.id === a.activeUserId
  //     })
  //   }) || {}
    
  //   const studentNames=studentNameArray.map(s => {return s.map(a=>{
  //     return studentName.push(a)
  //   })}) || {}
  //   console.log("studentName PLEASE", studentName)
    
    const sortedTutoringRequests = activeTeacherTutoringRequests.sort((a, b) => moment(a.date).valueOf() -moment(b.date).valueOf())




  return (
    <>
      <div className="tutoring">
            <h3>Tutoring Requests</h3>
          <div className="tutoringRequests">
            {
              activeTeacherTutoringRequests.map(a =>
                  <TutoringRequestTeacher key={a.id} tutoringRequest={a}
                  />
                  
                  )
                }
        
          </div>
    </div>
    </>
  )

}