import React, { useState } from 'react'
import "./SignUp.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { isValid, isValidEmail } from '../validations/validators'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"



export const SignUp = () => {
    const [formData, setFormData] = useState({
        fname: "", lname: "", email: "", password: ""
    })

    const [toggle, setToggel] = useState(true)
    const [errors, setErrors] = useState({})
    const [serverErrors, setServerErrors] = useState({})

    const navigate = useNavigate()

    function fromHandler(event) {
        const { name, value, type, checked } = event.target
        setFormData((preState) => {
            return {
                ...preState,
                [name]: type === "checkbox" ? checked : value
            }
        })

        setErrors(((preState) => {
            return {
                ...preState,
                [name]: ""
            }
        }))
    }

    async function submitHandler(event) {

        try {
            event.preventDefault()

            const { fname, lname, email, password } = formData

            const credentials = { fname, lname, email, password }

            const errs = {}

            if (!isValid(credentials.fname)) {
                errs.fname = `please fill the First Name column`
            }

            if (!isValid(credentials.lname)) {
                errs.lname = `please fill the Last Name column`
            }

            if (!isValid(credentials.email)) {
                errs.email = `please fill the email column`
            } else {
                if (!isValidEmail(credentials.email)) {
                    errs.email = `invalid emailId`
                }
            }

            if (!isValid(credentials.password)) {
                errs.password = `please fill the password column`
            }

            setErrors(errs)

            if (Object.keys(errs).length === 0) {
                const options = {
                    url: "https://ecomzy-backend.onrender.com/createUser",
                    method: "POST",
                    data: formData
                }
                const doc = await axios(options)
                console.log(doc)
                navigate("/login")
            }
        }
        catch (err) {
            const errs = {}
            errs.message = err.response.data.msg
            setServerErrors(errs)
        }
    }

    return (
        <div className='mainCon'>
            <div className='signupcontainer'>
                <form className="container" onSubmit={submitHandler}>
                    <label>
                        <p>First Name:</p>
                        <input type='text' name='fname' value={formData.fname} onChange={fromHandler} />
                        <div className='errBlock'>
                            {(errors.fname) ? <p> {errors.fname}</p> : null}
                        </div>
                    </label>
                    <label>
                        <p>Last Name:</p>
                        <input type='text' name='lname' value={formData.lname} onChange={fromHandler} />
                        <div className='errBlock'>
                            {(errors.lname) ? <p> {errors.lname}</p> : null}
                        </div>
                    </label>
                    <label>
                        <p>Email:</p>
                        <input type='email' name='email' value={formData.email} onChange={fromHandler} />
                        <div className='errBlock'>
                            {(errors.email) ? <p> {errors.email}</p> : null}
                        </div>
                    </label>
                    <label id='passwordBlock'>
                        <p>password:</p>
                        <input type={toggle ? "password" : "text"} name='password' value={formData.password} onChange={fromHandler} />
                        <div id='icon'>
                            {toggle ? <AiFillEye onClick={() => setToggel(!toggle)} /> : <AiFillEyeInvisible onClick={() => setToggel(!toggle)} />}
                        </div>
                        <div className='errBlock'>
                            {(errors.password) ? <p> {errors.password}</p> : null}
                        </div>
                    </label>
                    <br />
                    <div className='serErrBlock'>
                        {(serverErrors.message) ? <p> {serverErrors.message}</p> : <br />}
                    </div>
                    <button>Sign Up</button>
                </form>
            </div>
        </div>

    )
}

