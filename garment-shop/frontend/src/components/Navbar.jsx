import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingBag, User, Menu, X, LogOut, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const cartCount = getCartCount();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side: Logo */}
          <div className="shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-wider">
              Garment <span className="text-blue-600">Shop</span>
            </Link>
          </div>

          {/* Middle: Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
              Home
            </Link>
            <Link to="/catalog" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
              Catalog
            </Link>
            {user && user.isAdmin && (
              <Link to="/admin" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors flex items-center gap-1">
                <Settings size={18} />
                Admin
              </Link>
            )}
            {!user && (
              <Link to="/register" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
                Register
              </Link>
            )}
          </div>

          {/* Right Side: Icons & User Menu */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-sm font-medium text-gray-900 hidden sm:inline">
                  Welcome, {user.name.split(' ')[0]}!
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                <User className="h-6 w-6" />
              </Link>
            )}
            
            <Link to="/cart" className="text-gray-600 hover:text-blue-600 transition-colors relative">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileOpen(open => !open)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
        </div>
      </div>
      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-3 pb-4 space-y-1">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Home</Link>
            <Link to="/catalog" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Catalog</Link>
            {user && user.isAdmin && (
              <Link to="/admin" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Admin</Link>
            )}
            {!user && (
              <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Register</Link>
            )}
            {user ? (
              <div className="px-3 py-2">
                <div className="text-sm text-gray-800">Welcome, {user.name.split(' ')[0]}!</div>
                <button onClick={handleLogout} className="mt-2 text-sm text-red-600">Logout</button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
