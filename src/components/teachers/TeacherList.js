import React, { useContext } from "react"
import { UserContext } from "../users/UserProvider"
import Teacher from "./Teacher"
// import "./Candy.css"


export default () => {
  const { users } = useContext(UserContext)

    const teachers = users.filter(u => {
      if(u.prefixId != 4){
        return u 
      }
    })

    console.log(teachers)
  

  return (
   

        <div className="teachers">
          {
            teachers.map(t => <Teacher key={t.id} teacher={t}/>)
          }

        </div>

   
  )

}