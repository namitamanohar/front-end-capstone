import React, { useContext, useState } from "react";
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
import MessageForm from "./messages/MessageForm";
import { MessageContext } from "./messages/MessageProvider";
import { MessageTypeContext } from "./messages/MessageTypeProvider";
import MessageList from "./messages/MessageList";
import TutoringRequestAsideList from "./tutoringRequests/TutoringRequestAsideList";



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
            <h1>Events</h1>
              <div className="eventsPlusTeachers">
                <Route exact path="/" render={props => 
                  <EventList {...props} />}
                  />
                <Route exact path="/" render={props =>
                  <TeacherList {...props}/>}
                  />
              </div>

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

           
              <div className="eventsPlusTeachers">
                <Route exact path="/:tutoringRequestId(\d+)" render={props => 
                  <EventList {...props} />}
                  />
                <Route exact path="/:tutoringRequestId(\d+)" render={props =>
                  <TeacherList {...props}/>}
                  />
              </div>

              <Route
                path="/:tutoringRequestId(\d+)"
                render={props => <TutoringRequestForm {...props} />}
              />
                <Route exact path="/:tutoringRequestId(\d+)" render={props =>
              <TutoringRequestStudentList {...props}/>}
              />
                
            </ProviderProvider>
      
        </>
      )
}else{
  return (
    <>
          
              <ProviderProvider>
                  <div className="tutoringAndAside">

                  <Route exact path ="/" render = { props =>
                  <TutoringRequestTeacherList {...props}/>}
                  />
                  <Route exact path ="/" render = { props =>
                  <TutoringRequestAsideList {...props}/>}
                  />
                  </div>
                  <Route exact path ="/" render = { props =>
                  <AbsentRequestTeacherList {...props}/>}
                  />
                   <Route path="/messageBoard" render={ props =>
                  <MessageForm {...props}/>}
                  />
                   <Route path="/messageBoard" render={ props =>
                  <MessageList {...props}/>}
                  />

                 <Route exact path="/:messageBoardId(\d+)" render={props =>
                  <MessageForm {...props}/>}
                  />  

                <Route exact path="/:messageBoardId(\d+)" render={props =>
                  <MessageList {...props}/>}
                  />  
             
  
              </ProviderProvider>
        
          </>     
  )

}
}