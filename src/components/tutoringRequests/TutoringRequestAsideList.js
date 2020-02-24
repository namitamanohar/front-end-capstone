import React, { useContext } from "react"
import { TutoringRequestContext } from "./TutoringRequestProvider"
import moment from "moment"
import "./TutoringRequests.css"
import TutoringRequestTeacher from "./TutoringRequestTeacher"
import TutoringRequestAside from "./TutoringRequestAside"




export default () => {
  const { tutoringRequests } = useContext(TutoringRequestContext)

// takes all tutoringRequests and filters by the active user--teacher to return the tutoringRequests corresponding to the teacher which is the property userId 

  const activeTeacherTutoringRequests = tutoringRequests.filter(
    t => {return t.userId === parseInt(localStorage.getItem("digi_student")) }
    ) || {} 
    
    // only display tutoring requests that are upcoming or today
    const TeacherTutoringRequests = activeTeacherTutoringRequests.filter( e => {
      if(moment(e.date).valueOf() > Date.now()){
          return e 
      }
  }) || {}
  //  sort by date 
    const sortedTutoringRequests = TeacherTutoringRequests.sort((a, b) => moment(a.date).valueOf() -moment(b.date).valueOf())


  return (
    <>
     
          <div className="tutoringRequestAside">
            {
      // map thorugh the TeacherTutoringRequests and send to the Aside component 
              TeacherTutoringRequests.map(a =>
                  <TutoringRequestAside key={a.id} tutoringRequest={a}
                  />
                  
                  )
                }
        
          </div>
    </>
  )

}