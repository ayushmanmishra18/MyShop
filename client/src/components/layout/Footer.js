import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="bg-primary-900 text-white py-8 font-display">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
      <span className="text-lg font-bold tracking-wide mb-2 md:mb-0">ModernShop</span>
      <div className="flex items-center space-x-4 mb-2 md:mb-0">
        <button 
          onClick={() => window.open('https://facebook.com', '_blank')} 
          className="hover:text-primary-400 transition p-1 focus:outline-none focus:ring-2 focus:ring-primary-400 rounded" 
          aria-label="Facebook"
        >
          <Facebook size={20} />
        </button>
        <button 
          onClick={() => window.open('https://twitter.com', '_blank')} 
          className="hover:text-primary-400 transition p-1 focus:outline-none focus:ring-2 focus:ring-primary-400 rounded"
          aria-label="Twitter"
        >
          <Twitter size={20} />
        </button>
        <button 
          onClick={() => window.open('https://instagram.com', '_blank')} 
          className="hover:text-primary-400 transition p-1 focus:outline-none focus:ring-2 focus:ring-primary-400 rounded"
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </button>
      </div>
      <span className="text-xs text-primary-200">&copy; {new Date().getFullYear()} ModernShop. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer; 