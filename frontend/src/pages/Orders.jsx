import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) return null;
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            const itemCopy = structuredClone(item);
            itemCopy['status'] = order.status;
            itemCopy['payment'] = order.payment;
            itemCopy['paymentMethod'] = order.paymentMethod;
            itemCopy['date'] = order.date;
            allOrdersItem.push(itemCopy);
          });
        });
        setorderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading order data:", error);
    }
  };

  useEffect(() => { loadOrderData() }, [token])

  const statusColor = (status) => {
    if (status === 'Delivered') return 'bg-green-100 text-green-700'
    if (status === 'Shipped') return 'bg-blue-100 text-blue-700'
    if (status === 'Cancelled') return 'bg-red-100 text-red-600'
    return 'bg-purple-100 text-purple-700'
  }

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl mb-6'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {orderData.length === 0 && (
        <div className='text-center py-24 text-gray-400'>
          <p className='text-5xl mb-4'>📦</p>
          <p className='text-lg font-medium text-gray-600'>No orders yet</p>
          <p className='text-sm mt-1'>Your order history will appear here once you've made a purchase.</p>
        </div>
      )}

      <div className='flex flex-col gap-4'>
        {orderData.map((item, index) => (
          <div key={index} className='border border-gray-100 rounded-2xl p-5 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-purple-100 transition-colors'>
            <div className='flex items-start gap-5 text-sm'>
              <img className='w-16 sm:w-20 rounded-xl object-cover' src={item.image && item.image[0] ? item.image[0] : ''} alt="" />
              <div>
                <p className='sm:text-base font-semibold text-gray-800'>{item.name}</p>
                <div className='flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500'>
                  <span className='font-medium' style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{currency}{item.price}</span>
                  <span>Qty: {item.quantity}</span>
                  <span className='border border-gray-200 px-2 py-0.5 rounded-lg text-xs'>{item.size}</span>
                </div>
                <p className='mt-1 text-xs text-gray-400'>Ordered: {new Date(item.date).toDateString()}</p>
                <p className='mt-0.5 text-xs text-gray-400'>Via: {item.paymentMethod}</p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between items-center'>
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${statusColor(item.status)}`}>
                {item.status}
              </span>
              <button
                onClick={loadOrderData}
                className='border border-gray-200 px-5 py-2 text-sm font-medium rounded-full hover:border-purple-400 hover:text-purple-600 transition-colors'
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders