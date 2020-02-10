import React, { useContext } from "react";
import { Route } from "react-router-dom";
import ProviderProvider from "./provider/ProviderProvider"
import EventList from "./event/EventList"
import TeacherList from "./teachers/TeacherList";
import { UserContext } from "./users/UserProvider";
import TutoringRequestForm from "./tutoringRequests/TutoringRequestForm";
import TutoringRequestStudentList from "./tutoringRequests/TutoringRequestStudentList";
import TutoringRequestTeacherList from "./tutoringRequests/TutoringRequestTeacherList";
import AbsentRequestForm from "./absentRequests/AbsentRequestForm";
import AbsentRequestStudentList from "./absentRequests/AbsentRequestStudentList";
import AbsentRequestTeacherList from "./absentRequests/AbsentRequestTeacherList";



export default props =>{
const { users } = useContext(UserContext)
const activeUser = users.find(u => {
  return u.id === parseInt(localStorage.getItem("digi_student"),10)
}) || {}

console.log("activeUseron app views", activeUser)
if(activeUser.prefixId === 4){
      return (
        <>
        
            <ProviderProvider>
              <Route exact path="/" render={props => 
                <EventList {...props} />}
                />
              <Route exact path="/" render={props =>
                <TeacherList {...props}/>}
                />

              <Route exact path="/" render={props =>
              <TutoringRequestForm {...props}/>}
              />
              <Route exact path="/" render={props =>
              <TutoringRequestStudentList {...props}/>}
              />
              <Route exact path="/absentRequests" render={props =>
              <AbsentRequestForm {...props}/>}
              />
              <Route exact path="/absentRequests" render={props =>
              <AbsentRequestStudentList {...props}/>}
              />

          
            </ProviderProvider>
      
        </>
      )
}else
return (
  <>
        
            <ProviderProvider>

                <Route exact path ="/" render = { props =>
                <TutoringRequestTeacherList {...props}/>}
                />
                <Route exact path ="/" render = { props =>
                <AbsentRequestTeacherList {...props}/>}
                />

            </ProviderProvider>
      
        </>     
)
}