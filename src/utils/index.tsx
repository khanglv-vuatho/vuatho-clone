import ToastComponent from '@/components/ToastComponent'
import moment from 'moment'

export const formatMoney = (value: number, isNumber?: boolean) => {
  let formatNumber = value
  if (Number(value) % 1 !== 0) {
    const splitted = String(value)?.split('.')
    formatNumber = splitted[1]?.length > 3 ? Number(`${splitted[0]}.${splitted[1].slice(0, 3)}`) : value
  }
  return isNumber ? formatNumber : formatNumber?.toLocaleString('en') || '0'
}

export const normalizeKeyword = (keyword: string) => {
  return (keyword as string)
    .normalize('NFD')
    .toLowerCase()
    .replace(/[\u0300-\u036f\s]/g, '')
    .replace('đ', 'd')
}

export const formatDDMMYYYY = (time: string) => {
  return moment(time).format('DD/MM/YYYY')
}
export const convertToLowerCase = (str: string) => {
  return str.toLowerCase()
}

export const ShouldRenderGrid = (data: { text: string; bold?: boolean }[]) => {
  switch (data?.length) {
    case 1:
      return (
        <div className='grid grid-cols-1'>
          <p className={' text-[#FF4343]'}>{data?.[0]?.text}</p>
        </div>
      )
      break
    case 2:
      return (
        <div className='grid grid-cols-3 gap-2'>
          {data?.map((item, index) => (
            <p key={item.text} className={`${index === data?.length - 1 ? 'col-span-2 text-[#FF4343]' : ''} `}>
              {item.text}
            </p>
          ))}
        </div>
      )
      break
    case 3:
      return (
        <div className='grid grid-cols-3 gap-2'>
          {data?.map((item, index) => (
            <p key={item.text} className={`${index === data?.length - 1 ? 'text-[#FF4343]' : ''} ${item.bold ? 'text-xl !font-bold !text-baseBlack' : ''}`}>
              {item.text}
            </p>
          ))}
        </div>
      )
      break
  }
}

export function objectToFormData(obj: any) {
  const formData = new FormData()

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      const valueIsFile = value instanceof File

      const isArrayData = Array.isArray(value)
      const initialValue = typeof value === 'number' ? Number(value) : ''

      if (isArrayData) {
        const isFile = value.some((item) => item instanceof File)
        if (isFile) {
          Array.prototype.forEach.call(value, (item) => {
            formData.append(key, item)
          })
        } else {
          formData.append(key, value ? JSON.stringify(value) : '')
        }
      } else {
        if (typeof value === 'object' && !isArrayData && !valueIsFile) {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value || initialValue)
        }
      }
    }
  }

  return formData
}

export const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)

type TPostMessage = { message: string; data?: any }
export const postMessageCustom = ({ message, data = {} }: TPostMessage) => {
  //@ts-ignore
  if (window?.vuatho) {
    //@ts-ignore
    window?.vuatho?.postMessage(
      JSON.stringify({
        message,
        data
      })
    )
  } else {
    ToastComponent({ message: message || 'has bug here', type: 'error' })
  }
}
