import React from 'react'
import { AiTwotoneDelete } from "react-icons/ai"
import { remove } from "../redux/slices/Cartslice"
import { useDispatch } from "react-redux"
import "./CartCard.css"


export const CartCard = ({ data }) => {

    const dispatch = useDispatch()
    
    return (
        <div className='cartCard'>
            <div id='cartCardImg'>
                <img className='img' src={data.image} alt="itemImg" width="180px" height="200px" />
            </div>
            <div id='cartCardDec'>
                <h2>{data.title}</h2>
                <p>{data.description.split(" ").slice(0, 20).join(" ")}...</p>
                <div id='priceIconContainer'>
                    <p>${data.price}</p>
                    <div id='icon'>
                        <AiTwotoneDelete onClick={() => dispatch(remove(data))} />
                    </div>
                </div>
            </div>
        </div>
    )
}
