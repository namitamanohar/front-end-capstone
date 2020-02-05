  
import React from "react"
import { UserProvider } from "../users/UserProvider"
import { UserTypeProvider } from "../users/UserTypeProvider"
import { PrefixProvider } from "../auth/PrefixProvider"
import { SubjectProvider } from "../auth/SubjectProvider"
import { EventProvider } from "../event/EventProvider"



export default (props) => {
  return (
    <>
      <UserProvider>
        <UserTypeProvider>
          <PrefixProvider>
            <EventProvider>
              <SubjectProvider>
                {props.children}
              </SubjectProvider>
            </EventProvider>
          </PrefixProvider>
        </UserTypeProvider>
      </UserProvider>
    </>
  )
}
