import ListDataSection from '@/components/ListDataSection'
import { useTranslations } from 'next-intl'

const HinhThucKetNoi = () => {
  const t = useTranslations('HinhThucKetNoi')
  const td = useTranslations('Extra')

  const dataLabel: { title: string; desc: string }[] = [
    {
      title: t('listData.label1'),
      desc: t('listData.description1')
    },
    {
      title: t('listData.label2'),
      desc: t('listData.description2')
    },
    {
      title: t('listData.label3'),
      desc: t('listData.description3')
    },
    {
      title: t('listData.label4'),
      desc: t('listData.description4')
    },
    {
      title: t('listData.label5'),
      desc: t('listData.description5')
    },
    {
      title: t('listData.label6'),
      desc: t('listData.description6')
    }
  ]

  return (
    <section id='multi'>
      <ListDataSection data={dataLabel} subHeading={td('text2')} heading={t('heading')} />
    </section>
  )
}

export default HinhThucKetNoi
