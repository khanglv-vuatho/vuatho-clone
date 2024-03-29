import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import QRCode from 'react-qr-code'

import { Apple as AppleIcon, GooglePlay as GooglePlayIcon } from 'iconsax-react'

function DownloadApps({ width, height, hidden = false, gap = false }: { width?: number; height?: number; hidden?: boolean; gap?: boolean }) {
  return (
    <div className='mt-2 flex w-full items-center justify-center gap-2 md:mt-0 md:justify-start 13inch:gap-8'>
      {!hidden && (
        <div className='relative hidden h-[120px] w-[120px] md:block 13inch:h-[150px] 13inch:w-[150px]'>
          <Image alt='QRCode' src={'/QRCODE.png'} fill className='pointer-events-none hover:cursor-pointer' />
        </div>
      )}
      <div className={`flex items-center md:flex-col ${gap ? 'w-full justify-between gap-2 md:flex-col' : 'gap-2 13inch:gap-[20px]'}`}>
        <Link href={'/'}>
          <div className='relative h-[50px] w-[160px] 13inch:h-[60px] 13inch:w-[200px]'>
            <Image alt='DownloadGooglePlay' src={'/DownloadGooglePlay1.svg'} height={height || 80} width={width || 260} className='pointer-events-none hover:cursor-pointer' />
          </div>
        </Link>
        <Link href={'/'}>
          <div className='relative h-[50px] w-[160px] 13inch:h-[60px] 13inch:w-[200px]'>
            <Image alt='DownloadAppStore' src={'/DownloadAppStore.svg'} height={height || 80} width={width || 260} className='pointer-events-none hover:cursor-pointer' />
          </div>
        </Link>
      </div>
    </div>
  )
}

export const AndroidBtn: React.FC<{ style?: any }> = ({ style }) => {
  const t = useTranslations('Download')

  return (
    <a
      href='https://play.google.com/store/apps/details?id=com.vuatho.mobile&pli=1'
      target='_blank'
      className={twMerge('group relative flex w-full max-w-[180px] select-none items-center gap-4 overflow-hidden rounded-xl bg-black p-4 text-white 2xl:min-w-[140px]', style)}
    >
      <GooglePlayIcon variant='Bold' size={36} />
      <div>
        <span className='text-[1.2rem] text-white/70'>{t('download_chplay')}</span>
        <p className='text-[1.2rem] md:text-[1.5rem] 3xl:text-[1.7rem]'>Google Play</p>
      </div>
      <div className='absolute -right-1/3 top-0 h-full w-1/2 -skew-x-[30deg] bg-white/[0.15] transition group-hover:-translate-x-1/2' />
      <div className='absolute -right-1/2 top-0 h-full w-1/2 -skew-x-[30deg] bg-white/10 transition group-hover:-translate-x-1/2' />
    </a>
  )
}

export const IosBtn: React.FC<{ style?: any }> = ({ style }) => {
  const t = useTranslations('Download')

  return (
    <a
      href='https://apps.apple.com/vn/app/vua-th%E1%BB%A3-si%C3%AAu-k%E1%BA%BFt-n%E1%BB%91i/id6467541777?l=vi'
      target='_blank'
      className={twMerge('group relative flex w-full max-w-[180px] select-none items-center gap-4 overflow-hidden rounded-xl bg-black p-4 text-white 2xl:min-w-[140px]', style)}
    >
      <AppleIcon variant='Bold' size={36} />
      <div>
        <span className='text-[1.2rem] text-white/70'>{t('download_appstore')}</span>
        <p className='text-[1.2rem] md:text-[1.5rem] 3xl:text-[1.7rem]'>App Store</p>
      </div>
      <div className='absolute -right-1/3 top-0 h-full w-1/2 -skew-x-[30deg] bg-white/[0.15] transition group-hover:-translate-x-1/2' />
      <div className='absolute -right-1/2 top-0 h-full w-1/2 -skew-x-[30deg] bg-white/10 transition group-hover:-translate-x-1/2' />
    </a>
  )
}

export const QrCode: React.FC<{ height?: string }> = ({ height }) => {
  return <QRCode value='https://vuatho.com/vi/qrcode-download-app' size={128} className={`${height ? height : 'size-[140px]'} relative z-[1] aspect-square w-auto object-contain`} />
}

export default DownloadApps
