import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  Dumbbell,
  LineChart,
  User2,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function ClientLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: "/client/dashboard", label: "Dashboard", icon: <Dumbbell size={18} /> },
    { path: "/client/progress", label: "Progress", icon: <LineChart size={18} /> },
    { path: "/client/profile", label: "Profile", icon: <User2 size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ===== Mobile overlay ===== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`fixed lg:static z-40 flex flex-col bg-white border-r shadow-sm h-full transition-all duration-300 
          ${collapsed ? "w-20" : "w-64"} 
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header / Logo */}
        <div className="p-4 border-b flex items-center justify-between">
          {!collapsed && (
            <Link to="/" className="text-xl font-bold text-blue-600">
              Talaria
            </Link>
          )}
          <button
            onClick={() =>
              window.innerWidth < 1024
                ? setMobileOpen(!mobileOpen)
                : setCollapsed(!collapsed)
            }
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                 ${
                   isActive
                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                     : "text-gray-700 hover:bg-gray-100"
                 }`
              }
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span
                className={`transition-all duration-200 ${
                  collapsed ? "opacity-0 translate-x-4 hidden" : "opacity-100 translate-x-0"
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t">
          <button
            onClick={() => alert("Logging out...")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-all"
          >
            <LogOut size={16} />
            {!collapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col">
        {/* Top bar (mobile only) */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b shadow-sm">
          <h1 className="font-semibold text-gray-800 text-lg">Talaria</h1>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
