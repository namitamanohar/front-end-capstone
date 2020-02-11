// teacher Absent request card if is .approved === false show under pending requests with accepted and delete button if .approved === true than  
// put an accept button: onclick add timestamp and update object accepted: false to true; 
// put a decline button: onlick add timestamp and keep accepted:false

import React, { useContext, useState } from "react"
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
      <section className="absentRequestPending">
        <h4 className="AbsentRequest__reason">Reason:{absentRequest.title}</h4>
        <p className="AbsentRequest__student">Student Name: {studentName.map(s => {return s.firstName})} {studentName.map(s => {return s.lastName})}</p>
        <p className="AbsentRequest__date">Date of Absence: {moment(absentRequest.date).format("MM/DD/YYYY")}</p>    
        <p className="AbsentRequest__dateOfRequest">Date of Request: {moment(absentRequest.timestamp).format("MM/DD/YYYY")}</p>    
        <p className="AbsentRequest__time">Absent Time: {moment(absentRequest.startTime,'HH:mm').format('hh:mm a') }--{moment(absentRequest.endTime,'HH:mm').format('hh:mm a') }</p> 
        <div><label>Open to attach missing work:</label></div>
        <input type="file"
             name="file"
            placeholder="Upload an image"
            onChange={uploadImage}
            />  
            {loading ? (
              <h3>Loading...</h3>
               ): ( 
                 <img src={image} style={{width: '300px'}}
                 
                /> )
                } 
                <div>
                  <button type="submit" onClick={evt => 
                              {evt.preventDefault() 
                              addAbsentWorkImage()
                              }}>Send Work</button>
                </div>
      </section>
    )


  }
  else {
    return (
     ""
    )

  }

}





