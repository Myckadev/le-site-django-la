import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { FaHome, FaSearch, FaPlusCircle, FaHeart, FaUser } from 'react-icons/fa';

export function StandardPage() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-dark-bg min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-neon-green to-neon-purple text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">CyberStore</h1>

          <nav className={`${isMenuOpen ? 'block' : 'hidden'} sm:flex space-x-4`}>
            <ul className="flex sm:space-x-4">
              <li><Link to="/" className="text-light-gray hover:text-white">Home</Link></li>
              <li><Link to="/products" className="text-light-gray hover:text-white">Products</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-dark-purple text-white sm:hidden">
        <div className="flex justify-evenly items-center px-4 py-2">
          <Link to="/" className="flex flex-col items-center text-light-gray hover:text-white">
            <FaHome size={24} />
            <span className="text-xs">Home</span>
          </Link>

          <Link to="/products" className="flex flex-col items-center text-light-gray hover:text-white">
            <FaSearch size={24} />
            <span className="text-xs">Prodcuts</span>
          </Link>

        </div>
      </nav>

      <footer className="bg-dark-purple text-white py-4 mt-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 CyberStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
