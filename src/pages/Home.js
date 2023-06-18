import React from 'react'
import { Card } from '../components/Card'
import { products } from "../data"
import "./Home.css"

export const Home = () => {
    return (
        <div className='mainContainer'>
            <div className='itemsContainer'>
                {
                    products.map((item) => {
                        return <Card key={item.id} data={item} />
                    })
                }
            </div>
        </div>
    )
}
