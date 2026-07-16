import React from 'react'
import { CHAT_FAQ } from '../../data/chatFaq'

const QuickReplies = ({ onSelect, disabled }) => {
  return (
    <div className='flex flex-wrap gap-2 px-1'>
      {CHAT_FAQ.map((faq) => (
        <button
          key={faq.id}
          type='button'
          disabled={disabled}
          onClick={() => onSelect(faq.id)}
          className='text-xs px-3 py-2 rounded-full border border-purple-200 text-purple-600 bg-white hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {faq.label}
        </button>
      ))}
    </div>
  )
}

export default QuickReplies
