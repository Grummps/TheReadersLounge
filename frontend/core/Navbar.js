import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth from './../auth/auth-helper';

function Navbar({ history }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuth = auth.isAuthenticated();

  const handleLogout = () => {
    auth.clearJWT(() => history.push('/'));
  };

  return (
    <nav className="relative bg-black text-white top-0 left-0 right-0 z-50 border-b border-white border-opacity-30 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16 relative z-10">
          <div className="flex-shrink-0 text-xl font-bold">
            <Link to="/">BookClub</Link>
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            {isAuth && isAuth.user && (
              <Link to={`/user/${isAuth.user._id}`} className="px-3 py-2 rounded hover:bg-neutral-800 transition">Profile</Link>
            )}
            <Link to="/settings" className="px-3 py-2 rounded hover:bg-neutral-800 transition">Settings</Link>
            {isAuth && (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded hover:bg-neutral-800 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none text-2xl"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Trapezoid border (slightly larger, behind) */}
      <div
        className="absolute top-full left-1/2 transform -translate-x-1/2 w-96 h-7 bg-gray-400 opacity-70 z-0"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)',
        }}
      />

      {/* The Trapezoid Shape */}
      <div
        className="absolute top-full left-1/2 transform -translate-x-1/2 w-80 h-6 bg-black z-0"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)',
        }}
      />

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black px-4 py-3 space-y-2 z-10 relative">
          {isAuth && isAuth.user && (
            <Link to={`/user/${isAuth.user._id}`} className="block px-3 py-2 rounded hover:bg-neutral-800" onClick={() => setMenuOpen(false)}>Profile</Link>
          )}
          <Link to="/settings" className="block px-3 py-2 rounded hover:bg-neutral-800" onClick={() => setMenuOpen(false)}>Settings</Link>
          {isAuth && (
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-3 py-2 rounded hover:bg-neutral-800"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default withRouter(Navbar);
