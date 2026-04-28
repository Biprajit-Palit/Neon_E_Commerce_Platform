import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* Main About Section */}
      <div className='my-12 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] rounded-2xl object-cover' src={assets.about_img} alt="About Neon" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-500'>
          <p className='leading-relaxed'>
            Neon was born from a simple belief: style should be effortless, not exclusive. We started as a small team of fashion obsessives who were tired of choosing between quality and affordability — so we built the brand we always wanted to shop from.
          </p>
          <p className='leading-relaxed'>
            Every piece in our collection is thoughtfully sourced, rigorously tested, and designed to earn a permanent spot in your wardrobe. We don't do fast trends — we do lasting style.
          </p>
          <div>
            <b className='text-gray-800 text-base block mb-2'>Our Mission</b>
            <p className='leading-relaxed'>
              To make boldly designed, quality clothing accessible to everyone — and to build a community of people who wear their identity, not just their outfit.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 gap-0'>
        {[
          {
            title: 'Quality Assurance',
            body: 'Every item goes through a strict quality check before it reaches your door. We partner only with manufacturers who share our standards — because you deserve clothing that lasts.'
          },
          {
            title: 'Effortless Shopping',
            body: 'From browsing to checkout, we have designed Neon to feel intuitive. Real-time stock updates, smooth navigation, and multiple payment options — because shopping should be a joy, not a chore.'
          },
          {
            title: 'Exceptional Support',
            body: 'Got a question, a concern, or just need styling advice? Our team is available 24/7 and genuinely loves to help. We do not consider an order complete until you are completely happy.'
          }
        ].map((item, i) => (
          <div key={i} className='border border-gray-100 hover:border-purple-200 px-10 md:px-16 py-10 sm:py-20 flex flex-col gap-4 flex-1 transition-all duration-300 hover:shadow-sm rounded-none first:rounded-l-2xl last:rounded-r-2xl'>
            <b className='text-gray-800'>{item.title}</b>
            <p className='text-gray-400 leading-relaxed'>{item.body}</p>
          </div>
        ))}
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About