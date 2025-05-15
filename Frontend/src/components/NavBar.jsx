import React, { useState } from 'react';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="NavSection px-4 md:px-10">
      <span className="font-bold text-2xl logoSpan">saikat.io</span>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden text-white">
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-10 font-bold navLinks">
        <li className="hover:text-blue-500">
            <Link 
            onClick={() => {
              const el = document.querySelector('.hero_main');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Home
            </Link>
        </li>
        <li className="hover:text-blue-500">
            <Link 
              onClick={() => {
                const el = document.querySelector('.aboutMe');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About me
            </Link>
        </li>
        <li className="hover:text-blue-500">
             <Link 
              onClick={() => {
                const el = document.querySelector('.project');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
            Projects
            </Link>
          </li>
        <li className="hover:text-blue-500">
            <Link 
              onClick={() => {
                const el = document.querySelector('.contactMe');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </Link>
        </li>
        <li className="hover:text-blue-500"><Link target='blank' to="https://drive.google.com/file/d/1ptQWw-C0-4eKZJcuXVWSETA7bk0QbmKB/view?usp=sharing">Resume</Link></li>
        <li className="hover:text-blue-500"><Link to="/admin/customize/login">Admin</Link></li>
      </ul>

      {/* Mobile Nav */}
      {isOpen && (
        <ul className=" mobileNav absolute top-20 left-0 w-full bg-[#20275a9e] flex flex-col items-center gap-6 py-6 font-bold navLinks md:hidden z-5000000">
          <li className="hover:text-blue-500">
            <Link 
            onClick={() => {
              const el = document.querySelector('.hero_main');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Home
            </Link>
          </li>
          <li className="hover:text-blue-500">
             <Link 
              onClick={() => {
                const el = document.querySelector('.aboutMe');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About me
            </Link>
          </li>
          <li className="hover:text-blue-500">
             <Link 
              onClick={() => {
                const el = document.querySelector('.project');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
            Projects
            </Link>
          </li>
          <li className="hover:text-blue-500">
            <Link 
              onClick={() => {
                const el = document.querySelector('.contactMe');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </Link>
          </li>
          <li className="hover:text-blue-500"><Link target='blank' to="https://drive.google.com/file/d/1ptQWw-C0-4eKZJcuXVWSETA7bk0QbmKB/view?usp=sharing " onClick={() => setIsOpen(false)}>Resume</Link></li>
          <li className="hover:text-blue-500"><Link to="/admin/customize/login" onClick={() => setIsOpen(false)}>Admin</Link></li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
