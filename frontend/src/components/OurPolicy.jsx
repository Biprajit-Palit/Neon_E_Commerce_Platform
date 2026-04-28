import React from 'react'
import { assets } from '../assets/assets'

const policies = [
  {
    icon: assets.exchange_icon,
    title: 'Easy Exchange',
    desc: 'Changed your mind? Swap styles hassle-free within 14 days of delivery.'
  },
  {
    icon: assets.quality_icon,
    title: '7-Day Returns',
    desc: "Not feeling it? Return any item within 7 days — no questions asked."
  },
  {
    icon: assets.support_img,
    title: '24/7 Support',
    desc: 'Our style team is always on standby. Reach us anytime, any day.'
  }
]

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row gap-6 py-16'>
      {policies.map((p, i) => (
        <div key={i} className='flex-1 flex flex-col items-center text-center px-6 py-8 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-sm transition-all duration-300'>
          <div className='w-14 h-14 rounded-full flex items-center justify-center mb-4'
            style={{ background: 'linear-gradient(135deg,#ede9fe,#d1fae5)' }}>
            <img src={p.icon} className='w-6' alt={p.title} />
          </div>
          <p className='font-semibold text-gray-800 mb-2'>{p.title}</p>
          <p className='text-gray-400 text-sm leading-relaxed'>{p.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default OurPolicy