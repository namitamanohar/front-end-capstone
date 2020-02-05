import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import DigiPlan from "./components/DigiPlan"


ReactDOM.render(
    <Router>
        <DigiPlan/>
    </Router>
    , document.getElementById("root"))