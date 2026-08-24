import { NavLink, Outlet } from 'react-router'

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-950 px-5 py-7 lg:block">
          <div className="mb-12 flex items-center gap-3 px-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-400 font-bold text-slate-950">P</span>
            <div>
              <p className="font-semibold tracking-tight text-white">Productly</p>
              <p className="text-xs text-slate-500">Catalog workspace</p>
            </div>
          </div>
          <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Workspace</p>
          <nav className="mt-3 space-y-1" aria-label="Main navigation">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-teal-400/10 text-teal-300 ring-1 ring-inset ring-teal-400/20'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                }`
              }
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-current" />
              Products
            </NavLink>
          </nav>
        </aside>
        <div className="min-w-0 flex-1">
          <header className="border-b border-slate-800 bg-slate-950/90 px-5 py-4 backdrop-blur sm:px-8 lg:px-10">
            <div className="flex items-center justify-between lg:hidden">
              <NavLink to="/products" className="font-semibold tracking-tight text-white">Productly</NavLink>
              <NavLink to="/products" className="text-sm font-medium text-teal-300">Products</NavLink>
            </div>
            <div className="hidden items-center justify-between lg:flex">
              <p className="text-sm text-slate-500">Catalog / Products</p>
              <p className="text-sm text-slate-400">Admin workspace</p>
            </div>
          </header>
          <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout