import { Link } from 'react-router'
import type { Product } from '../types/product'

type ProductCardProps = {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex min-h-[390px] flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900">
      <Link to={`/products/${product.id}`} className="flex flex-1 flex-col">
        <div className="flex h-48 items-center justify-center border-b border-slate-800 bg-white p-6">
          <img src={product.image} alt={product.title} width="180" height="180" className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className="w-fit rounded-full bg-teal-400/10 px-2.5 py-1 text-xs font-semibold capitalize text-teal-300">{product.category}</span>
          <h2 className="mt-4 line-clamp-2 text-base font-semibold leading-6 text-slate-100">{product.title}</h2>
          <div className="mt-auto flex items-end justify-between gap-3 pt-6">
            <p className="text-xl font-bold tracking-tight text-white">${product.price.toFixed(2)}</p>
            {product.rating && <p className="text-sm text-amber-300">★ {product.rating.rate} <span className="text-slate-500">({product.rating.count})</span></p>}
          </div>
        </div>
      </Link>
      <div className="px-5 pb-5">
        <Link to={`/products/${product.id}`} className="inline-flex w-full items-center justify-center rounded-lg bg-teal-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300">View details</Link>
      </div>
    </article>
  )
}

export default ProductCard