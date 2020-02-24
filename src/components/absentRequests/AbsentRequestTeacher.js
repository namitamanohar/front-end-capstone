// teacher Absent request card if is .approved === false show under pending requests with accepted and delete button if .approved === true than  
// put an accept button: onclick add timestamp and update object accepted: false to true; 
// put a decline button: onlick add timestamp and keep accepted:false

import React, { useContext, useState } from "react"
import { Card, CardTitle, CardText, CardBody, Row, Col, Button } from 'reactstrap';

import moment from "moment"
import { AbsentRequestContext } from "./AbsentRequestProvider"
import { UserContext } from "../users/UserProvider"

export default ({ absentRequest }) => {

  const [ image, setImage ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const { updateAbsentRequest } = useContext(AbsentRequestContext)

  const { users } = useContext(UserContext)

  const studentName = users.filter(u => {
    return u.id === absentRequest.activeUserId
  })

  // adds the image selected from files to cloudinary 
  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'absentWork')
    setLoading(true)
    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/dcslabgkk/image/upload',
      {
        method:'POST', 
        body: data
      }
    )
    const file = await res.json()
    setImage(file.secure_url)
    setLoading(false)

   
  }
// do a patch and add the image:image 
const addAbsentWorkImage = () => {
  updateAbsentRequest({
    id: absentRequest.id, 
    image:image, 
    approved:true
  })
}
  
  if(absentRequest.approved === false ){
     
    return (
// card on teacher view for if the property approved is false then shows as pending 
      <Card className="absentRequestPending">
        <CardBody>
        <CardTitle className="AbsentRequest__reason">Reason:{absentRequest.title}</CardTitle>
        <CardText className="AbsentRequest__student">Student Name: {studentName.map(s => {return s.firstName})} {studentName.map(s => {return s.lastName})}</CardText>
        <CardText className="AbsentRequest__date">Date of Absence: {moment(absentRequest.date).format("MM/DD/YYYY")}</CardText>    
        <CardText className="AbsentRequest__dateOfRequest">Date of Request: {moment(absentRequest.timestamp).format("MM/DD/YYYY")}</CardText>    
        <CardText className="AbsentRequest__time">Absent Time: {moment(absentRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(absentRequest.endTime,'HH:mm').format('hh:mm a') }</CardText> 
        <div><label>Open to attach missing work:</label></div>
        <input type="file"
             name="file"
            placeholder="Upload an image"
            onChange={uploadImage}
            // onChange the input type file runs the uploadImage function that allows you to add an image using cloudinary 
            />  
            {loading ? (
              <h3>Loading...</h3>
               ): ( 
                 <img src={image} style={{width: '300px'}}
                 
                /> )
                } 
                <div>
                  
                  <Button type="submit" color="primary" onClick={evt => 
                              {evt.preventDefault() 
            // onClick the Send Work runs addAbsentWorkImage which patches the object and adds the image 
                              addAbsentWorkImage()
                              }}>Send Work</Button>
                </div>
          </CardBody>
      </Card>
    )

// if the absent request has been approved it no longer shows 
  }
  else {
    return (
     ""
    )

  }

}





