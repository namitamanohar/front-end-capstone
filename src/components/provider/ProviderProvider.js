  
import React from "react"
import { UserProvider } from "../users/UserProvider"
import { UserTypeProvider } from "../users/UserTypeProvider"
import { PrefixProvider } from "../auth/PrefixProvider"
import { SubjectProvider } from "../auth/SubjectProvider"
import { EventProvider } from "../event/EventProvider"
import { EventTypeProvider } from "../event/EventTypeProvider"
import { TutoringRequestProvider } from "../tutoringRequests/TutoringRequestProvider"



export default (props) => {
  return (
    <>
      <UserProvider>
        <UserTypeProvider>
          <TutoringRequestProvider>
            <PrefixProvider>
                <EventProvider>
                  <EventTypeProvider>
                  <SubjectProvider>
                  {props.children}
                </SubjectProvider>
                </EventTypeProvider>
            </EventProvider>
          </PrefixProvider>
          </TutoringRequestProvider>
        </UserTypeProvider>
      </UserProvider>
    </>
  )
}
