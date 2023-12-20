import { twMerge } from 'tailwind-merge'

import { AndroidBtn, IosBtn, QrCode } from '../DownloadApps'

export const Download = ({ style }: { style?: string }) => {
  return (
    <div
      className={twMerge(
        'mt-5 flex w-full items-center justify-center gap-5 md:justify-start',
        style,
      )}
    >
      <QrCode height='2xl:h-[140px] h-[100px]' />
      <div className='space-y-2'>
        <AndroidBtn />
        <IosBtn />
      </div>
    </div>
  )
}
