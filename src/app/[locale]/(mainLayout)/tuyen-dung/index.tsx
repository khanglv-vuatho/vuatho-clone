'use client'

import { Button, Divider, Input, Skeleton, Textarea, useDisclosure } from '@nextui-org/react'
import { Add, DocumentUpload, Trash } from 'iconsax-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import ImageFallback from '@/components/ImageFallback'
import TabsCustom from '@/components/TabsCustom'
import ToastComponent from '@/components/ToastComponent'
import { DefaultModal } from '@/components/modal'
import instance from '@/services/axiosConfig'
import { objectToFormData, validateEmail } from '@/utils'

const TabListJobs = () => {
  const t = useTranslations('Career')
  const ts = useTranslations('Store')
  const tc = useTranslations('ContactUs')

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  const [onFetching, setOnFetching] = useState(false)
  const [data, setData] = useState([])
  const [onSending, setOnSending] = useState(false)
  const [mounted, setMounted] = useState(false)

  const inputPdfRef: any = useRef(null)

  const initStateInfo = {
    name: '',
    birthday: '',
    position: '',
    description: '',
    phone: '',
    email: '',
    uploadedFile: '',
    jobId: ''
  }

  const [infoCV, setInfoCV] = useState<any>(initStateInfo)

  const initErrorInfo = {
    name: false,
    birthday: false,
    position: false,
    description: false,
    email: false,
    phone: false,
    uploadedFile: false
  }

  const [errorInfo, setErrorInfo] = useState<any>(initErrorInfo)

  const listInputInfo = [
    {
      title: 'Họ và tên',
      name: 'name'
    },
    { title: 'DD/MM/YYYY', name: 'birthday' },
    { title: 'Email', name: 'email' },
    { title: 'Số điện thoại', name: 'phone' },
    { title: 'Vị trí ứng tuyển', name: 'position' },
    { title: 'Giới thiệu bản thân', name: 'description', type: 'textarea' }
  ]
  const handleFetch = async () => {
    try {
      const { data } = await instance.get('/recruitments')
      setData(data)
    } catch (error) {
      console.log(error)
    } finally {
      setOnFetching(false)
    }
  }
  const handleFileChange = (event: any) => {
    const uploadedFile = event.target.files[0]

    if (event.target.files[0] && event.target.files[0].type === 'application/pdf') {
      setInfoCV({ ...infoCV, uploadedFile: uploadedFile })
    } else {
      ToastComponent({
        message: t('toastErrorPDF'),
        type: 'error'
      })
    }

    event.target.value = ''
  }

  const handleUploadClick = () => {
    inputPdfRef?.current?.click()
  }

  const handleDeleteFile = () => {
    setInfoCV({ ...infoCV, uploadedFile: null })
  }

  const handleSendInfo = async () => {
    const payload = {
      fullName: infoCV.name,
      dob: infoCV.birthday,
      phone: infoCV.phone,
      email: infoCV.email,
      description: infoCV.description,
      fileUpload: infoCV.uploadedFile,
      jobId: infoCV.jobId
    }

    const formData = objectToFormData(payload)

    try {
      const data: { message: string; status: number } = await instance.post('/recruitments', formData)
      ToastComponent({
        message: data?.message,
        type: 'success'
      })

      setInfoCV(initStateInfo)
      setErrorInfo(initErrorInfo)
      onClose()
    } catch (error: any) {
      console.log(error)
      ToastComponent({
        message: error?.response?.data?.message,
        type: 'error'
      })
    } finally {
      setOnSending(false)
    }
  }
  const handleChangeInput = (e: any) => {
    setErrorInfo({ ...errorInfo, [e.target.name]: false })
    setInfoCV({ ...infoCV, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const checkError = {
      name: infoCV.name === '',
      birthday: infoCV.birthday === '',
      position: infoCV.position === '',
      email: !validateEmail(infoCV.email),
      phone: infoCV.phone === '',
      description: infoCV.description === '',
      uploadedFile: !infoCV.uploadedFile
    }

    setErrorInfo(checkError)

    if (Object.values(checkError).some((item) => item === true)) {
      ToastComponent({ message: ts('text17'), type: 'error' })
      setOnSending(false)
      return
    } else {
      //send api
      setOnSending(true)
    }
  }

  useEffect(() => {
    onSending && handleSendInfo()
  }, [onSending])

  useEffect(() => {
    if (isOpen === false) {
      setInfoCV(initStateInfo)
      setErrorInfo(initErrorInfo)
    }
  }, [isOpen])

  useEffect(() => {
    onFetching && handleFetch()
  }, [onFetching])

  useEffect(() => {
    setOnFetching(true)
  }, [])

  const handleOpenModal = (position: string, jobId: string) => {
    setInfoCV((prev: any) => ({ ...prev, position, jobId }))
    onOpen()
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      {onFetching ? (
        <div className='flex flex-col gap-8'>
          <div className='grid grid-cols-4 gap-4 overflow-auto'>
            <Skeleton className='h-[44px] rounded-xl' />
            <Skeleton className='h-[44px] rounded-xl' />
            <Skeleton className='h-[44px] rounded-xl' />
            <Skeleton className='h-[44px] rounded-xl' />
          </div>
          <Divider className='w-full' />
          <Skeleton className='h-[500px] w-full rounded-xl' />
        </div>
      ) : !!data?.length ? (
        <div className='flex min-h-[500px] flex-col gap-6 rounded-3xl bg-white lg:p-6'>
          <TabsCustom data={data} handleOpenModal={handleOpenModal as any} />
          <DefaultModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            hiddenHeader
            size='5xl'
            modalBody={
              <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-6'>
                <div className='flex justify-end'>
                  <Button isIconOnly variant='light' disableAnimation disableRipple className='rounded-full p-2' onClick={onClose}>
                    <Add className='flex size-[36px] flex-shrink-0 rotate-45' />
                  </Button>
                </div>
                <div className='mt-[-40px] flex flex-col items-center gap-2 lg:mt-[-8px]'>
                  <ImageFallback src={'/logo/logo.svg'} alt='logo' height={120} width={120} className='size-[60px] lg:size-[120px]' />
                  <p className='text-2xl font-semibold uppercase text-primary-yellow'>{infoCV?.position}</p>
                </div>
                <div className='flex flex-col gap-4'>
                  {listInputInfo?.map((item, index) => {
                    if (item.name === 'position') return
                    if (item.type === 'textarea') {
                      return (
                        <div className='flex flex-col gap-2' key={index}>
                          <Textarea
                            autoComplete='off'
                            name={item.name}
                            placeholder={item.title}
                            value={infoCV?.[item.title.toLowerCase()]}
                            onChange={(e) => handleChangeInput(e)}
                            minRows={3}
                            isInvalid={errorInfo?.[item.name]}
                            errorMessage={errorInfo?.[item.name] ? `${t('text1')} ${item.title.toLowerCase()}` : ''}
                          />
                        </div>
                      )
                    }
                    return (
                      <div className='flex flex-col gap-2' key={index}>
                        <Input
                          autoComplete='off'
                          type={item.name === 'email' ? 'email' : 'text'}
                          key={index}
                          name={item.name}
                          placeholder={item.title}
                          value={infoCV?.[item.name.toLowerCase()]}
                          onChange={(e) => handleChangeInput(e)}
                          classNames={{ inputWrapper: 'pl-4 min-h-[48px]', input: 'placeholder:py-4' }}
                          isInvalid={errorInfo?.[item.name]}
                          errorMessage={errorInfo?.[item.name] ? (item.name === 'email' ? t('text19') : `${t('text1')} ${item.title.toLowerCase()}`) : ''}
                        />
                      </div>
                    )
                  })}
                  <div>
                    <input ref={inputPdfRef} type='file' accept='application/pdf' onChange={handleFileChange} className='hidden' />
                    {infoCV?.uploadedFile?.name ? (
                      <div className='flex items-center gap-4'>
                        <span>{infoCV?.uploadedFile?.name}</span>
                        <Button
                          isIconOnly
                          radius='full'
                          onClick={handleDeleteFile}
                          variant='light'
                          className='group flex min-h-[44px] min-w-[44px] items-center justify-center duration-200 hover:bg-red-500/80'
                        >
                          <Trash className='duration-200 group-hover:text-red-500' />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        endContent={<DocumentUpload />}
                        className={`min-h-[48px] w-full border-1 border-[#E4E4E4] py-4 text-[#212121] ${errorInfo?.uploadedFile ? 'border-red-500 text-red-500' : 'border-[#E4E4E4]'}`}
                        variant='bordered'
                        onClick={handleUploadClick}
                      >
                        Tải lên CV (.PDF)
                      </Button>
                    )}
                  </div>
                </div>
                <Button isLoading={onSending} type='submit' onClick={(e) => handleSubmit(e)} className='min-h-[48px] bg-primary-blue font-bold text-white'>
                  Xác nhận
                </Button>
              </form>
            }
          />
        </div>
      ) : (
        <div className='mt-10 flex min-h-[500px] items-center justify-center gap-6 rounded-3xl bg-white p-6 shadow-[0px_8px_32px_0px_#00000014]'>
          <div className='flex flex-col items-center gap-6'>
            <ImageFallback src={'/press/no-data.png'} alt='/press/no-data.png' />
            <p className='text-xl text-[#282828]'>{t('text5')}</p>
          </div>
        </div>
      )}
    </>
  )
}

export { TabListJobs }
