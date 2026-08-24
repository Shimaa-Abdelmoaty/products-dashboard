type LoadingProps = {
  label?: string
  size?: 'small' | 'medium' | 'large'
}

function Loading({
  label = 'Loading products...',
  size = 'medium',
}: LoadingProps) {
  return (
    <div role="status" data-size={size} className="grid gap-6">
      <div className="flex items-center gap-3 text-sm font-medium text-slate-400">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-700 border-t-teal-300" />
        {label}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-80 animate-pulse rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="h-40 rounded-lg bg-slate-800" />
            <div className="mt-5 h-3 w-20 rounded bg-slate-800" />
            <div className="mt-3 h-5 w-4/5 rounded bg-slate-800" />
            <div className="mt-6 h-4 w-1/3 rounded bg-slate-800" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading