import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gray-900/90 backdrop-blur-md border-t border-gray-800/50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-gray-300 flex items-center justify-center space-x-2 text-sm">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 animate-pulse" />
            <span>by Deepali</span>
          </p>
          <p className="text-gray-500 text-xs mt-1">
            © 2024 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;