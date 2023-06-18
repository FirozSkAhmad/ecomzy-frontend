import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../components/Navbar.css"
import { BsFillCartFill } from "react-icons/bs"
import { useSelector } from 'react-redux'
import axios from 'axios'

export const Navbar = () => {
    const cartItems = useSelector((state) => state.cart.items)

    const navigate = useNavigate()


    const logOut = async () => {

        const userId = localStorage.getItem("userId")

        const formData = { userId, cartItems }

        const options = {
            url: "https://ecomzy-backend.onrender.com/updateCart",
            method: "PUT",
            data: formData
        }
        await axios(options)
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div>
            <nav>
                <div className='imageContainer'>
                    <NavLink to="/"><img src="https://codehelp-shopping-cart.netlify.app/logo.png" width="110px" height="40px" alt="img" /></NavLink>
                </div>
                {
                    localStorage.getItem("token") ? <div className='linkContainer'>
                        <NavLink style={{ textDecoration: "none" }} to="/"><p>Home</p></NavLink>
                        <NavLink to="/cart"><div className='count'><p>{cartItems?.length}</p></div><span id='cartIcon'><BsFillCartFill /></span></NavLink>
                        <p onClick={logOut}>LogOut</p>
                    </div> : <div className='rLinkContainer'>
                        <NavLink style={{ textDecoration: "none" }} to="/login"><p>Login</p></NavLink>
                        <NavLink style={{ textDecoration: "none" }} to="/signup"><p>signUp</p></NavLink>
                    </div>
                }

            </nav>
        </div>
    )
}
