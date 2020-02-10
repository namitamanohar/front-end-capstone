// filter through all tutoring request and filter through them to get matching userId that goes with the localstorage; sent that filtered array to the teacherRequestTeacher.js


import React, { useContext } from "react"
import { TutoringRequestContext } from "./TutoringRequestProvider"

import "./TutoringRequests.css"
import TutoringRequestTeacher from "./TutoringRequestTeacher"
import { UserContext } from "../users/UserProvider"
import TutoringRequestForm from "./TutoringRequestForm"


export default () => {
  const { tutoringRequests } = useContext(TutoringRequestContext)
  const { users } = useContext(UserContext)
  const studentName =[]

  console.log("ALL the tutoring requests", tutoringRequests)

   const activeTeacherTutoringRequests = tutoringRequests.filter(
     t => {return t.userId === parseInt(localStorage.getItem("digi_student")) }
   ) || {} 
   
   
      console.log("active teacher tutoring", activeTeacherTutoringRequests)


   const studentNameArray = activeTeacherTutoringRequests.map(a => {
     return users.filter(u => {
       return u.id === a.activeUserId
     })
   }) || {}

   const studentNames=studentNameArray.map(s => {return s.map(a=>{
    return studentName.push(a)
  })}) || {}


   console.log("studentName PLEASE", studentName)



  return (

    <div className="tutoringRequests">
      {
        activeTeacherTutoringRequests.map(a =>
           <TutoringRequestTeacher key={a.id} tutoringRequest={a}

           />)
          }
          {/* {
            studentName.map(s => 
              <TutoringRequestTeacher key={s.id} student={s}
              />)
          } */}

    </div>
  )

}