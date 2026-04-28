import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-100 rounded-2xl overflow-hidden shadow-sm'>
      {/* Left side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-0 px-10'
        style={{ background: 'linear-gradient(145deg, #f8f7ff 0%, #ede9fe 100%)' }}>
        <div>
          <div className='flex items-center gap-3 mb-4'>
            <span className='w-8 md:w-12 h-[1.5px]' style={{ background: 'linear-gradient(90deg,#6C5CE7,#00B894)' }}></span>
            <p className='text-xs tracking-[0.25em] font-medium text-purple-500 uppercase'>New Season Drop</p>
          </div>

          <h1 className='font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-gray-900 mb-2'>
            Latest<br />
            <span style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Arrivals
            </span>
          </h1>
          <p className='text-sm text-gray-500 mt-3 mb-6 max-w-xs leading-relaxed'>
            Curated styles for those who lead. Bold, minimal, and made to move.
          </p>

          <Link to='/collection'>
            <div className='inline-flex items-center gap-3 group cursor-pointer'>
              <span className='text-sm font-semibold tracking-widest uppercase text-gray-800 group-hover:text-purple-600 transition-colors'>
                Shop Now
              </span>
              <span className='w-8 md:w-12 h-[1.5px] group-hover:w-16 transition-all duration-300' style={{ background: 'linear-gradient(90deg,#6C5CE7,#00B894)' }}></span>
            </div>
          </Link>
        </div>
      </div>

      {/* Right side */}
      <img className='w-full sm:w-1/2 object-cover' src={assets.hero_img} alt="Neon Latest Arrivals" />
    </div>
  )
}

export default Hero