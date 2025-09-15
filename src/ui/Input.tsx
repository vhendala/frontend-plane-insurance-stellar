import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'outline' | 'filled'
  size?: 'sm' | 'md' | 'lg'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          'flex w-full rounded-xl border-2 font-medium transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDDA24] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          {
            'border-[#FDDA24]/30 bg-white/90 text-[#0F0F0F] placeholder:text-[#0F0F0F]/50 focus:border-[#FDDA24] hover:border-[#FDDA24]/50': variant === 'default',
            'border-[#B7ACE8] bg-transparent text-[#0F0F0F] placeholder:text-[#0F0F0F]/50 focus:border-[#FDDA24] hover:border-[#B7ACE8]': variant === 'outline',
            'border-[#D6D2C4] bg-[#F6F7F8] text-[#0F0F0F] placeholder:text-[#0F0F0F]/50 focus:border-[#FDDA24] hover:border-[#B7ACE8]': variant === 'filled',
          },
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-12 px-4 text-base': size === 'md',
            'h-14 px-6 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
