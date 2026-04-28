import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-12 mb-28'>
        <img className='w-full md:max-w-[480px] rounded-2xl object-cover' src={assets.contact_img} alt="Contact Neon" />

        <div className='flex flex-col justify-center items-start gap-6'>
          <div>
            <p className='font-semibold text-lg text-gray-800 mb-1'>Our Studio</p>
            <p className='text-gray-400 leading-relaxed text-sm'>
              12 Artisan Lane, Sector 5<br />
              New Delhi, India — 110 001
            </p>
          </div>

          <div>
            <p className='text-gray-400 text-sm'>
              <span className='text-gray-600 font-medium'>Phone:</span> +91 60093 17729
            </p>
            <p className='text-gray-400 text-sm mt-1'>
              <span className='text-gray-600 font-medium'>Email:</span> contact@neon.com
            </p>
          </div>

          <div>
            <p className='font-semibold text-lg text-gray-800 mb-1'>Careers at Neon</p>
            <p className='text-gray-400 text-sm leading-relaxed max-w-xs'>
              We are always looking for passionate, creative people to join our growing team. Think you belong here?
            </p>
          </div>

          <button
            className='px-8 py-3 text-sm font-medium tracking-widest rounded-full text-white transition-all hover:opacity-90'
            style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)' }}
          >
            EXPLORE JOBS
          </button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact