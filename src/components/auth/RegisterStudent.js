import React, { useRef, useContext } from "react"
import "./Logins.css"
import { UserTypeContext } from "../users/UserTypeProvider"

const RegisterStudent = props => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const subject = 0 
    const prefix = 0 
    const userType=useRef(0)

    const { userTypes } = useContext(UserTypeContext)

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username${username.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return true
                }
                return false
            })
    }

    const handleRegister = (e) => {
      e.preventDefault()

      if (password.current.value === verifyPassword.current.value) {
          existingUserCheck()
              .then(() => {
                  fetch("http://localhost:8088/users", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        firstName: firstName.current.value,
                        lastName: lastName.current.value,
                        username: username.current.value,
                        password: password.current.value,
                        userTypeId: parseInt(userType.current.value),
                        subjectId: subject,
                        prefixId: prefix                        
                    })
                  })
                      .then(_ => _.json())
                      .then(createdUser => {
                          if (createdUser.hasOwnProperty("id")) {
                              localStorage.setItem("digi_student", createdUser.id)
                              props.history.push("/")
                          }
                      })
              })
      } else {
          window.alert("Passwords do not match")
      }
  }
    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for DigiPlan</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First name"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last name"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputusername"> Username </label>
                    <input ref={username} type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="userType">Who are you? </label>
                    <select
                    name="userType"
                    id="userType"
                    ref={userType}
                    className="form-control"
                    required
                >
                    <option value="0">Select one below</option>
                    {userTypes.map(u => (
                        <option key={u.id} value={u.id}>
                            {u.name}
                        </option>
                    ))}
                </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </fieldset>
                <fieldset>
                    <button type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
        </main>
    )
}

export default RegisterStudent