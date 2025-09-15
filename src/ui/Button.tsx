import { ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={clsx(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDDA24] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95',
          {
            'bg-[#FDDA24] text-[#0F0F0F] hover:bg-[#B7ACE8] hover:text-[#0F0F0F] shadow-[#FDDA24]/25': variant === 'default',
            'border-2 border-[#FDDA24] bg-transparent text-[#FDDA24] hover:bg-[#FDDA24] hover:text-[#0F0F0F]': variant === 'outline',
            'text-[#0F0F0F] hover:bg-[#F6F7F8] hover:text-[#0F0F0F]': variant === 'ghost',
            'bg-[#00A7B5] text-white hover:bg-[#002E5D] shadow-[#00A7B5]/25': variant === 'secondary',
            'bg-[#B7ACE8] text-[#0F0F0F] hover:bg-[#D6D2C4] shadow-[#B7ACE8]/25': variant === 'accent',
            'bg-red-600 text-white hover:bg-red-700 shadow-red-600/25': variant === 'destructive',
          },
          {
            'h-8 px-4 text-sm': size === 'sm',
            'h-10 px-6 py-2': size === 'md',
            'h-12 px-8 text-lg': size === 'lg',
            'h-14 px-10 text-xl': size === 'xl',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
