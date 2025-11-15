"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Dumbbell,
  Users,
  Settings,
  ClipboardList,
  BarChart3,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auto-collapse on specific route
  useEffect(() => {
    if (pathname === "/trainer") {
      setCollapsed((prev) => !prev);
    }
  }, [pathname]);

  const navItems = [
    { path: "/", label: "Dashboard", icon: <BarChart3 size={20} /> },
    // { path: "/modules/trainer", label: "Trainer Console", icon: <ClipboardList size={20} /> },
    // { path: "/modules/workoutLibrary", label: "Workouts", icon: <Dumbbell size={20} /> },
    // { path: "/modules/client", label: "Client Side", icon: <Users size={20} /> },
    // { path: "/modules/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#f4f6f8] text-gray-900 overflow-hidden font-sans">

      {/* ============= SIDEBAR ============= */}
      <aside
        className={`h-screen flex flex-col justify-between
        bg-[#1f2937] text-gray-200
        shadow-xl ring-1 ring-black/10
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "absolute z-40 translate-x-0" : "absolute -translate-x-full z-40 lg:relative lg:translate-x-0"}`}
      >
        {/* Logo + Collapse */}
        <div className="border-b border-white/10 p-4 flex items-center justify-between">
          {!collapsed && (
            <Link
              href="/"
              className="font-extrabold text-2xl tracking-wide text-white"
            >
              Talaria
            </Link>
          )}

          <button
            onClick={() =>
              window.innerWidth < 1024
                ? setMobileOpen(false)
                : setCollapsed((prev) => !prev)
            }
            className="p-2 rounded-lg hover:bg-white/10 text-gray-300 transition"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-4 px-3 py-3 rounded-md text-sm font-medium
                transition-all duration-200
                ${
                  active
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.icon}
                {!collapsed && (
                  <span className="transition duration-300">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={() => alert("Logging out...")}
            className="flex items-center gap-3 text-sm text-gray-300 hover:text-red-400 transition"
          >
            <LogOut size={18} />

            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* ============= MAIN CONTENT (SCROLLS) ============= */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 shadow-sm p-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={22} />
            </button>

            <h1
              className="font-bold text-xl cursor-pointer text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setCollapsed((prev) => !prev)}
            >
              Trainer Console
            </h1>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col text-right">
              <span className="text-sm font-semibold text-gray-900">
                Nathan G.
              </span>
              <span className="text-xs text-gray-500">Trainer</span>
            </div>

            <Image
              src="https://i.pravatar.cc/40?img=13"
              alt="Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full ring-2 ring-blue-500/20"
            />
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
