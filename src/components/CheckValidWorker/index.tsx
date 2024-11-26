import React, { useEffect, useState } from 'react'
import ModalComfirmPhone from '../ModalComfirmPhone'
import instance from '@/services/axiosConfig'
import { useTranslations } from 'next-intl'
import { useDispatch } from 'react-redux'

type TCheckValidWorker = {
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
  setToken: (value: string) => void
  setValidToken: (value: boolean) => void
  initPhoneValue: string
}

const CheckValidWorker = ({ isOpenModal, initPhoneValue, setIsOpenModal, setToken, setValidToken }: TCheckValidWorker) => {
  const t = useTranslations('Store')

  const [onSending, setOnSending] = useState<boolean>(false)
  const [phone, setPhone] = useState(!!initPhoneValue.length ? initPhoneValue : '')
  const [phoneCountry, setPhoneCountry] = useState('+84')

  const handleCheckValid = async () => {
    try {
      const data: any = await instance.post('/uniforms/confirm_worker', {
        phone,
        phone_code: phoneCountry || '+84'
      })

      if (data.status == 200) {
        localStorage.setItem('token', data.token)
        setValidToken(true)
        setToken(data.token)
      }
    } catch (error: any) {
      console.log(error)
      setValidToken(false)
    } finally {
      setOnSending(false)
      setIsOpenModal(false)
    }
  }

  useEffect(() => {
    onSending && handleCheckValid()
  }, [onSending])

  return <ModalComfirmPhone isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} setPhone={setPhone} phone={phone} onSending={onSending} setOnSending={setOnSending} />
}

export default CheckValidWorker
