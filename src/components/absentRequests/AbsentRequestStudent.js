// pending request: accepted: false and no timestamp false 
// accepted absent request has timestamp and accepted:true; should then go to events 
// declined absent request has timestamp and accepted: false 
import React, { useContext } from "react"
import { PrefixContext } from "../auth/PrefixProvider"
import moment from "moment"


export default ({prefix, subject, absentRequest}) => {

  const { prefixes } = useContext(PrefixContext)

  const timeStamp = absentRequest.hasOwnProperty('timestamp')
  
  if( absentRequest.approved === false  ){
      
    return (
      <section className="absentRequestPending">
        <h3 className="absentRequest__teacher">{prefix.name}.{absentRequest.user.lastName}</h3>
        <p className="absentRequest__subject">Subject {subject.name}</p>
        <p className="absentRequest__title">Reason: {absentRequest.title}</p>
        <p className="absentRequest__date">Date: {moment(absentRequest.date).format("MM/DD/YYYY")}</p>    
        <p className="absentRequest__time">Absent Time: {moment(absentRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(absentRequest.endTime,'HH:mm').format('hh:mm a') }</p>       
      </section>
    )

  }else if(absentRequest.approved === true ) {
    return (
      <section className="absentRequestAccepted"> 
        <h3 className="absentRequest__teacher">{prefix.name} {absentRequest.user.lastName}</h3>
        <p className="absentRequest__subject">Subject: {subject.name}</p>
        <p className="absentRequest__title">Reason: {absentRequest.title}</p>    
        <p className="absentRequest__date">Date: {moment(absentRequest.date).format("MM/DD/YYYY")}</p>    
        <p className="absentRequest__time">Absent Time: {moment(absentRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(absentRequest.endTime,'HH:mm').format('hh:mm a') }</p>    
        <p className="absentRequest__image"> <img src={absentRequest.image}/></p>    
      </section>
    )

  }
}

//   else if(absentRequest.approved === false && timeStamp === true) {
//     return (
//       <section className="absentRequestDeclined">
//         <h3 className="absentRequest__teacher">{prefix.name} {absentRequest.user.lastName}</h3>
//         <p className="absentRequest__subject">Subject: {subject.name}</p>
//         <p className="absentRequest__title">Reason: {absentRequest.title}</p>    
//         <p className="absentRequest__date">Date: {moment(absentRequest.date).format("MM/DD/YYYY")}</p>    
//         <p className="absentRequest__time">absent Time: {moment(absentRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(absentRequest.endTime,'HH:mm').format('hh:mm a') }</p>    
//       </section>
//     )

// }

