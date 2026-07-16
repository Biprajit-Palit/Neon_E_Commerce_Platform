import React from 'react'
import { Link } from 'react-router-dom'

const ChatMessage = ({ message, onOpenSupportForm }) => {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'text-white rounded-br-md'
            : 'bg-gray-50 text-gray-700 border border-gray-100 rounded-bl-md'
        }`}
        style={isUser ? { background: 'linear-gradient(135deg,#6C5CE7,#00B894)' } : undefined}
      >
        <p className='whitespace-pre-wrap'>{message.text}</p>

        {message.links?.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-3'>
            {message.links.map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to}
                className='inline-block text-xs font-medium px-3 py-1.5 rounded-full border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors'
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {message.showSupportForm && (
          <button
            onClick={onOpenSupportForm}
            className='mt-3 text-xs font-medium text-purple-600 hover:text-purple-800 underline underline-offset-2'
          >
            Send us a message
          </button>
        )}
      </div>
    </div>
  )
}

export default ChatMessage
