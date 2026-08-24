import type { SelectHTMLAttributes } from 'react'

export type SelectOption<T> = {
  label: string
  value: T
}

type SelectProps<T> = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'value' | 'onChange' | 'children'
> & {
  label: string
  value: T
  options: readonly SelectOption<T>[]
  onChange: (value: T) => void
}

function Select<T>({
  label,
  value,
  options,
  onChange,
  ...props
}: SelectProps<T>) {
  const selectedIndex = options.findIndex((option) => option.value === value)

  return (
    <label className="grid gap-2 text-sm font-medium text-slate-300">
      {label}
      <select
        {...props}
        value={String(selectedIndex === -1 ? 0 : selectedIndex)}
        className={`min-h-11 rounded-lg border border-slate-700 bg-slate-950/70 px-3 text-sm text-slate-100 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 ${props.className ?? ''}`}
        onChange={(event) => {
          const selectedOption = options[Number(event.currentTarget.value)]

          if (selectedOption) {
            onChange(selectedOption.value)
          }
        }}
      >
        {options.map((option, index) => (
          <option key={option.label} value={String(index)}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default Select