import React from 'react'

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className='rounded-2xl overflow-hidden my-16' style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
      <div className='text-center px-6 py-14'>
        <p className='text-xs tracking-[0.3em] text-purple-400 uppercase mb-3'>Exclusive Access</p>
        <p className='text-3xl font-display text-white mb-2'>
          Join the Inner Circle
        </p>
        <p className='text-gray-400 mt-3 text-sm max-w-md mx-auto leading-relaxed'>
          Subscribe and unlock 20% off your first order, early access to new drops, and style edits curated just for you.
        </p>
        <form onSubmit={onSubmitHandler} className='flex items-center gap-0 mx-auto my-8 max-w-md rounded-full overflow-hidden border border-gray-600'>
          <input
            className='w-full flex-1 outline-none bg-transparent text-white text-sm px-5 py-3.5 placeholder-gray-500'
            type="email"
            placeholder='Your email address'
            required
          />
          <button
            type='submit'
            className='text-white text-xs px-7 py-3.5 font-medium tracking-widest whitespace-nowrap'
            style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)' }}
          >
            SUBSCRIBE
          </button>
        </form>
        <p className='text-xs text-gray-600'>No spam, ever. Unsubscribe anytime.</p>
      </div>
    </div>
  )
}

export default NewsletterBox