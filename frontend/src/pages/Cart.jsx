import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({ _id: items, size: item, quantity: cartItems[items][item] })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-6'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.length === 0 && (
        <div className='text-center py-24 text-gray-400'>
          <p className='text-5xl mb-4'>🛍️</p>
          <p className='text-lg font-medium text-gray-600'>Your cart is empty</p>
          <p className='text-sm mt-2 mb-6'>Looks like you haven't added anything yet.</p>
          <button onClick={() => navigate('/collection')}
            className='px-8 py-3 text-sm text-white rounded-full'
            style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)' }}>
            Browse Collection
          </button>
        </div>
      )}

      <div className='flex flex-col gap-3'>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div key={index} className='py-4 px-4 border border-gray-100 rounded-2xl text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 hover:border-purple-100 transition-colors'>
              <div className='flex items-start gap-4'>
                <img className='w-16 sm:w-20 rounded-xl object-cover' src={productData.image[0]} alt="" />
                <div>
                  <p className='text-sm sm:text-base font-medium text-gray-800'>{productData.name}</p>
                  <div className='flex items-center gap-3 mt-2'>
                    <p className='text-sm font-semibold' style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{currency}{productData.price}</p>
                    <span className='px-3 py-1 border border-gray-200 rounded-lg text-xs text-gray-500'>{item.size}</span>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                className='border border-gray-200 rounded-lg max-w-16 px-2 py-1.5 text-sm outline-none focus:border-purple-300 text-center'
                type="number" min={1} defaultValue={item.quantity}
              />
              <button onClick={() => updateQuantity(item._id, item.size, 0)} className='p-2 rounded-lg hover:bg-red-50 transition-colors ml-auto'>
                <img className='w-4' src={assets.bin_icon} alt="Remove" />
              </button>
            </div>
          )
        })}
      </div>

      {cartData.length > 0 && (
        <div className='flex justify-end my-16'>
          <div className='w-full sm:w-[420px]'>
            <CartTotal />
            <div className='w-full text-end mt-6'>
              <button
                onClick={() => navigate('/place-order')}
                className='text-white text-sm px-10 py-3.5 rounded-full font-medium tracking-widest transition-opacity hover:opacity-90'
                style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)' }}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart