import { useTranslations } from 'next-intl'

const Regards = () => {
  const t = useTranslations('Regards')

  return (
    <div className='text-right '>
      <p>{t('text')},</p>
      <p>{t('text1')}</p>
    </div>
  )
}

export default Regards
