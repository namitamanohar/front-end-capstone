// filter through all tutoring request and filter through them to get matching userId that goes with the localstorage; sent that filtered array to the teacherRequestTeacher.js

import React, { useContext } from "react"
import { TutoringRequestContext } from "./TutoringRequestProvider"

import "./TutoringRequests.css"
import TutoringRequestTeacher from "./TutoringRequestTeacher"


export default () => {
  const { tutoringRequests } = useContext(TutoringRequestContext)

   const activeTeacherTutoringRequests = tutoringRequests.filter(
     t => {return t.userId = parseInt(localStorage.getItem("digi_student")) }
   ) || {} 

   console.log("active teacher tutoring", activeTeacherTutoringRequests)

   

  return (

    <div className="tutoringRequests">
      {
        activeTeacherTutoringRequests.map(a =>
           <TutoringRequestTeacher key={a.id} tutoringRequest={a}
           />)
      }

    </div>
  )

}