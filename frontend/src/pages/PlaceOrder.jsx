import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '',
    city: '', state: '', zipcode: '', country: '', phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount, currency: order.currency,
      name: 'Neon — Order Payment', description: 'Order Payment',
      order_id: order.id, receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
          if (data.success) { navigate('/orders'); setCartItems({}) }
        } catch (error) { toast.error(error) }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) { itemInfo.size = item; itemInfo.quantity = cartItems[items][item]; orderItems.push(itemInfo) }
          }
        }
      }
      let orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) { setCartItems({}); navigate('/orders') }
          else toast.error(response.data.message)
          break;
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) window.location.replace(responseStripe.data.session_url)
          else toast.error(responseStripe.data.message)
          break;
        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
          if (responseRazorpay.data.success) initPay(responseRazorpay.data.order)
          break;
        default: break;
      }
    } catch (error) { toast.error(error.message) }
  }

  const inputClass = 'border border-gray-200 rounded-xl py-2.5 px-4 w-full text-sm outline-none focus:border-purple-400 transition-colors placeholder-gray-400'

  const paymentOptions = [
    { id: 'stripe', logo: assets.stripe_logo, label: null },
    { id: 'razorpay', logo: assets.razorpay_logo, label: null },
    { id: 'cod', logo: null, label: 'CASH ON DELIVERY' },
  ]

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className={inputClass} type="text" placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className={inputClass} type="text" placeholder='Last name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className={inputClass} type="email" placeholder='Email address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className={inputClass} type="text" placeholder='Street address' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className={inputClass} type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className={inputClass} type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className={inputClass} type="number" placeholder='Zipcode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className={inputClass} type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className={inputClass} type="text" placeholder='Phone number' />
      </div>

      {/* Right */}
      <div className='mt-4 sm:mt-8 w-full sm:max-w-sm'>
        <CartTotal />

        <div className='mt-10'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col mt-4'>
            {paymentOptions.map(({ id, logo, label }) => (
              <div
                key={id}
                onClick={() => setMethod(id)}
                className={`flex items-center gap-3 border rounded-xl p-3 px-4 cursor-pointer transition-all ${method === id ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-200'}`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${method === id ? 'border-purple-500' : 'border-gray-300'}`}>
                  {method === id && <div className='w-2 h-2 rounded-full' style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)' }}></div>}
                </div>
                {logo ? <img className='h-5 mx-2' src={logo} alt={id} /> : <p className='text-gray-600 text-sm font-medium mx-2'>{label}</p>}
              </div>
            ))}
          </div>

          <div className='w-full text-end mt-8'>
            <button
              type='submit'
              className='text-white px-12 py-3.5 text-sm font-medium tracking-widest rounded-full hover:opacity-90 transition-opacity'
              style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)' }}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder