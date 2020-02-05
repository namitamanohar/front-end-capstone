import React from "react";
import { Route } from "react-router-dom";
import ProviderProvider from "./provider/ProviderProvider"
import EventList from "./event/EventList"



export default props =>{

  return (
    <>
        <ProviderProvider>
          <Route exact path="/" render={props => 
            <EventList {...props} />}
            />


         

        </ProviderProvider>

    </>
  )

}