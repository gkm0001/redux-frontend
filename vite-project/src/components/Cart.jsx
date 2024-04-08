import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remove } from '../store/CartSlice'

function Cart() {
    const products = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const removeToCart = (id) => {
        dispatch(remove(id))
    }

    const cards = products.map(product => (
        <div key={product.id} className='md:w-50 px-2  mb-4 '>
            <div className='bg-white p-4 rounded-lg shadow'>
                <img src={product.avatar} alt={product.first_name} className='w-full h-48 object-cover mb-4 rounded-md' />
                <div className='text-gray-800'>
                    <h2 className='text-xl font-semibold mb-2'>{product.first_name}</h2>
                    <p className='mb-4'>{product.description}</p>
                    <button className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600' onClick={() => removeToCart(product.id)}>Remove Item</button>
                </div>
            </div>
        </div>
    ))

    return (
        <div className='container mx-auto mt-8'>
            <h1 className='text-3xl font-bold mb-4'>Cart</h1>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 '>
                {cards}
            </div>
        </div>
    )
}

export default Cart
