"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, PenSquare, FileText, User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';
  const isLoggedIn = !!session?.user;

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-navy/10 bg-brand-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 overflow-hidden rounded-full border border-brand-gold shadow-sm transition-transform duration-500 group-hover:rotate-6">
            <Image 
              src="/logo_new.webp" 
              alt="Acharya Rajesh " 
              fill
              className="object-cover scale-140"
              sizes="48px"
              priority
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-brand-navy leading-none">
              ACHARYA RAJESH
            </h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold">
              Vedic Astrologer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-brand-navy/70">
          <Link href="/journal" className="hover:text-brand-gold transition-colors">Journal</Link>
          <Link href="/about" className="hover:text-brand-gold transition-colors">About</Link>
          <Link href="/contact" className="hover:text-brand-gold transition-colors">Contact</Link>
        </nav>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Admin Quick Access */}
          {isAdmin && (
            <>
              <Link 
                href="/admin/articles" 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-navy/10 text-brand-navy hover:bg-brand-navy/20 transition-all"
                title="Manage Articles"
              >
                <FileText size={18} />
              </Link>
              <Link 
                href="/admin/write" 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-gold/20 text-brand-navy hover:bg-brand-gold/40 transition-all"
                title="Write New Article"
              >
                <PenSquare size={18} />
              </Link>
            </>
          )}

          {/* CTA Button */}
          <Link 
            href="/book" 
            className="rounded-full bg-brand-navy px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-brand-gold shadow-lg hover:bg-brand-navy/90 transition-all active:scale-95"
          >
            Book Appointment
          </Link>

          {/* Profile Button */}
          {isLoggedIn && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-navy text-brand-gold hover:bg-brand-navy/80 transition-all"
                title="Profile"
              >
                {session.user?.image ? (
                  <Image 
                    src={session.user.image} 
                    alt="Profile" 
                    width={40} 
                    height={40} 
                    className="rounded-full"
                  />
                ) : (
                  <User size={18} />
                )}
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-brand-navy/10 overflow-hidden z-50">
                  <div className="p-4 border-b border-slate-100">
                    <p className="font-bold text-brand-navy text-sm truncate">
                      {session.user?.name || 'User'}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {session.user?.email}
                    </p>
                    {isAdmin && (
                      <span className="inline-block mt-2 px-2 py-0.5 bg-brand-gold/20 text-brand-navy text-[10px] font-bold uppercase tracking-wider rounded">
                        Admin
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-brand-navy p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-paper border-b border-brand-navy/10 shadow-xl py-6 px-6 flex flex-col gap-4 animate-fade-in-down">
          
          {/* Profile Section for Mobile */}
          {isLoggedIn && (
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-brand-navy/10 mb-2">
              {session.user?.image ? (
                <Image 
                  src={session.user.image} 
                  alt="Profile" 
                  width={48} 
                  height={48} 
                  className="rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center">
                  <User size={20} className="text-brand-gold" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brand-navy text-sm truncate">
                  {session.user?.name || 'User'}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {session.user?.email}
                </p>
                {isAdmin && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-brand-gold/20 text-brand-navy text-[10px] font-bold uppercase tracking-wider rounded">
                    Admin
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Admin Quick Actions for Mobile */}
          {isAdmin && (
            <div className="grid grid-cols-2 gap-3 mb-2">
              <Link 
                href="/admin/write" 
                className="flex items-center justify-center gap-2 p-4 bg-brand-gold/20 rounded-xl text-brand-navy font-bold text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <PenSquare size={18} /> Write
              </Link>
              <Link 
                href="/admin/articles" 
                className="flex items-center justify-center gap-2 p-4 bg-brand-navy/10 rounded-xl text-brand-navy font-bold text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileText size={18} /> Articles
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 text-sm font-bold uppercase tracking-widest text-brand-navy/70">
            <Link 
              href="/journal" 
              className="hover:text-brand-gold transition-colors py-3 px-4 rounded-lg hover:bg-brand-navy/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Journal
            </Link>
            <Link 
              href="/about" 
              className="hover:text-brand-gold transition-colors py-3 px-4 rounded-lg hover:bg-brand-navy/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="hover:text-brand-gold transition-colors py-3 px-4 rounded-lg hover:bg-brand-navy/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-2">
            <Link 
              href="/book" 
              className="w-full text-center rounded-full bg-brand-navy px-5 py-3 text-xs font-bold uppercase tracking-widest text-brand-gold shadow-md hover:bg-brand-navy/90 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Appointment
            </Link>
            {isLoggedIn && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  signOut({ callbackUrl: '/' });
                }}
                className="flex items-center justify-center gap-2 w-full text-center rounded-full border-2 border-red-500 px-5 py-3 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut size={16} /> Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
