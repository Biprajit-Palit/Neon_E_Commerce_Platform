import React from 'react'

const NeonLogo = () => (
  <svg width="100" height="32" viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fng" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6C5CE7"/>
        <stop offset="100%" stopColor="#00B894"/>
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#fng)" y="2"/>
    <line x1="9" y1="10" x2="9" y2="26" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="23" y1="10" x2="23" y2="26" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="9" y1="10" x2="23" y2="26" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
    <circle cx="24.5" cy="27" r="2" fill="#81ecec"/>
    <text x="40" y="24" fontFamily="'Cormorant Garamond', serif" fontSize="22" fontWeight="500" fill="url(#fng)" letterSpacing="-0.5">Neon</text>
  </svg>
);

const Footer = () => {
  return (
    <footer className='mt-20 border-t border-gray-100'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 py-14 text-sm'>
        <div>
          <NeonLogo />
          <p className='mt-5 w-full md:w-2/3 text-gray-400 leading-relaxed text-sm'>
            Neon is a fashion-forward brand built for those who refuse to blend in. Every piece is curated with intention — bold enough to stand out, refined enough to last.
          </p>
          <div className='flex gap-3 mt-5'>
            {['IG', 'TW', 'FB'].map(s => (
              <span key={s} className='w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white cursor-pointer'
                style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)' }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className='text-sm font-semibold tracking-widest uppercase mb-5 text-gray-800'>Company</p>
          <ul className='flex flex-col gap-2 text-gray-400'>
            {['Home', 'About Us', 'Collection', 'Delivery Info', 'Privacy Policy'].map(item => (
              <li key={item} className='hover:text-purple-600 cursor-pointer transition-colors'>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className='text-sm font-semibold tracking-widest uppercase mb-5 text-gray-800'>Get in Touch</p>
          <ul className='flex flex-col gap-2 text-gray-400'>
            <li className='hover:text-purple-600 cursor-pointer transition-colors'>+91 60093 17729</li>
            <li className='hover:text-purple-600 cursor-pointer transition-colors'>contact@neon.com</li>
            <li className='mt-3 text-xs text-gray-300'>Mon–Sat, 10am–7pm IST</li>
          </ul>
        </div>
      </div>

      <div className='border-t border-gray-100 py-5 flex flex-col sm:flex-row items-center justify-between gap-2'>
        <p className='text-xs text-gray-400'>© 2026 Neon — All Rights Reserved</p>
        <p className='text-xs text-gray-300'>Fashion Redefined</p>
      </div>
    </footer>
  )
}

export default Footer