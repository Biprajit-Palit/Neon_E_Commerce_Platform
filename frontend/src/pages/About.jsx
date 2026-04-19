import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      {/* 1. Closed the Title Div correctly */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* 2. Main About Section (Image + Text) */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nihil exercitationem nemo ipsum a fugiat quo iusto dolores cumque et? Ab illum ipsa tenetur fugiat, dolore fuga earum doloribus consequuntur.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id ut nam tempore sequi modi sunt corporis necessitatibus, deleniti placeat soluta rerum facilis eligendi maiores?</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores esse recusandae neque facilis. Labore placeat molestiae consectetur tenetur voluptatum libero.</p>
        </div>
      </div>

      {/* 3. Why Choose Us Section Header */}
      <div className='text-xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US'} />
      </div>

      {/* 4. Three Column Feature Section */}
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium veritatis voluptatem recusandae eos.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aut cupiditate ut sequi perspiciatis dicta?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aut cupiditate ut sequi perspiciatis dicta?</p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About