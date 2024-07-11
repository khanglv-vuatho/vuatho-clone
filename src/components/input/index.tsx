'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Input, InputProps, cn } from '@nextui-org/react'
import { Add, SearchNormal1 } from 'iconsax-react'

import useUnfocusItem from '@/hook/useUnfocusItem'
import { SearchSpiner } from '../Icons'
import { twMerge } from 'tailwind-merge'

export const InputSearch = ({ onRefresh }: { onRefresh: any }) => {
  const [searchValue, setSearchValue] = useState<string>(useSearchParams().get('search') || '')
  const searchParams = useSearchParams()
  const [showSearchItem, setShowSearchItem] = useState<boolean>(false)
  const [onSearching, setOnSearching] = useState<boolean>(false)

  const router = useRouter()
  const locale = useLocale()

  const t = useTranslations('inputSearch')

  const exclusionRef = useRef(null)

  const itemRef = useUnfocusItem(() => {
    setShowSearchItem(false)
  }, exclusionRef)

  const handleClearValue = () => {
    setSearchValue('')
    if (itemRef.current) {
      itemRef.current.focus()
    }
  }
  const handleNavigate = useCallback(() => {
    if (searchParams.get('search')?.length || searchValue?.length) {
      router.push(`/${locale}/press?search=${searchValue?.trim()}&page=1`)
      setShowSearchItem(false)
      if (itemRef.current) {
        itemRef.current.blur()
      }
    }
  }, [searchValue, searchParams.get('search')])

  const handleChangeValueSearch = (e: any) => {
    const value = e.target.value
    if (value.length < 70) setSearchValue(value)
  }

  useEffect(() => {
    setOnSearching(true)
    const debounceTimer = setTimeout(() => {
      setOnSearching(false)
    }, 500)

    return () => {
      clearTimeout(debounceTimer)
    }
  }, [searchValue])

  return (
    <Input
      autoComplete='off'
      value={searchValue}
      ref={itemRef}
      onFocus={() => setShowSearchItem(true)}
      onChange={(e: any) => {
        handleChangeValueSearch(e)
      }}
      startContent={<SearchNormal1 size={24} className=' text-[#959595]' />}
      placeholder={t('search')}
      onKeyDown={(e: any) => {
        if (e.key === 'Enter') {
          handleNavigate()
        }
      }}
      endContent={
        !!searchValue?.length && (
          <div className={`cursor-pointer rounded-full ${!onSearching && 'bg-[#959595] hover:bg-[#959595]/40'}`} onClick={handleClearValue}>
            {onSearching ? <SearchSpiner className='h-5 w-5 animate-spin text-[#959595]' /> : <Add size={16} className='rotate-45 text-white' />}
          </div>
        )
      }
      classNames={{
        clearButton: 'pr-[10px]',
        innerWrapper: 'py-4 px-2 data-[hover=true]:bg-white group-data-[focus=true]:bg-white bg-white ',
        input: 'text-lg placeholder: data-[has-start-content=true]:ps-[10px]',
        inputWrapper:
          'bg-white rounded rounded-full overflow-hidden data-[hover=true]:bg-white group-data-[focus=true]:bg-white h-[58px] shadow-[0px_4px_8px_0px_#ACACAC29] group-data-[focus=true]:border-none border-none'
      }}
    />
  )
}

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit
}: {
  placeholders: string[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)

  useEffect(() => {
    let interval: any
    const startAnimation = () => {
      interval = setInterval(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length)
      }, 1500)
    }
    startAnimation()
    return () => clearInterval(interval)
  }, [placeholders.length])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const newDataRef = useRef<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const [animating, setAnimating] = useState(false)

  const draw = useCallback(() => {
    if (!inputRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 800
    ctx.clearRect(0, 0, 800, 800)
    const computedStyles = getComputedStyle(inputRef.current)

    const fontSize = parseFloat(computedStyles.getPropertyValue('font-size'))
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`
    ctx.fillStyle = '#FFF'
    ctx.fillText(value, 16, 40)

    const imageData = ctx.getImageData(0, 0, 800, 800)
    const pixelData = imageData.data
    const newData: any[] = []

    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n
        if (pixelData[e] !== 0 && pixelData[e + 1] !== 0 && pixelData[e + 2] !== 0) {
          newData.push({
            x: n,
            y: t,
            color: [pixelData[e], pixelData[e + 1], pixelData[e + 2], pixelData[e + 3]]
          })
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`
    }))
  }, [value])

  useEffect(() => {
    draw()
  }, [value, draw])

  const animate = (start: number) => {
    const animateFrame = (pos: number = 0) => {
      requestAnimationFrame(() => {
        const newArr = []
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i]
          if (current.x < pos) {
            newArr.push(current)
          } else {
            if (current.r <= 0) {
              current.r = 0
              continue
            }
            current.x += Math.random() > 0.5 ? 1 : -1
            current.y += Math.random() > 0.5 ? 1 : -1
            current.r -= 0.05 * Math.random()
            newArr.push(current)
          }
        }
        newDataRef.current = newArr
        const ctx = canvasRef.current?.getContext('2d')
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800)
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t
            if (n > pos) {
              ctx.beginPath()
              ctx.rect(n, i, s, s)
              ctx.fillStyle = color
              ctx.strokeStyle = color
              ctx.stroke()
            }
          })
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8)
        } else {
          setValue('')
          setAnimating(false)
        }
      })
    }
    animateFrame(start)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !animating) {
      vanishAndSubmit()
    }
  }

  const vanishAndSubmit = () => {
    setAnimating(true)
    draw()

    const value = inputRef.current?.value || ''
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce((prev, current) => (current.x > prev ? current.x : prev), 0)
      animate(maxX)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    vanishAndSubmit()
    onSubmit && onSubmit(e)
  }
  return (
    <form
      className={cn(
        'relative mx-auto h-12 w-full max-w-xl overflow-hidden rounded-full bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 dark:bg-zinc-800',
        value && 'bg-gray-50'
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        className={cn(
          'pointer-events-none absolute  left-2 top-[20%] origin-top-left scale-50 transform pr-20 text-base invert filter dark:invert-0 sm:left-8',
          !animating ? 'opacity-0' : 'opacity-100'
        )}
        ref={canvasRef}
      />
      <input
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value)
            onChange && onChange(e)
          }
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        type='text'
        className={cn(
          'relative z-50 h-full w-full rounded-full border-none bg-transparent pl-4 pr-20 text-sm text-black focus:outline-none focus:ring-0 dark:text-white sm:pl-10 sm:text-base',
          animating && 'text-transparent dark:text-transparent'
        )}
      />

      <button
        disabled={!value}
        type='submit'
        className='absolute right-2 top-1/2 z-50 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black transition duration-200 disabled:bg-gray-100 dark:bg-zinc-900 dark:disabled:bg-zinc-800'
      >
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='h-4 w-4 text-gray-300'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <motion.path
            d='M5 12l14 0'
            initial={{
              strokeDasharray: '50%',
              strokeDashoffset: '50%'
            }}
            animate={{
              strokeDashoffset: value ? 0 : '50%'
            }}
            transition={{
              duration: 0.3,
              ease: 'linear'
            }}
          />
          <path d='M13 18l6 -6' />
          <path d='M13 6l6 6' />
        </motion.svg>
      </button>

      <div className='pointer-events-none absolute inset-0 flex items-center rounded-full'>
        <AnimatePresence mode='wait'>
          {!value && (
            <motion.p
              initial={{
                y: 5,
                opacity: 0
              }}
              key={`current-placeholder-${currentPlaceholder}`}
              animate={{
                y: 0,
                opacity: 1
              }}
              exit={{
                y: -15,
                opacity: 0
              }}
              transition={{
                duration: 0.3,
                ease: 'linear'
              }}
              className='w-[calc(100%-2rem)] truncate pl-4 text-left text-sm font-normal text-neutral-500 dark:text-zinc-500 sm:pl-12 sm:text-base'
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

type TInputCustom = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  label: string
  error: boolean
  size?: 'sm' | 'md' | 'lg'
  name?: string
} & InputProps

export const InputCustom = ({ value, name, onChange, error, className, label, ...props }: TInputCustom) => {
  return (
    <Input
      {...props}
      placeholder={label}
      name={name ? name : label.toLocaleLowerCase()}
      value={value}
      onChange={onChange}
      variant='bordered'
      classNames={{
        input: 'text-white placeholder:text-white',
        inputWrapper: `${error ? 'border-red-500' : 'border-slate-300'} h-12 ${error ? 'data-[hover=true]:border-reed-500 group-data-[focus=true]:border-red-500' : 'data-[hover=true]:border-white group-data-[focus=true]:border-white'}`
      }}
      className={twMerge(className)}
    />
  )
}
