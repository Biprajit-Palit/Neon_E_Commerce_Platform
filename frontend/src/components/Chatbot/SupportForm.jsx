import React, { useState } from 'react'

const SupportForm = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('Neon Support Request')
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:contact@neon.com?subject=${subject}&body=${body}`
  }

  const inputClass =
    'w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm outline-none focus:border-purple-400 transition-colors placeholder-gray-400'

  return (
    <div className='mx-1 p-4 bg-purple-50/60 border border-purple-100 rounded-2xl'>
      <div className='flex items-center justify-between mb-3'>
        <p className='text-sm font-medium text-gray-800'>Send a support message</p>
        <button
          type='button'
          onClick={onClose}
          className='text-gray-400 hover:text-gray-600 text-lg leading-none'
          aria-label='Close support form'
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-2.5'>
        <input
          className={inputClass}
          name='name'
          placeholder='Your name'
          value={form.name}
          onChange={onChange}
          required
        />
        <input
          className={inputClass}
          name='email'
          type='email'
          placeholder='Your email'
          value={form.email}
          onChange={onChange}
          required
        />
        <textarea
          className={`${inputClass} resize-none min-h-[80px]`}
          name='message'
          placeholder='How can we help?'
          value={form.message}
          onChange={onChange}
          required
        />
        <button
          type='submit'
          className='w-full py-2.5 text-xs font-medium tracking-widest rounded-full text-white transition-all hover:opacity-90'
          style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)' }}
        >
          OPEN EMAIL APP
        </button>
        <p className='text-[11px] text-gray-400 text-center'>
          This opens your email app addressed to contact@neon.com
        </p>
      </form>
    </div>
  )
}

export default SupportForm
