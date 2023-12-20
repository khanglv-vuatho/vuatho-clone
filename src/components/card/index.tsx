import Image from 'next/image'

import { useTranslations } from 'next-intl'

export const IntroCard = () => {
  const t = useTranslations('ServicesVuaTho')

  return (
    <div className='flex-center group relative h-full w-full flex-col gap-[10px] overflow-hidden rounded-[60px] bg-gradient-to-t from-[#0A1D89] to-[#233FCA] px-8 xl:px-20 13inch:gap-[20px] 3xl:gap-[30px]'>
      <Image src={'/images/about-us/vuatho.png'} alt='' width={350} height={85} />
      <p className='w-[90%] text-center text-[4rem] text-white md:w-full md:text-left'>
        {t('title')}
      </p>
      <p className='w-[90%] text-center text-[2.4rem] text-white md:w-full md:text-left md:text-[2rem]'>
        {t('text')}
      </p>
      <div className='absolute -right-1/3 top-0 h-full w-1/2 -skew-x-[30deg] bg-white/[0.15] transition group-hover:-translate-x-1/3' />
      <div className='absolute -right-1/2 top-0 h-full w-1/2 -skew-x-[30deg] bg-white/10 transition group-hover:-translate-x-1/3' />
    </div>
  )
}

export const SubCard1 = () => {
  const tc = useTranslations('Card')

  return (
    <div className='group relative h-full w-full overflow-hidden rounded-[60px] bg-black/[0.02] px-8 xl:px-20'>
      <h6 className='absolute right-[8%] top-[8%] z-[1] text-[4rem] font-bold text-primary-blue'>
        {tc('SubCard1.text')} <br /> {tc('SubCard1.text1')}
      </h6>
      <div className=''>
        <Image
          src={'/mascot/1.png'}
          alt='mascot'
          width={384}
          height={478}
          className='pointer-events-none absolute bottom-[5%] left-[3%] z-[1] h-[70%] max-h-[478px] w-auto object-contain md:h-[75%]'
        />
      </div>
      <div className='absolute -bottom-[4%] -left-[2%] hidden aspect-square h-1/2 w-fit rounded-full bg-primary-blue/50 lg:block lg:blur-2xl' />
      <div className='absolute -right-[2%] -top-[4%] hidden aspect-square h-1/2 w-fit rounded-full bg-primary-blue/10 lg:block lg:blur-2xl' />
      <div className='absolute -left-[2%] -top-[4%] hidden aspect-square h-1/3 w-fit rounded-full bg-primary-yellow/10 lg:block lg:blur-2xl' />
      <div className='absolute -right-[2%] bottom-[4%] hidden aspect-square h-1/2 w-fit rounded-full bg-primary-yellow/10 lg:block lg:blur-2xl' />
    </div>
  )
}

export const SubCard2 = () => {
  const tc = useTranslations('Card')

  return (
    <div className='group relative h-full w-full overflow-hidden rounded-[60px] bg-black/[0.02] px-8 xl:px-20'>
      <h6 className='absolute left-[8%] top-[8%] z-[1] text-[4rem] font-bold text-primary-blue'>
        {tc('SubCard2.text')} <br /> {tc('SubCard2.text1')} <br /> {tc('SubCard2.text2')}
      </h6>
      <div className=''>
        <Image
          src={'/mascot/2.png'}
          alt='mascot'
          width={384}
          height={478}
          className='pointer-events-none absolute bottom-[5%] right-[3%] z-[1] h-[70%] max-h-[478px] w-auto scale-x-[-1] object-contain md:h-[75%]'
        />
      </div>
      <div className='absolute -bottom-[4%] -right-[2%] hidden aspect-square h-1/2 w-fit rounded-full bg-primary-blue/50 lg:block lg:blur-2xl' />
      <div className='absolute -left-[2%] -top-[4%] hidden aspect-square h-1/2 w-fit rounded-full bg-primary-blue/10 lg:block lg:blur-2xl' />
      <div className='absolute -right-[2%] -top-[4%] hidden aspect-square h-1/3 w-fit rounded-full bg-primary-yellow/10 lg:block lg:blur-2xl' />
      <div className='absolute -left-[2%] bottom-[4%] hidden aspect-square h-1/2 w-fit rounded-full bg-primary-yellow/10 lg:block lg:blur-2xl' />
    </div>
  )
}

export const SubCard3 = () => {
  const tc = useTranslations('Card')

  return (
    <div className='group relative h-full w-full overflow-hidden rounded-[60px] bg-black/[0.02] px-8 xl:px-20'>
      <h6 className='absolute right-[8%] top-[8%] z-[1] text-[4rem] font-bold text-primary-blue'>
        {tc('SubCard3.text')} <br /> {tc('SubCard3.text1')}
      </h6>
      <div className=''>
        <Image
          src={'/mascot/3.png'}
          alt='mascot'
          width={300}
          height={478}
          className='pointer-events-none absolute bottom-[5%] left-[3%] z-[1] h-[70%] max-h-[478px] w-auto object-contain md:h-[75%]'
        />
      </div>
      <div className='absolute -bottom-[4%] -left-[2%] hidden aspect-square h-1/2 w-fit rounded-full bg-primary-blue/50 lg:block lg:blur-2xl' />
      <div className='absolute -right-[2%] -top-[4%] hidden aspect-square h-1/2 w-fit rounded-full bg-primary-blue/10 lg:block lg:blur-2xl' />
      <div className='absolute -left-[2%] -top-[4%] hidden aspect-square h-1/3 w-fit rounded-full bg-primary-yellow/10 lg:block lg:blur-2xl' />
      <div className='absolute -right-[2%] bottom-[4%] hidden aspect-square h-1/2 w-fit rounded-full bg-primary-yellow/10 lg:block lg:blur-2xl' />
    </div>
  )
}
