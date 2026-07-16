import React, { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage'
import QuickReplies from './QuickReplies'
import SupportForm from './SupportForm'
import { useChatSession } from '../../hooks/useChatSession'

const TypingIndicator = () => (
  <div className='flex justify-start'>
    <div className='bg-gray-50 border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1'>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className='w-2 h-2 rounded-full bg-purple-400 animate-bounce'
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  </div>
)

const ChatPanel = ({ open, onClose }) => {
  const {
    messages,
    isTyping,
    showSupportForm,
    showQuickReplies,
    sendMessage,
    selectQuickReply,
    openSupportForm,
    setShowSupportForm,
  } = useChatSession()

  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open, messages, isTyping, showSupportForm])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage(input)
    setInput('')
  }

  if (!open) return null

  return (
    <>
      <div
        className='fixed inset-0 bg-black/20 z-[60] sm:hidden'
        onClick={onClose}
        aria-hidden='true'
      />

      <div
        role='dialog'
        aria-label='Neon support chat'
        className='fixed z-[70] flex flex-col bg-white shadow-2xl overflow-hidden
          inset-x-0 bottom-0 h-[85vh] rounded-t-3xl
          sm:inset-auto sm:right-6 sm:bottom-24 sm:w-[380px] sm:h-[520px] sm:rounded-2xl sm:border sm:border-gray-100'
      >
        {/* Header */}
        <div
          className='flex items-center justify-between px-5 py-4 shrink-0'
          style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)' }}
        >
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-sm'>
              ✦
            </div>
            <div>
              <p className='text-white font-medium text-sm'>Neon Assistant</p>
              <p className='text-white/70 text-xs'>Usually replies instantly</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:bg-white/20 transition-colors text-xl'
            aria-label='Close chat'
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className='flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3'>
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onOpenSupportForm={openSupportForm}
            />
          ))}

          {isTyping && <TypingIndicator />}

          {showQuickReplies && !isTyping && (
            <QuickReplies onSelect={selectQuickReply} disabled={isTyping} />
          )}

          {showSupportForm && (
            <SupportForm onClose={() => setShowSupportForm(false)} />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className='shrink-0 px-4 py-3 border-t border-gray-100 flex gap-2 items-center'
          style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
        >
          <input
            ref={inputRef}
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type your question...'
            disabled={isTyping}
            className='flex-1 border border-gray-200 rounded-full py-2.5 px-4 text-sm outline-none focus:border-purple-400 transition-colors placeholder-gray-400 disabled:opacity-50'
          />
          <button
            type='submit'
            disabled={!input.trim() || isTyping}
            className='w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed'
            style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)' }}
            aria-label='Send message'
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
              <line x1='22' y1='2' x2='11' y2='13' />
              <polygon points='22 2 15 22 11 13 2 9 22 2' />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}

export default ChatPanel
