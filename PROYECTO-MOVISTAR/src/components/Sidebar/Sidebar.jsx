import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Receipt,
  Sparkles,
  Gift,
  Settings,
  LogOut,
  X,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: null },
    { label: 'Lucía - Web Chat', path: '/chat-web', icon: Sparkles, badge: 'IA Activa', badgeStyle: { background: '#00A859', color: '#fff' } },
    { label: 'Mis Recibos', path: '/recibos', icon: Receipt, badge: null },
    { label: 'Beneficios de Plan', path: '/beneficios', icon: Gift, badge: '3 Nuevos', badgeStyle: { background: '#e13c80', color: '#fff' } },
    { label: 'Configuración', path: '/configuracion', icon: Settings, badge: null },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(1, 61, 94, 0.55)', backdropFilter: 'blur(4px)' }}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-10 h-screen w-64 bg-white border-r border-movistar-gray-border flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Mobile Header */}
          <div className="p-4 lg:hidden flex items-center justify-between border-b border-slate-100">
            <span className="font-bold text-sm" style={{ color: '#019df4' }}>Movistar Lucía AI</span>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="p-4 space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Menú Principal
            </p>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'text-white shadow-movistar-sm font-semibold'
                        : 'text-slate-600 hover:bg-movistar-gray hover:text-movistar-blue'
                    }`
                  }
                  style={({ isActive }) =>
                    isActive ? { background: 'linear-gradient(90deg, #019df4, #013d5e)' } : {}
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={item.badgeStyle}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom: Widget Lucía + Cerrar Sesión */}
        <div className="p-4 space-y-3">
          <div className="p-3.5 rounded-2xl relative overflow-hidden shadow-movistar-md text-white"
            style={{ background: 'linear-gradient(135deg, #013d5e 0%, #019df4 100%)' }}>
            <div className="absolute top-0 right-0 w-16 h-16 rounded-full blur-xl pointer-events-none"
              style={{ background: 'rgba(225, 60, 128, 0.25)', transform: 'translate(4px, -4px)' }} />

            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#00A859' }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-bold tracking-wide">Lucía AI Active</span>
            </div>

            <p className="text-xs text-white/80 leading-relaxed mb-3">
              Variación de <span className="font-bold text-white">+S/ 20</span> detectada en tu recibo.
            </p>

            <NavLink
              to="/chat-web"
              onClick={onClose}
              className="flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors border border-white/20 hover:bg-white/15"
            >
              <span>Explicar recibo</span>
              <ChevronRight className="w-4 h-4" style={{ color: '#e13c80' }} />
            </NavLink>
          </div>

          <NavLink
            to="/login"
            className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
