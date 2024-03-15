'use client'
import { motion } from 'framer-motion'

type Props = {
  character: string
  index: number
  initDelay?: number
  duration?: number
  durationChar?: number
}

const Letter = ({ character, index, initDelay, duration, durationChar }: Props) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: duration ? duration : 0.05, delay: initDelay ? initDelay + index * (durationChar ? durationChar : 0.005) : index * (durationChar ? durationChar : 0.005) }}
      viewport={{ once: true }}
    >
      {character}
    </motion.span>
  )
}
export default Letter
