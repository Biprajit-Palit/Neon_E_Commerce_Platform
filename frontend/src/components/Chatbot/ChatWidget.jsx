import React, { useState } from 'react'
import ChatPanel from './ChatPanel'

const ChatWidget = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ChatPanel open={open} onClose={() => setOpen(false)} />

      <button
        onClick={() => setOpen((prev) => !prev)}
        className='fixed z-[65] flex items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 active:scale-95
          w-12 h-12 right-4 bottom-4
          sm:w-14 sm:h-14 sm:right-6 sm:bottom-6'
        style={{
          background: open ? '#2d2d44' : 'linear-gradient(135deg,#6C5CE7,#00B894)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        aria-label={open ? 'Close chat' : 'Open support chat'}
      >
        {open ? (
          <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2.5' strokeLinecap='round'>
            <line x1='18' y1='6' x2='6' y2='18' />
            <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
        ) : (
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
          </svg>
        )}
      </button>
    </>
  )
}

export default ChatWidget
