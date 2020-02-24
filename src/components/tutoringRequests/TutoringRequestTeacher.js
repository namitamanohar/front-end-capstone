// TEACHER VIEW
// teacher tutoring request card if is .approved === false show under pending requests with accepted and delete button if .approved === true than  
// put an accept button: onclick add timestamp and update object accepted: false to true; 
// put a decline button: onlick add timestamp and keep accepted:false

import React, { useContext } from "react"
import { PrefixContext } from "../auth/PrefixProvider"
import moment from "moment"
import { TutoringRequestContext } from "./TutoringRequestProvider"
import { UserContext } from "../users/UserProvider"
import { Card, CardTitle, CardText, CardBody, Row, Col, Button } from 'reactstrap';

import { EventContext } from "../event/EventProvider"

export default ({ tutoringRequest }) => {

  const { updateTutoringRequest } = useContext(TutoringRequestContext)

  // timestamp returns true or false 
  const timestamp = tutoringRequest.hasOwnProperty('timestamp')


  const { users } = useContext(UserContext)

  // filter out studentName 
  const studentName = users.filter(u => {
    return u.id === tutoringRequest.activeUserId
  })

  
 console.log("student Name on teacher page", studentName)
//  onClick the Accept button use the PATCH method to updateTutoringRequest, adds the timestamp, and changes the approved property from false to true 
  const acceptedTutoringRequest = () => {
      updateTutoringRequest({
        id:tutoringRequest.id, 
        timestamp: Date.now(), 
        approved:true 
      })   
  }
// onClick the the Decline button use the DELETE method to delete the corresponding object in the data
  const declinedTutoringRequest = () => {
    updateTutoringRequest({
      id:tutoringRequest.id, 
      timestamp: Date.now(), 
      approved:false,  
    })
  }

  if(tutoringRequest.approved === false && timestamp === false   ){
    // tutoringRequest that as not been Accepted or Declined will display as a card under the main tutoringRequests section 
    return (
      <Card className="tutoringRequestPending">
        <CardBody>
            <CardTitle className="tutoringRequest__reason">{tutoringRequest.title}</CardTitle>
            <CardText className="tutoringRequest__student">Student Name: {studentName.map(s => {return s.firstName})} {studentName.map(s => {return s.lastName})}</CardText>
            <CardText className="tutoringRequest__date">Date: {moment(tutoringRequest.date).format("MM/DD/YYYY")}</CardText>    
            <CardText className="tutoringRequest__time">Tutoring Time: {moment(tutoringRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(tutoringRequest.endTime,'HH:mm').format('hh:mm a') }</CardText> 
            <Button color="secondary" className="acceptTutoringRequest"
            onClick = {
              () => {
                acceptedTutoringRequest()
              }
            }>Accept</Button>     
            <Button color="primary" className="declineTutoringRequest"
            onClick ={
              () => {
                declinedTutoringRequest()
              }
            }>Decline</Button>     
        </CardBody>
      </Card>
    )

  }else if(tutoringRequest.approved === true && timestamp ===true ) {
    // tutoringRequest approved does not display as a card under the main tutoringRequests section 
    return (
     ""
    )

  }else if (tutoringRequest.approved === false && timestamp === true )
  // tutoring Request declined will not display as a card 
  {
    return(
      ""
    )
  }


}





