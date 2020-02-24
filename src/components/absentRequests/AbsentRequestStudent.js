// pending request: accepted: false and no timestamp false 
// accepted absent request has timestamp and accepted:true; should then go to events 
// declined absent request has timestamp and accepted: false 
import React, { useContext } from "react"
import { PrefixContext } from "../auth/PrefixProvider"
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap';
import moment from "moment"


export default ({prefix, subject, absentRequest}) => {

  const { prefixes } = useContext(PrefixContext)

  const timeStamp = absentRequest.hasOwnProperty('timestamp')
  // absent request cards if false shows as pending 
  if( absentRequest.approved === false  ){
      
    return (
      <div >
        <Card className="absentRequestPending">
          <CardBody>
            <CardTitle className="absentRequest__teacher">{prefix.name}.{absentRequest.user.lastName}</CardTitle>
            <CardText className="absentRequest__subject">Subject {subject.name}</CardText>
            <CardText className="absentRequest__title">Reason: {absentRequest.title}</CardText>
            <CardText className="absentRequest__date">Date: {moment(absentRequest.date).format("MM/DD/YYYY")}</CardText>    
            <CardText className="absentRequest__time">Absent Time: {moment(absentRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(absentRequest.endTime,'HH:mm').format('hh:mm a') }</CardText>       
          </CardBody>
        </Card>
      </div>
        
    )
// absent request card for if it is approved and shows image of classwork
  }else if(absentRequest.approved === true ) {
    return (
      <div>
          <Card className="absentRequestAccepted"> 
            <CardBody>
              <CardTitle className="absentRequest__teacher">{prefix.name} {absentRequest.user.lastName}</CardTitle>
              <CardText className="absentRequest__subject">Subject: {subject.name}</CardText>
              <CardText className="absentRequest__title">Reason: {absentRequest.title}</CardText>    
              <CardText className="absentRequest__date">Date: {moment(absentRequest.date).format("MM/DD/YYYY")}</CardText>    
              <CardText className="absentRequest__time">Absent Time: {moment(absentRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(absentRequest.endTime,'HH:mm').format('hh:mm a') }</CardText>    
              <CardText className="absentRequest__image"> <img className="approvedAbsentImage" src={absentRequest.image} /></CardText>    
            </CardBody>
          </Card>

      </div>
    )


  }
}



