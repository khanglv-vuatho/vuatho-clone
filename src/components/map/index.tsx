'use client'
import React, { useState, useEffect } from 'react'
import WorldMap from 'react-svg-worldmap'
import { CountryContext } from 'react-svg-worldmap/dist/types'
import { useRouter } from '@/navigation'
import Instance from '@/services/axiosConfig'
import { useSearchParams } from 'next/navigation'

const Default = React.memo((props: any) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const servicesID = searchParams.get('services')
  const country = searchParams.get('country')

  const [data, setData] = useState<any[]>([])
  const [onFetching, sOnFetching] = useState(false)

  const _ServerFetching = () => {
    Instance({
      method: 'get',
      url: '/provider-world',
      params: {
        country: country,
        services: servicesID,
      },
    })
      .then(function (response: any) {
        setData(response)
      })
      .finally(() => {
        sOnFetching(false)
      })
  }

  useEffect(() => {
    sOnFetching(true)
  }, [country, servicesID])

  useEffect(() => {
    onFetching && _ServerFetching()
  }, [onFetching])

  const clickAction = React.useCallback(
    ({ countryName, countryCode, countryValue }: CountryContext) => {
      const query: any = {}
      if (countryCode) {
        query['country'] = countryCode?.toLowerCase()
      }
      if (servicesID) {
        query['services'] = servicesID
      }
      router.push({
        pathname: '/services',
        query: query,
      })
    },
    [],
  )

  const getStyle = (data: any) => {
    const value = data.countryValue || 0
    return {
      fill: value > 0 ? '#f5b500' : data.color,
      fillOpacity: 1,
      stroke: 'black',
      strokeWidth: 1,
      strokeOpacity: 0.2,
      cursor: 'pointer',
    }
  }

  return (
    <div className='hidden w-full xl:block'>
      <WorldMap
        onClickFunction={clickAction}
        color='white'
        value-suffix='people'
        size='responsive'
        data={data}
        styleFunction={getStyle}
      />
    </div>
  )
})

export default Default
