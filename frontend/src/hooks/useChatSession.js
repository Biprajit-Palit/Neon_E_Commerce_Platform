import { useCallback, useState } from 'react'
import {
  WELCOME_MESSAGE,
  FALLBACK_MESSAGE,
  findFaqById,
  matchFaqByText,
} from '../data/chatFaq'

const TYPING_DELAY_MS = 600

function createBotMessage(faq) {
  return {
    id: crypto.randomUUID(),
    role: 'bot',
    text: faq.answer,
    links: faq.links ?? [],
    showSupportForm: faq.showSupportForm ?? false,
    faqId: faq.id,
  }
}

export function useChatSession() {
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'bot', text: WELCOME_MESSAGE, links: [], showQuickReplies: true },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [showSupportForm, setShowSupportForm] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)

  const pushUserMessage = useCallback((text) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', text },
    ])
  }, [])

  const respondWithFaq = useCallback((faq) => {
    setIsTyping(true)
    setShowQuickReplies(false)
    setTimeout(() => {
      setMessages((prev) => [...prev, createBotMessage(faq)])
      if (faq.showSupportForm) setShowSupportForm(true)
      setIsTyping(false)
    }, TYPING_DELAY_MS)
  }, [])

  const respondWithFallback = useCallback(() => {
    setIsTyping(true)
    setShowQuickReplies(true)
    setShowSupportForm(true)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'bot',
          text: FALLBACK_MESSAGE,
          links: [{ label: 'Contact page', to: '/Contact' }],
          showQuickReplies: true,
        },
      ])
      setIsTyping(false)
    }, TYPING_DELAY_MS)
  }, [])

  const sendMessage = useCallback(
    (text) => {
      const trimmed = text.trim()
      if (!trimmed || isTyping) return

      pushUserMessage(trimmed)
      const faq = matchFaqByText(trimmed)
      if (faq) respondWithFaq(faq)
      else respondWithFallback()
    },
    [isTyping, pushUserMessage, respondWithFaq, respondWithFallback]
  )

  const selectQuickReply = useCallback(
    (faqId) => {
      if (isTyping) return
      const faq = findFaqById(faqId)
      if (!faq) return

      pushUserMessage(faq.label)
      respondWithFaq(faq)
    },
    [isTyping, pushUserMessage, respondWithFaq]
  )

  const openSupportForm = useCallback(() => {
    setShowSupportForm(true)
  }, [])

  return {
    messages,
    isTyping,
    showSupportForm,
    showQuickReplies,
    sendMessage,
    selectQuickReply,
    openSupportForm,
    setShowSupportForm,
  }
}
