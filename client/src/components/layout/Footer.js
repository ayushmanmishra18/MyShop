import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="bg-primary-900 text-white py-8 font-display">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
      <span className="text-lg font-bold tracking-wide mb-2 md:mb-0">ModernShop</span>
      <div className="flex items-center space-x-4 mb-2 md:mb-0">
        <a href="#" className="hover:text-primary-400 transition" aria-label="Facebook"><Facebook size={20} /></a>
        <a href="#" className="hover:text-primary-400 transition" aria-label="Twitter"><Twitter size={20} /></a>
        <a href="#" className="hover:text-primary-400 transition" aria-label="Instagram"><Instagram size={20} /></a>
      </div>
      <span className="text-xs text-primary-200">&copy; {new Date().getFullYear()} ModernShop. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer; 