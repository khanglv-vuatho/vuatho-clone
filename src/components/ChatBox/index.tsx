'use client'

import { Avatar, Button, Popover, PopoverContent, PopoverTrigger, Textarea } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { Minus, Send } from 'iconsax-react'
import { memo, useEffect, useRef, useState } from 'react'
import ImageFallback from '../ImageFallback'
import { groupMessages } from './Chat'

type TMessages = {
  id: string
  message: string
  time: number
}

function ChatBox() {
  const [showTopBtn, setShowTopBtn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<TMessages[]>([
    {
      id: 'bot',
      message: 'Hello, how can I help you?',
      time: Date.now()
    }
  ])
  const [value, setValue] = useState<string>('')
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef: any = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false)

      if (window.scrollY > 400) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom when new message is added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isOpen])

  const handleSendMessage = () => {
    if (value.trim() === '') return

    const newMessage: TMessages = {
      id: 'user',
      message: value,
      time: Date.now()
    }

    setMessages((prevMessages) => [...prevMessages, newMessage])
    setValue('')
    inputRef.current.focus()

    // Simulate bot response after user message
    setTimeout(() => {
      const botResponse: TMessages = {
        id: 'bot',
        message: `Bot response to "${newMessage.message}"`,
        time: Date.now()
      }
      setMessages((prevMessages) => [...prevMessages, botResponse])
    }, 1000)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }

  const grouped = groupMessages(messages)

  return (
    <Popover placement='right-end' isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button
          aria-label='scroll-to-top'
          isIconOnly
          className={`fixed bottom-24 right-10 z-50 flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full bg-[#282828] text-white transition  ${
            showTopBtn ? 'translate-y-0' : 'translate-y-[140px]'
          }`}
        >
          <ImageFallback src={'/chatbox.jpeg'} alt='image' width={44} height={44} className='object-contain' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex flex-col gap-2 p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Avatar name='K' size='sm' className='shrink-0' />
              <div className='w-fit font-bold'>Chat Box</div>
            </div>
            <Button className='w-fit bg-transparent' isIconOnly radius='full' onClick={() => setIsOpen(false)}>
              <Minus />
            </Button>
          </div>
          <div ref={chatContainerRef} className='flex h-[400px] max-h-[400px] w-[320px] max-w-[320px] flex-col gap-4 overflow-y-auto rounded bg-gray-100 p-2 pt-3'>
            {grouped.map((item, index) => (
              <div key={index} className={`flex flex-col gap-1`}>
                {item.messages.map((msg, index) => (
                  <ChatMessage id={item.id} messageLength={item?.messages?.length} index={index} key={index} msg={msg} />
                ))}
              </div>
            ))}
          </div>
          <div className='flex items-center'>
            <Textarea
              ref={inputRef}
              minRows={1}
              maxRows={3}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder='Type your message...'
              className='flex-grow'
            />
            <Button radius='full' isIconOnly className='flex size-[40px] items-center justify-center bg-transparent' onClick={handleSendMessage}>
              <Send variant='Bold' className='size-[24px] flex-shrink-0 -rotate-45 text-primary-blue' />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const ChatMessage = ({ msg, index, id, messageLength }: { id: string; msg: string; index: number; messageLength: number }) => {
  return (
    <div className={`flex items-end gap-1 ${id === 'bot' ? 'justify-start' : 'justify-end'}`}>
      {id === 'bot' && <Avatar name='K' size='sm' className={`shrink-0 ${index === messageLength - 1 ? 'block' : 'opacity-0'}`} />}
      <motion.div
        initial={{ opacity: 0, x: id === 'bot' ? 0 : -100, y: id === 'bot' ? 0 : 10 }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          transition:
            id === 'bot'
              ? {
                  duration: 0.1
                }
              : {
                  x: {
                    delay: 0.1,
                    type: 'tween',
                    stiffness: 100
                  },

                  y: {
                    duration: 0.1
                  }
                }
        }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className={`max-w-[80%] break-words rounded-lg p-2 px-3 ${id === 'bot' ? 'relative bg-blue-100 ' : 'bg-green-100'}`}
      >
        {msg}
      </motion.div>
    </div>
  )
}

export default memo(ChatBox)
