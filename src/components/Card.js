import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove } from "../redux/slices/Cartslice"
import "./Card.css"

export const Card = ({ data }) => {
    const cartItems = useSelector((state) => state.cart.items)

    let itemIds = []
    if (cartItems.length > 0) {
        cartItems.forEach((itemData) => {
            return itemIds.push(itemData.id)
        })
    }
    const dispatch = useDispatch()

    return (
        <div className='card'>
            <div id='heading'>
                <p>{data.title.slice(0, 14)}...</p>
            </div>
            <div id='description'>
                <p>{data.description.slice(0, 34)}...</p>
            </div>
            <div id='image'>
                <img src={data.image} alt="itemImage" />
            </div>
            <div id="priceContainer">
                <div id='price'>
                    <p>{`$${data.price}`}</p>
                </div>
                <div>
                    {!itemIds.includes(data.id) ? <button onClick={() => dispatch(add(data))}>Add To Cart</button> :
                        <button onClick={() => dispatch(remove(data))}>Remove Item</button>}
                </div>
            </div>

        </div>
    )
}
