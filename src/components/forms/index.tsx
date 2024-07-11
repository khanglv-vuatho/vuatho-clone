import { ErrorMessage } from '@hookform/error-message'
import React from 'react'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'
import { Input, InputProps } from '@nextui-org/react'

type TProps = Omit<any, 'name' | 'status'> &
  Pick<UseControllerProps, 'rules'> & {
    name: string
    placeholder: string
    label?: string
    required?: boolean
    tabIndex?: number | undefined
    handlePressEnter?: Function
  } & InputProps

const FormInput: React.FC<TProps> = ({ onChange: onChange1, onBlur: onBlur1, name, rules, label, required = false, tabIndex, handlePressEnter, placeholder, ...props }) => {
  const { control } = useFormContext()

  return (
    <>
      <label className='text-text-blur mb-1 block text-sm font-medium' htmlFor={name}>
        {label} {required === true && <span className='text-red-700'>*</span>}
      </label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ fieldState: { error }, field: { onChange, onBlur, ...field }, formState: { errors } }) => {
          return (
            <>
              <Input
                onChange={(e) => {
                  onChange(e)
                  onChange1?.(e)
                }}
                onBlur={(e) => {
                  onBlur()
                  onBlur1?.(e)
                }}
                {...{ ...props, ...field }}
                tabIndex={tabIndex}
                placeholder={placeholder}
                className='khang'
                classNames={{
                  base: '1',
                  clearButton: '2',
                  input: '3',
                  description: '4',
                  errorMessage: '5',
                  helperWrapper: '6',
                  innerWrapper: '7',
                  inputWrapper: '8',
                  label: '9',
                  mainWrapper: '10'
                }}
              />
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => {
                  return <p className='mt-1 text-xs font-medium text-red-200'>{message}</p>
                }}
              />
            </>
          )
        }}
      />
    </>
  )
}

export default FormInput
