import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  loading?: boolean
}

function Button({
  variant = 'primary',
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      data-variant={variant}
      className={`inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 disabled:cursor-not-allowed disabled:opacity-50 ${
        variant === 'danger'
          ? 'bg-rose-500 text-white hover:bg-rose-400'
          : variant === 'secondary'
            ? 'border border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-600 hover:bg-slate-800'
            : 'bg-teal-400 text-slate-950 hover:bg-teal-300'
      } ${props.className ?? ''}`}
    >
      {loading ? 'Working...' : children}
    </button>
  )
}

export default Button