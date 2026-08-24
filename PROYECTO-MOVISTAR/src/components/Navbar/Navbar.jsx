import React from 'react';
import MovistarLogo from '../../assets/images/MovistarLogo.svg';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, Bell } from 'lucide-react';
import { userProfile } from '../../data/mockData';

export default function Navbar({ onToggleSidebar }) {
  const location = useLocation();
  const isChatActive = location.pathname.includes('/chat');

  return (
    <header className="sticky top-0 z-30 w-full text-white shadow-movistar-md border-b border-white/10"
      style={{ background: 'linear-gradient(90deg, #013d5e 0%, #019df4 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <img
                  src={MovistarLogo}
                  alt="Logo Movistar"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans flex items-center gap-1.5">
                  movistar
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/15 text-white border border-white/20">
                    Lucio AI
                  </span>
                </span>
                <span className="text-[11px] text-white/60 tracking-wide font-medium">
                  Atención Inteligente de Recibos
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Quick CTA — visible solo cuando no estás en el chat */}
          {!isChatActive && (
            <div className="hidden md:flex items-center">
              <Link
                to="/chat"
                className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all transform hover:-translate-y-0.5 shadow-movistar-pink-glow"
                style={{ background: 'linear-gradient(90deg, #00A859 0%, #e13c80 100%)', color: 'white' }}
              >
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <span>Consultar a Lucio AI</span>
                <span className="ml-1 text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  Explicar recibo
                </span>
              </Link>
            </div>
          )}

          {/* Right: Service Status + Notifications + Avatar */}
          <div className="flex items-center gap-3">
            {/* Service Status Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs text-white/80 border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-movistar-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-movistar-green"></span>
              </span>
              <span className="font-medium">Fibra 600M Activo</span>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-movistar-pink"></span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-3 pl-2 border-l border-white/15">
              <div className="w-9 h-9 rounded-full ring-2 ring-movistar-green/60 flex items-center justify-center font-bold text-sm overflow-hidden bg-white/10">
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = ""; }}
                />
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-white tracking-wide">
                  {userProfile.name}
                </span>
                <span className="text-[10px] text-white/60">
                  {userProfile.accountType}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
