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
    <label>
      {label}
      <select
        {...props}
        value={String(selectedIndex === -1 ? 0 : selectedIndex)}
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