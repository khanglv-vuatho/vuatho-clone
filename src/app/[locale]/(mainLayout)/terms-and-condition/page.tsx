import BackgroundRelative from '@/components/BackgroundRelative'
import { useTranslations } from 'next-intl'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Điều khoản và điều kiện',
      en: 'Terms and condition',
    }
    const description: any = {
      vi: 'Ứng dụng số 1 Việt Nam',
      en: 'Leading App in Vietnam',
    }
    return {
      title: metadata[params.locale || 'vi'],
      description: description[params.locale || 'vi'],
    }
  } catch (error) {
    console.log(error)
  }
}
function Guides() {
  const t = useTranslations('TermsAndCondition')

  return (
    <div className=''>
      <BackgroundRelative text={t('heading')} />
      <div className=' py-[20px] 13inch:py-[40px] 3xl:py-[80px]'>
        <div className='ct-container-70 gap-10 md:gap-20'>
          <TermsOfService />
        </div>
      </div>
    </div>
  )
}

export default Guides

const TermsOfService = () => {
  const t = useTranslations('TermsAndCondition')

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text1')}</h4>
        <p className='text-[1.8rem]'>{t('text2')}</p>
        <p className='text-[1.8rem]'>{t('text3')}</p>
        <p className='text-[1.8rem]'>
          {t('text4')}
          <a rel='noopener' className='mx-2' href='https://vuatho.com/' target='_blank'>
            {t('vuathocom')}
          </a>
          {t('text4-1')}
          <a rel='noopener' className='mx-2' href='https://vuatho.com/' target='_blank'>
            {t('vuathocom')}
          </a>
          {t('text4-2')}
          <a rel='noopener' className='mx-2' href='https://vuatho.com/' target='_blank'>
            {t('vuathocom')}
          </a>
          {t('text4-3')}
        </p>
        <p className='text-[1.8rem]'>{t('text5')}</p>
        <p className='text-[1.8rem]'>{t('text6')}</p>
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text7')}</h4>
        <p className='text-[1.8rem]'>
          <strong>{t('text8')}</strong>
          {t('text9')}
        </p>
        <p className='text-[1.8rem]'>
          <strong>{t('text10')}</strong>
          {t('text11')}
        </p>
        <p className='text-[1.8rem]'>
          <strong>{t('text12')}</strong>
          {t('text13')}
        </p>
        <p className='text-[1.8rem]'>
          <strong>{t('text14')}</strong>
          {t('text15')}
        </p>
        <p className='text-[1.8rem]'>
          <strong>{t('text16')}</strong> {t('text17')}
        </p>
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text18')}</h4>
        <p className='text-[1.8rem] underline'>{t('text19')}</p>
        <p className='text-[1.8rem]'>{t('text20')}</p>
        <ul className='list-inside list-disc text-[1.8rem]'>
          <li>{t('text21')}</li>
          <li>{t('text22')}</li>
          <li>{t('text23')}</li>
          <li>{t('text24')}</li>
          <li>{t('text25')}</li>
          <li>{t('text26')}</li>
        </ul>
        <p className='text-[1.8rem] underline'>{t('text27')}</p>
        <p className='text-[1.8rem]'>{t('text28')}</p>
        <ul className='list-inside list-disc text-[1.8rem]'>
          <li>{t('text29')}</li>
          <li>{t('text30')}</li>
          <li>{t('text31')}</li>
          <li>{t('text32')}</li>
          <li>{t('text33')}</li>
          <li>{t('text34')}</li>
          <li>{t('text35')}</li>
          <li>
            <strong>{t('text36')}</strong>
          </li>
          <li>{t('text37')}</li>
          <li>{t('text38')}</li>
          <li>
            {t('text39')}
            <strong>{t('text40')}</strong>
            {t('text41')}
          </li>
          <li>{t('text42')}</li>
          <li>{t('text43')}</li>
        </ul>
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text44')}</h4>
        <h5 className='text-[1.8rem] text-[#0B27B6]/90'>{t('text45')}</h5>
        <p className='text-[1.8rem]'>{t('text46')}</p>
        <p className='text-[1.8rem]'>{t('text47')}</p>
        <h5 className='text-[1.8rem] text-[#0B27B6]/90'>{t('text48')}</h5>
        <p className='text-[1.8rem]'>{t('text49')}</p>
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text50')}</h4>
        <h5 className='text-[1.8rem] text-[#0B27B6]/90'>{t('text51')}</h5>
        <p className='text-[1.8rem]'>{t('text52')}</p>
        <p className='text-[1.8rem]'>{t('text53')}</p>
        <p className='text-[1.8rem]'>{t('text54')}</p>
        <h5 className='text-[1.8rem] text-[#0B27B6]/90'>{t('text55')}</h5>
        <p className='text-[1.8rem]'>{t('text56')}</p>
        <h5 className='text-[1.8rem] text-[#0B27B6]/90'>{t('text57')}</h5>
        <p className='text-[1.8rem]'>{t('text58')}</p>
        <ul className='list-inside list-disc text-[1.8rem]'>
          <li>
            {t('text59')}
            <br />
            {t('text60')}
            <br />
            {t('text61')}
            <br />
            {t('text62')}
          </li>
          <li>{t('text63')}</li>
        </ul>
        <p className='text-[1.8rem]'>{t('text64')}</p>
        <p className='text-[1.8rem]'>{t('text65')}</p>
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text66')}</h4>
        <p className='text-[1.8rem]'>{t('text67')}</p>
        <p className='text-[1.8rem]'>{t('text68')}</p>
        <ul className='list-inside list-disc text-[1.8rem]'>
          <li className=''>{t('text69')}</li>
          <li>{t('text70')}</li>
          <li>{t('text71')}</li>
          <li>{t('text72')}</li>
          <li>{t('text73')}</li>
        </ul>
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text74')}</h4>
        <h5 className='text-[1.8rem] text-[#0B27B6]/90'>{t('text75')}</h5>
        <p className='text-[1.8rem]'>{t('text76')}</p>
        <p className='text-[1.8rem]'>{t('text77')}</p>
        <p className='text-[1.8rem]'>{t('text78')}</p>
        <p className='text-[1.8rem]'>{t('text79')}</p>
        <p className='text-[1.8rem]'>{t('text80')}</p>
        <p className='text-[1.8rem]'>{t('text81')}</p>
        <p className='text-[1.8rem]'>{t('text82')}</p>
        <p className='text-[1.8rem]'>{t('text83')}</p>
        <p className='text-[1.8rem]'>{t('text84')}</p>
        <h5 className='text-[1.8rem] text-[#0B27B6]/90'>{t('text85')}</h5>
        <p className='text-[1.8rem]'>{t('text86')}</p>
        <p className='text-[1.8rem]'>{t('text87')}</p>
        <p className='text-[1.8rem]'>{t('text88')}</p>
        <p className='text-[1.8rem]'>{t('text89')}</p>
        <p className='text-[1.8rem]'>{t('text90')}</p>
        <p className='text-[1.8rem]'>{t('text91')}</p>
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text92')}</h4>
        <p className='text-[1.8rem]'>{t('text93')}</p>
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text94')}</h4>
        <p className='text-[1.8rem]'>
          {t('text95')}
          <a rel='noopener' className='mx-2' href='https://vuatho.com/' target='_blank'>
            {t('vuathocom')}.
          </a>
        </p>
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text96')}</h4>
        <p className='text-[1.8rem]'>{t('text97')}</p>
        <p className='text-[1.8rem]'>{t('text98')}</p>
        <ul className='list-inside list-disc text-[1.8rem]'>
          <li>{t('text99')}</li>
          <li>{t('text100')}</li>
          <li>{t('text101')}</li>
          <li>{t('text102')}</li>
          <li>{t('text103')}</li>
        </ul>
        <p className='text-[1.8rem]'>{t('text104')}</p>
        <ul className='list-inside list-disc text-[1.8rem]'>
          <li>{t('text105')}</li>
          <li>{t('text106')}</li>
          <li>{t('text107')}</li>
          <li>{t('text108')}</li>
        </ul>
        <p className='text-[1.8rem]'>{t('text109')}</p>
        <p className='text-[1.8rem]'>{t('text110')}</p>
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text111')}</h4>
        <p className='text-[1.8rem]'>{t('text112')}</p>
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text113')}</h4>
        <p className='text-[1.8rem]'>{t('text114')}</p>
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text115')}</h4>
        <p className='text-[1.8rem]'>{t('text116')}</p>
        <p className='text-[1.8rem]'>{t('text117')}</p>
        <p className='text-[1.8rem]'>{t('text118')}</p>
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text119')}</h4>
        <p className='text-[1.8rem]'>{t('text120')}</p>
        <p className='text-[1.8rem]'>{t('text121')}</p>
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text122')}</h4>
        <p className='text-[1.8rem]'>{t('text123')}</p>
        <p className='text-[1.8rem]'>{t('text124')}</p>
        <p className='text-[1.8rem]'>{t('text125')}</p>
      </div>
    </div>
  )
}
