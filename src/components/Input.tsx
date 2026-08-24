import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

function Input({ label, error, id, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replaceAll(' ', '-')

  return (
    <label htmlFor={inputId} className="grid gap-2 text-sm font-medium text-slate-300">
      {label}
      <input
        id={inputId}
        {...props}
        className={`min-h-11 rounded-lg border bg-slate-950/70 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 ${
          error ? 'border-rose-500/70' : 'border-slate-700'
        } ${props.className ?? ''}`}
      />
      {error && <span role="alert" className="text-xs text-rose-300">{error}</span>}
    </label>
  )
}

export default Input