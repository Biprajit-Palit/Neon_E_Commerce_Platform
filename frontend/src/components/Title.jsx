import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-3 items-center mb-3'>
      <p className='text-gray-400 tracking-widest text-sm uppercase'>
        {text1}
        <span className='ml-1 font-semibold' style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {text2}
        </span>
      </p>
      <span className='h-[2px] w-10 sm:w-14 rounded-full' style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)' }}></span>
    </div>
  )
}

export default Title