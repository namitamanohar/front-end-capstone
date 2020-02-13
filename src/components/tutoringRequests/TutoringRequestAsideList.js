import React, { useContext } from "react"
import { TutoringRequestContext } from "./TutoringRequestProvider"
import moment from "moment"
import "./TutoringRequests.css"
import TutoringRequestTeacher from "./TutoringRequestTeacher"
import TutoringRequestAside from "./TutoringRequestAside"




export default () => {
  const { tutoringRequests } = useContext(TutoringRequestContext)


  const activeTeacherTutoringRequests = tutoringRequests.filter(
    t => {return t.userId === parseInt(localStorage.getItem("digi_student")) }
    ) || {} 
    
   
    
    const sortedTutoringRequests = activeTeacherTutoringRequests.sort((a, b) => moment(a.date).valueOf() -moment(b.date).valueOf())


  return (
    <>
     
          <div className="tutoringRequestAside">
            {
              activeTeacherTutoringRequests.map(a =>
                  <TutoringRequestAside key={a.id} tutoringRequest={a}
                  />
                  
                  )
                }
        
          </div>
    </>
  )

}