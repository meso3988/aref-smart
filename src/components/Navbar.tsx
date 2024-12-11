import React from 'react';
import { Menu, Globe, Sun } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-2xl font-bold text-emerald-600">عارف الذكي</div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Sun className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Globe className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;