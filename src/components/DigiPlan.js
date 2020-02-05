import React from "react"
import { Route, Redirect } from "react-router-dom"
import ApplicationViews from "./ApplicationViews"
import NavBar from "./nav/NavBar"
import Login from "./auth/Login"
import "./DigiPlan.css"
import RegisterTeacher from "./auth/RegisterTeacher"
import RegisterStudent from "./auth/RegisterStudent"
import ProviderProvider from "./provider/ProviderProvider"

// conditional reendering here maybe
export default () => (
    <>
    <ProviderProvider>
        <Route render={() => {
            if (localStorage.getItem("digi_student")) {
                return (
                    <>
                   

                        <Route render={props => <NavBar {...props} />} />
                        <Route render={props => <ApplicationViews {...props} />} />
                    
                    </>
                )
            } else {
                
                return(
                  <>
                  <ProviderProvider>
                    <Redirect to="/login" />
                  </ProviderProvider>
                  </>
                )
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/registerTeacher" render={props => <RegisterTeacher {...props} />} />
        <Route path="/registerStudent" render={props => <RegisterStudent {...props} />} />
        </ProviderProvider>
    </>
)