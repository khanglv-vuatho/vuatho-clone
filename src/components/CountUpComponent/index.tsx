'use client'

import React from 'react'
import CountUp from 'react-countup'

type Props = {
  end: number
} & React.ComponentProps<typeof CountUp>

const CountUpComponent = ({ end, ...props }: Props) => {
  return <CountUp {...props} end={end} />
}

export default CountUpComponent
