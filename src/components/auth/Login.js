import React, { useRef } from "react"
import { Link } from "react-router-dom";
import "./Logins.css"


const Login = props => {
    const username = useRef()
    const password = useRef()
 

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return user[0]
                }
                return false
            })
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    localStorage.setItem("digi_student", exists.id)
                    props.history.push("/")
                } else if (exists && exists.password !== password.current.value) {
                    window.alert("Password does not match")
                } else if(!exists){
                  window.alert("User does not exist. Please Register!")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>DigiPlan Login</h1>
                    <h2>Please log-in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username </label>
                        <input ref={username} type="username"
                            id="username"
                            className="form-control"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password"
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Log In
                    </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <div>
                    <Link to="/registerStudent">Student Registration</Link>
                </div>
                <div>
                     <Link to="/registerTeacher">Teacher Registration</Link>
                </div>
            </section>
        </main>
    )
}
export default Login