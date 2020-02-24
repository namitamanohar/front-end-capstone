// this the nav bar component; link changes the link to /word
import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import { UserContext } from "../users/UserProvider"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';


export default (props) => {

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const { users } = useContext(UserContext)

// returns the object that corresponds with the user logged in 
  const singleUserObject = users.find(u => 
    {return u.id === parseInt(localStorage.getItem("digi_student"),10)}
  
    ) || {}
    
  if (singleUserObject.prefixId === 4){
// for the student user displays the navBar with Home and Absent Requests 
     return (

  <ul className="navBar">
      <NavbarBrand className="mr-auto">DigiPlan
          <img className="studentLogo" src={require ("../images/students.svg")}/> 
      </NavbarBrand>
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

  // for the teacher shows the Home and Message Board tabs
  return (
    <ul className="navBar">
      <NavbarBrand className="mr-auto">DigiPlan
          <img className="teacherLogo" src={require ("../images/apple.svg")}/> 
      </NavbarBrand>

      <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/messageBoard">Message Board</Link>
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


