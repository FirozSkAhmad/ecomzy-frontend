import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CartCard } from '../components/CartCard'
import "./Cart.css"
import { clear } from '../redux/slices/Cartslice'
import axios from 'axios'


export const Cart = () => {
    const navigate = useNavigate()
    const cartItems = useSelector((state) => state.cart.items)

    let totalPrice
    if (cartItems.length > 0) {
        totalPrice = cartItems.reduce((acc, cur) => {
            return acc += cur.price
        }, 0)
    }

    const dispatch = useDispatch()

    const checkOutHandler = async () => {
        try {
            const orderItems = {
                items: cartItems,
                totalPrice: totalPrice
            }

            const userId = localStorage.getItem("userId")

            const formData = { userId, orderItems }

            const options = {
                url: "https://ecomzy-backend.onrender.com/updateOrders",
                method: "PUT",
                data: formData
            }
            await axios(options)
            dispatch(clear())
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className='mainContainer'>
            {
                cartItems.length === 0 ?
                    <div className='emptyCart'>
                        <p>Your cart is empty!</p>
                        <button onClick={() => navigate("/")}>Shop Now</button>
                    </div>
                    :
                    <div className='cartItemsContainer'>
                        <div className='cartItems'>
                            {cartItems.map((item) => {
                                return <CartCard key={item.id} data={item} />
                            })}
                        </div>
                        <div className='cartSummary'>
                            <div className='cartSummaryHead'>
                                <div id='head'>
                                    <p>YOUR CART</p>
                                    <h1>SUMMARY</h1>
                                </div>

                                <p>Total Items:<span id='total'>{cartItems.length}</span></p>
                            </div>

                            <div id='amountContainer'>
                                <p>Total Amount:<span id='totalPrice'>${totalPrice}</span></p>
                                <button onClick={checkOutHandler}>Checkout Now</button>
                            </div>
                        </div>
                    </div>

            }
        </div>
    )
}
