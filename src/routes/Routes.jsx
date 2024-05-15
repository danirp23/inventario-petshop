import React from 'react'
import { Routes, Route } from 'react-router-dom'
import StockProducts from '../pages/StockProducts'
import Home from '../pages/Home'
import CreateProduct from '../pages/CreateProduct'

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/create' element={<CreateProduct />} />
                <Route path='/show' element={<StockProducts />} />
            </Routes>
        </>
    )
}
