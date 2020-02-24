// STUDENT VIEW 
// pending request: accepted: false and no timestamp false 
// accepted tutoring request has timestamp and accepted:true; should then go to events 
// declined tutoring request has timestamp and accepted: false 
import React, { useContext } from "react"
import { PrefixContext } from "../auth/PrefixProvider"
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import moment from "moment"
import { TutoringRequestContext } from "./TutoringRequestProvider"


export default ({prefix, subject, tutoringRequest, history}) => {

  const { prefixes } = useContext(PrefixContext)

  const { deleteTutoringRequest } = useContext(TutoringRequestContext)

  // timeStamp returns either true or false 
  const timeStamp = tutoringRequest.hasOwnProperty('timestamp')
  
  
  if(tutoringRequest.approved === false && timeStamp === false ){
      // the tutoringRequest has an approved property false and timeStamp false 
    return (
      <div>
        <Card className="tutoringRequestPending">
          <CardBody >
            <CardTitle className="tutoringRequest__title">Reason: {tutoringRequest.title}</CardTitle>
            <CardText className="tutoringRequest__teacer">Teacher: {prefix.name}.{tutoringRequest.user.lastName} </CardText >
            <CardText className="tutoringRequest__subject">Subject: {subject.name}</CardText>
            <CardText className="tutoringRequest__date">Date: {moment(tutoringRequest.date).format("MM/DD/YYYY")}</CardText>
            <CardText className="tutoringRequest__time">Tutoring Time: {moment(tutoringRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(tutoringRequest.endTime,'HH:mm').format('hh:mm a') }</CardText>  
            <Button color="secondary"  
        onClick={
          () => {
            history.push(`/${tutoringRequest.id}`)
          }
        }>Edit</Button>     
          <Button color="primary" onClick={() => {
            // deleteTutoringRequest uses DELETE method to delete the object in the provider 
                      deleteTutoringRequest(tutoringRequest)
                      .then(() => {
                          history.push("/")            
                      })
                  }}>Delete</Button> 
          </CardBody>
        </Card>
      </div>
    );
  

  }else if(tutoringRequest.approved === true && timeStamp === true) {
    // accepted tutoringRequest are displayed with the events so is returned as an empty string here 
    return (
      ""
    
    )

  }else if(tutoringRequest.approved === false && timeStamp === true) {
    return (
    // this is for declined tutoringRequest that have an approved property false and timeStamp true 
  <Card className="tutoringRequestDeclined">
        <CardBody >
          <CardTitle className="tutoringRequest__title">Reason: {tutoringRequest.title}</CardTitle>
          <CardText className="tutoringRequest__teacer">{prefix.name}.{tutoringRequest.user.lastName} </CardText >
          <CardText className="tutoringRequest__subject">Subject {subject.name}</CardText>
          <CardText className="tutoringRequest__date">Date: {moment(tutoringRequest.date).format("MM/DD/YYYY")}</CardText>
          <CardText className="tutoringRequest__time">Tutoring Time: {moment(tutoringRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(tutoringRequest.endTime,'HH:mm').format('hh:mm a') }</CardText>  
        </CardBody>
      </Card>
    )

}
}


