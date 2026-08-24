type LoadingProps = {
  label?: string
  size?: 'small' | 'medium' | 'large'
}

function Loading({
  label = 'Loading products...',
  size = 'medium',
}: LoadingProps) {
  return (
    <p role="status" data-size={size}>
      {label}
    </p>
  )
}

export default Loading