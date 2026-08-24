import Button from './Button'

type ErrorMessageProps = {
  message: string
  onRetry: () => void
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div role="alert">
      <p>{message}</p>
      <Button type="button" variant="secondary" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}

export default ErrorMessage