import React from "react";
import { UserProvider } from "../users/UserProvider";
import { UserTypeProvider } from "../users/UserTypeProvider";
import { PrefixProvider } from "../auth/PrefixProvider";
import { SubjectProvider } from "../auth/SubjectProvider";
import { EventProvider } from "../event/EventProvider";
import { EventTypeProvider } from "../event/EventTypeProvider";
import { TutoringRequestProvider } from "../tutoringRequests/TutoringRequestProvider";
import { AbsentRequestProvider } from "../absentRequests/AbsentRequestProvider";
import { MessageTypeContext } from "../messages/MessageTypeProvider";
import { MessageContext } from "../messages/MessageProvider";

export default props => {
  return (
    <>
      <UserProvider>
        <UserTypeProvider>
          <TutoringRequestProvider>
            <AbsentRequestProvider>
              <PrefixProvider>
                <EventProvider>
                  <EventTypeProvider>
                    {/* <MessageContext> */}
                      {/* <MessageTypeContext> */}
                        <SubjectProvider>
                          {props.children}
                        </SubjectProvider>
                      {/* </MessageTypeContext> */}
                    {/* </MessageContext> */}
                  </EventTypeProvider>
                </EventProvider>
              </PrefixProvider>
            </AbsentRequestProvider>
          </TutoringRequestProvider>
        </UserTypeProvider>
      </UserProvider>
    </>
  );
};
