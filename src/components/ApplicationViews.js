import React, { useContext } from "react";
import { Route } from "react-router-dom";
import ProviderProvider from "./provider/ProviderProvider"
import EventList from "./event/EventList"
import TeacherList from "./teachers/TeacherList";
import { UserContext } from "./users/UserProvider";
import TutoringRequestForm from "./tutoringRequests/TutoringRequestForm";
import TutoringRequestStudentList from "./tutoringRequests/TutoringRequestStudentList";
import TutoringRequestTeacherList from "./tutoringRequests/TutoringRequestTeacherList";



export default props =>{
const { users } = useContext(UserContext)
const activeUser = users.find(u => {
  return u.id === parseInt(localStorage.getItem("digi_student"),10)
}) || {}

console.log("activeUseron app views", activeUser)
if(activeUser.prefixId === 0){
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
                
            </ProviderProvider>
      
        </>     
)
}