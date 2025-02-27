
import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  openMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({ openMenu }) => {
  return (
    <header className="header">
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <span className="text-sea-blue text-xs font-bold">🌊</span>
          </div>
        </div>
        <h1 className="text-xl font-bold tracking-tight">sea me</h1>
      </div>
      <button onClick={openMenu} className="p-1">
        <Menu size={24} />
      </button>
    </header>
  );
};

export default Header;
