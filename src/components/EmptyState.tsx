import { Link } from 'react-router'

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-14 text-center">
      <p className="text-lg font-semibold text-slate-100">No products yet</p>
      <p className="mt-2 text-sm text-slate-500">Your catalog is empty.</p>
      <Link to="/products/add" className="mt-6 inline-flex min-h-10 items-center rounded-lg bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300">
        Add product
      </Link>
    </div>
  )
}

export default EmptyState