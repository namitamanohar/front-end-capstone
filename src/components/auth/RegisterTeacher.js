import React, { useRef, useContext } from "react"
import "./Logins.css"
import { PrefixContext } from "./PrefixProvider"
import { SubjectContext } from "./SubjectProvider"
import { UserTypeContext } from "../users/UserTypeProvider"

const RegisterTeacher = props => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const subject = useRef(0) 
    const prefix = useRef(0) 
    const userType=useRef(0)

    const { prefixes } = useContext(PrefixContext)
    const { subjects } = useContext(SubjectContext)
    const { userTypes } = useContext(UserTypeContext)

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
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
                            userTypeId:  parseInt(userType.current.value),
                            subjectId: parseInt(subject.current.value),
                            prefixId: parseInt(prefix.current.value)
                             
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
                    <label htmlFor="prefix"> Prefix </label>
                    <select
                    defaultValue=""
                    name="prefix"
                    id="prefix"
                    ref={prefix}
                    className="form-control"
                    required
                >
                    <option value="0">Select a prefix</option>
                    {prefixes.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="subject"> Subject You Teach </label>
                    <select
                    defaultValue=""
                    name="subject"
                    id="subject"
                    ref={subject}
                    className="form-control"
                    required
                >
                    <option value="0">Select your subject</option>
                    {subjects.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="userType">Who are you? </label>
                    <select
                    defaultValue=""
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
                    <label htmlFor="inputEmail"> Username </label>
                    <input ref={username} type="username"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        required />
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

export default RegisterTeacher