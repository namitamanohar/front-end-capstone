// this the nav bar component; link changes the link to /word
import React, { useContext } from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import { UserContext } from "../users/UserProvider"




export default (props) => {


  const { users } = useContext(UserContext)
  console.log("ALL THE USERS",users)

  const singleUserObject = users.find(u => 
    {return u.id === parseInt(localStorage.getItem("digi_student"),10)}
  
    ) || {}
    
  if (singleUserObject.prefixId === 0){

    
  return (

    
    <ul className="navBar">
      <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
      </li>
  
      
      <li className="navbar__item">
        <Link className="navbar__link" to="/absentRequests">Absent Request</Link>
      </li>
    
      {
    localStorage.getItem("digi_student")
        ? <li className="navbar__item">
            <Link className="navbar__link"
                to=""
                onClick={e => {
                    e.preventDefault()
                    localStorage.removeItem("digi_student")
                    props.history.push("/")
                }}
            >Logout</Link>
        </li>
        : ""
        }
    
    </ul>
  )


} else{
  return (
    <ul className="navBar">
      <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/message">Message Board</Link>
      </li>
    
      {
    localStorage.getItem("digi_student")
        ? <li className="navbar__item">
            <Link className="navbar__link"
                to=""
                onClick={e => {
                    e.preventDefault()
                    localStorage.removeItem("digi_student")
                    props.history.push("/")
                }}
            >Logout</Link>
        </li>
        : ""
        }
    
    </ul>
  )

}

}



