import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth from './../auth/auth-helper';

function Sidebar({ history }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  // Check if the user is authenticated
  const isAuth = auth.isAuthenticated();

  // Touch events for mobile swipe gesture
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    // If the swipe is leftward (from right to left) more than 50px, open the menu.
    if (touchStartX - touchEndX > 50) {
      setMenuOpen(true);
    } else if (touchEndX - touchStartX > 50) {
      setMenuOpen(false);
    }
    setTouchStartX(null);
  };

  return (
    <div
      // Mouse events for desktop hover behavior
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
      // Touch events for mobile swipe behavior
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      // The sidebar is fixed on the right.
      // When closed, translate it to the right so that only a small part is visible.
      className={`fixed top-0 right-0 h-full w-48 bg-gray-900 text-white transform transition-transform duration-300 z-50 ${
        menuOpen ? 'translate-x-0' : 'translate-x-[180px]'
      }`}
    >
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Menu</h2>
        <ul>
          {isAuth && isAuth.user && (
            <li className="mb-2">
              <Link
                to={`/user/${isAuth.user._id}`}
                className="block px-2 py-1 hover:bg-gray-700 rounded"
              >
                Profile
              </Link>
            </li>
          )}
          <li className="mb-2">
            <Link
              to="/settings"
              className="block px-2 py-1 hover:bg-gray-700 rounded"
            >
              Settings
            </Link>
          </li>
          {isAuth && (
            <li className="mb-2">
              <button
                onClick={() => {
                  auth.clearJWT(() => history.push('/'));
                }}
                className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default withRouter(Sidebar);
