import { Button } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'

type BtnType = {
  children: React.ReactNode
  onClick?: any
  isLoading?: boolean
  isDisabled?: boolean
  style?: string
  title?: string
  type?: 'button' | 'submit' | 'reset'
}

export const PrimaryBtn: React.FC<BtnType> = ({
  children,
  onClick,
  isLoading,
  isDisabled,
  style,
  title,
}) => {
  return (
    <Button
      onClick={onClick}
      isLoading={isLoading}
      isDisabled={isDisabled}
      title={title}
      className={twMerge(
        'h-12 min-w-[7rem] rounded-lg bg-gradient-to-r from-[#376AA1] via-[#3748A0] to-[#376AA1] bg-[length:200%_100%] px-6 font-medium text-white transition-[all_0.4s_ease-in-out] hover:bg-[100%_0%] ',
        style,
      )}
    >
      {children}
    </Button>
  )
}

export const IconBtn: React.FC<BtnType> = ({
  children,
  onClick,
  isLoading,
  isDisabled,
  style,
  title,
  type,
}) => {
  return (
    <Button
      onClick={onClick}
      title={title}
      isIconOnly
      startContent={children}
      isLoading={isLoading}
      isDisabled={isDisabled}
      type={type || 'button'}
      className={twMerge('aspect-square h-12 w-fit rounded-full bg-white ', style)}
    />
  )
}

export const BorderedBtn: React.FC<BtnType> = ({
  children,
  onClick,
  isLoading,
  isDisabled,
  style,
  title,
}) => {
  return (
    <Button
      onClick={onClick}
      title={title}
      isLoading={isLoading}
      isDisabled={isDisabled}
      className={twMerge(
        'h-12 min-w-[7rem] rounded-lg border-2 border-primary-blue bg-white px-6 font-medium text-primary-blue ',
        style,
      )}
    >
      {children}
    </Button>
  )
}
