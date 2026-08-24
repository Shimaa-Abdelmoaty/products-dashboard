import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

function Input({ label, error, id, ...props }: InputProps) {
  return (
    <label>
      {label}
      <input id={id} {...props} />
      {error && <span role="alert">{error}</span>}
    </label>
  )
}

export default Input