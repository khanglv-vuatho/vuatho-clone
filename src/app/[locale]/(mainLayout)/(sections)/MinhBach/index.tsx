import ListDataSection from '@/components/ListDataSection'
import { useTranslations } from 'next-intl'

const MinhBach = () => {
  const t = useTranslations('MinhBach')
  const td = useTranslations('Extra')

  const listData = [
    {
      title: t('listData.title1'),
      desc: t('listData.desc1')
    },
    {
      title: t('listData.title2'),
      desc: t('listData.desc2')
    },
    {
      title: t('listData.title3'),
      desc: t('listData.desc3')
    },
    {
      title: t('listData.title4'),
      desc: t('listData.desc4')
    },
    {
      title: t('listData.title5'),
      desc: t('listData.desc5')
    },
    {
      title: t('listData.title6'),
      desc: t('listData.desc6')
    }
  ]

  return <ListDataSection data={listData} subHeading={td('text1')} heading={t('heading')} />
}

export default MinhBach
