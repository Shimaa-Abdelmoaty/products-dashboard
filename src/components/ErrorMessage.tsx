import Button from './Button'

type ErrorMessageProps = {
  message: string
  onRetry: () => void
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-6">
      <p className="font-semibold text-rose-100">Something went wrong</p>
      <p className="mt-2 text-sm text-rose-200/80">{message}</p>
      <Button type="button" variant="secondary" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}

export default ErrorMessage