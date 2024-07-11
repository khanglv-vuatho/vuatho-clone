'use client'

import { motion } from 'framer-motion'
import { cn } from '@nextui-org/react'

const TypeEffect = ({
  words,
  className
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split('')
    }
  })
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className='inline-block'>
              {word.text.map((char, index) => (
                <span key={`char-${index}`} className={cn(`text-black dark:text-white `, word.className)}>
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      <motion.div
        className='overflow-hidden '
        initial={{
          width: '0%'
        }}
        whileInView={{
          width: 'fit-content'
        }}
        transition={{
          duration: 0.2,
          ease: 'linear',
          delay: 0.1
        }}
      >
        <div
          className='text-sm'
          style={{
            whiteSpace: 'nowrap'
          }}
        >
          {renderWords()}{' '}
        </div>{' '}
      </motion.div>
    </div>
  )
}
export default TypeEffect
