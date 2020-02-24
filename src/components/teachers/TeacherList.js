import React, { useContext } from "react"
import { UserContext } from "../users/UserProvider"
import Teacher from "./Teacher"
// import "./Candy.css"


export default (props) => {
  const { users } = useContext(UserContext)

  // filter the teachers from the users 
    const teachers = users.filter(u => {
      if(u.prefixId != 4){
        return u 
      }
    }) || {}

  return (
   
// maps through the teachers array and sends the individual object to the Teacher component
        <div className="teachers">
          {
            teachers.map(t => <Teacher key={t.id} teacher={t} />)
          }

        </div>

   
  )

}