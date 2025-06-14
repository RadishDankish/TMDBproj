import React from 'react'
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (

    <header className="bg-gray-900 text-white ">
      <div className="px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-500">
          🎬 Movie Explorer
        </Link>
        <nav className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-400 font-semibold" : "hover:text-red-400"
            }
          >
            Home
          </NavLink>
          
          <NavLink
            to="/trending"
            className={({ isActive }) =>
              isActive ? "text-red-400 font-semibold" : "hover:text-red-400"
            }
          >
            Trending
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
