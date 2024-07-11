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
      <div className={`flex items-center md:flex-col ${gap ? 'w-full justify-between gap-2 md:flex-col' : 'gap-2 13inch:gap-5'}`}>
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
      className={twMerge(
        'group relative flex w-[150px] select-none items-center gap-1 overflow-hidden rounded-xl bg-primary-yellow px-4 py-2 text-baseBlack lg:w-[200px] lg:gap-2 lg:px-6 lg:py-4 2xl:gap-4',
        style
      )}
    >
      <GooglePlayIcon variant='Bold' size={36} className='flex size-6 flex-shrink-0 lg:size-9' />
      <div className='flex flex-col text-baseBlack 2xl:gap-1'>
        <span className='whitespace-nowrap text-sm'>{t('download_chplay')}</span>
        <p className='whitespace-nowrap text-sm xs:text-base 3xl:text-lg'>Google Play</p>
      </div>
    </a>
  )
}

export const IosBtn: React.FC<{ style?: any }> = ({ style }) => {
  const t = useTranslations('Download')

  return (
    <a
      href='https://apps.apple.com/vn/app/vua-th%E1%BB%A3-si%C3%AAu-k%E1%BA%BFt-n%E1%BB%91i/id6467541777?l=vi'
      target='_blank'
      className={twMerge(
        'group relative flex w-[150px] select-none items-center gap-1 overflow-hidden rounded-xl bg-primary-yellow px-4 py-2 text-baseBlack lg:w-[200px] lg:gap-2 lg:px-6 lg:py-4 2xl:gap-4',
        style
      )}
    >
      <AppleIcon variant='Bold' size={36} className='flex size-6 flex-shrink-0 lg:size-9' />
      <div className='flex flex-col text-baseBlack 2xl:gap-1'>
        <span className='whitespace-nowrap text-sm'>{t('download_appstore')}</span>
        <p className='whitespace-nowrap text-sm xs:text-base 3xl:text-lg'>App Store</p>
      </div>
    </a>
  )
}

export const QrCode: React.FC<{ height?: string }> = ({ height }) => {
  return <QRCode value='https://vuatho.com/vi/qrcode-download-app' size={128} className={`${height ? height : 'size-[140px]'} relative z-[1] aspect-square w-auto object-contain`} />
}

export default DownloadApps
