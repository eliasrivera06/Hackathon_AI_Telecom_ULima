import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatSwitcher from '../ChatSwitcher/ChatSwitcher';
import {
  ChevronDown,
  Flame,
  Smartphone,
  Bell,
  Monitor,
  FileCheck,
  Wrench,
  Receipt,
  Tv,
  Award,
  Accessibility,
  MessageCircle,
  PhoneCall,
  CheckCircle2,
  Lock,
  User,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('titular');

  return (
    <div className="min-h-screen bg-[#F4F6F9] font-sans text-slate-800 relative overflow-x-hidden">
      <ChatSwitcher />
      
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-[#004F7C] text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="font-semibold text-white border-b-2 border-white pb-0.5 cursor-pointer">
              Personas
            </span>
            <span className="text-blue-200/80 hover:text-white cursor-pointer transition-colors">
              Empresas
            </span>
          </div>
          <div>
            <span className="text-blue-100 hover:text-white cursor-pointer transition-colors text-[11px] sm:text-xs">
              InformaciÃ³n a Abonados y Usuarios
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <header className="bg-[#019DF4] text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex justify-between items-center">
          
          {/* Logo + Main Nav */}
          <div className="flex items-center space-x-8">
            {/* Movistar Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <svg className="h-9 w-auto text-white fill-current" viewBox="0 0 120 70">
                <path d="M25 50 C 15 50, 10 38, 18 22 C 24 10, 38 5, 48 15 C 56 23, 52 35, 44 42 C 38 48, 30 50, 25 50 Z M 55 48 C 45 48, 40 36, 48 20 C 56 6, 72 2, 85 12 C 96 20, 92 36, 80 43 C 70 48, 60 48, 55 48 Z" fill="currentColor" opacity="0.9"/>
                <path d="M 12 35 C 10 18, 25 8, 38 18 C 48 26, 42 42, 28 44 C 18 45, 13 40, 12 35 Z M 48 35 C 44 18, 60 6, 75 16 C 86 24, 80 42, 65 44 C 54 45, 49 40, 48 35 Z" fill="#019DF4"/>
                <circle cx="30" cy="22" r="10" fill="white"/>
                <circle cx="68" cy="20" r="12" fill="white"/>
              </svg>
              <span className="font-extrabold text-2xl tracking-tighter text-white ml-1 font-sans">movistar</span>
            </div>

            {/* Nav Menu */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
              <div className="flex items-center gap-1 hover:text-blue-100 cursor-pointer py-2">
                <span>Celulares</span>
                <ChevronDown className="w-4 h-4 opacity-80" />
              </div>
              <div className="flex items-center gap-1 hover:text-blue-100 cursor-pointer py-2">
                <span>Hogar</span>
                <ChevronDown className="w-4 h-4 opacity-80" />
              </div>
              <div className="flex items-center gap-1 hover:text-blue-100 cursor-pointer py-2">
                <span>MÃ³vil</span>
                <ChevronDown className="w-4 h-4 opacity-80" />
              </div>
              <div className="hover:text-blue-100 cursor-pointer py-2">
                <span>AtenciÃ³n al cliente</span>
              </div>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Button: Ofertas */}
            <button className="bg-[#E13C80] hover:bg-[#c62f6e] text-white px-3.5 py-1.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-transform active:scale-95">
              <Flame className="w-4 h-4 fill-white text-white" />
              <span>Ofertas</span>
            </button>

            {/* Button: App Mi Movistar -> NAVIGATES TO /login */}
            <button
              onClick={() => navigate('/login')}
              className="border-2 border-white/90 bg-white/10 hover:bg-white/20 text-white px-3.5 sm:px-4 py-1.5 rounded-full font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm cursor-pointer hover:border-white active:scale-95"
            >
              <Smartphone className="w-4 h-4" />
              <span>App Mi Movistar</span>
            </button>

            {/* Notification Bell */}
            <div className="relative p-1 cursor-pointer hover:bg-white/10 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-[#019DF4]">
                1
              </span>
            </div>

          </div>

        </div>
      </header>

      {/* 3. BREADCRUMB BAR */}
      <div className="bg-[#EAEFF4] border-b border-slate-200/60 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-slate-500">
          <span className="hover:underline cursor-pointer">Inicio</span>
          <span>&gt;</span>
          <span className="text-slate-700 font-medium">App Mi Movistar</span>
        </div>
      </div>

      {/* 4. HERO BANNER SECTION */}
      <section className="relative bg-gradient-to-b from-[#F2F6FA] to-[#E6EDF5] py-8 sm:py-12 px-4 sm:px-8 overflow-hidden">
        
        {/* Background Decorative Ripples / Waves */}
        <div className="absolute left-0 top-0 bottom-0 w-48 opacity-25 pointer-events-none hidden md:block">
          <svg className="h-full w-full" viewBox="0 0 200 600" fill="none">
            <circle cx="-50" cy="300" r="220" stroke="#019DF4" strokeWidth="24" opacity="0.4" />
            <circle cx="-50" cy="300" r="160" stroke="#019DF4" strokeWidth="18" opacity="0.6" />
            <circle cx="-50" cy="300" r="100" stroke="#019DF4" strokeWidth="12" opacity="0.8" />
          </svg>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-64 opacity-25 pointer-events-none hidden lg:block">
          <svg className="h-full w-full" viewBox="0 0 250 600" fill="none">
            <circle cx="300" cy="300" r="250" stroke="#019DF4" strokeWidth="30" opacity="0.3" />
            <circle cx="300" cy="300" r="180" stroke="#019DF4" strokeWidth="20" opacity="0.5" />
            <circle cx="300" cy="300" r="110" stroke="#019DF4" strokeWidth="12" opacity="0.7" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* HERO LEFT COLUMN: TEXT + CTA */}
          <div className="lg:col-span-4 text-center lg:text-left space-y-4">
            <p className="text-slate-600 font-semibold text-xs sm:text-sm tracking-wide">
              Â¡MÃ¡s de 2 millones de usuarios ya la estÃ¡n disfrutando!
            </p>

            <h1 className="text-slate-800 leading-tight">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#019DF4] block">
                Â¡Tu <span className="text-[#019DF4]">App Mi</span>
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#019DF4]">
                Movistar
              </span>{" "}
              <span className="text-xl sm:text-2xl font-medium text-slate-700">
                conecta con lo que
              </span>
              <span
                className="block text-4xl sm:text-5xl text-[#019DF4] font-bold mt-1"
                style={{ fontFamily: 'Caveat, cursive' }}
              >
                Te mueve!
              </span>
            </h1>

            <p className="text-slate-500 font-medium text-sm pt-2">
              Y tÃº, Â¿ya la descargaste?
            </p>

            <div className="pt-2">
              <button className="bg-[#E13C80] hover:bg-[#c62f6e] text-white px-8 py-3 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                DescÃ¡rgala aquÃ­
              </button>
            </div>
          </div>

          {/* HERO CENTER COLUMN: WHITE FEATURE CARDS GRID */}
          <div className="lg:col-span-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-200/80">
              <div className="grid grid-cols-3 gap-y-6 gap-x-3 text-center">
                
                {/* Feature 1 */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#019DF4] flex items-center justify-center mb-2 group-hover:bg-[#019DF4] group-hover:text-white transition-colors shadow-sm">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    Adquirir <span className="font-bold block">productos adicionales</span>
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#019DF4] flex items-center justify-center mb-2 group-hover:bg-[#019DF4] group-hover:text-white transition-colors shadow-sm">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    Consultar tu <span className="font-bold block">plan y/o mejorarlo</span>
                  </span>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#019DF4] flex items-center justify-center mb-2 group-hover:bg-[#019DF4] group-hover:text-white transition-colors shadow-sm">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    Diagnosticar y seguimiento <span className="font-bold block">a una AverÃ­a</span>
                  </span>
                </div>

                {/* Feature 4 */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#019DF4] flex items-center justify-center mb-2 group-hover:bg-[#019DF4] group-hover:text-white transition-colors shadow-sm">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    Revisar el detalle de tu <span className="font-bold block">recibo y pagar</span>
                  </span>
                </div>

                {/* Feature 5 - Disney+ */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
                    <span className="font-black text-[10px] tracking-tighter text-blue-400">Disney+</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    Activar tu <span className="font-bold block">Disney+</span>
                  </span>
                </div>

                {/* Feature 6 - Club Movistar */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#019DF4] to-[#005C9E] text-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
                    <span className="font-serif italic font-bold text-xs">Club</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    Acceder al <span className="font-bold block">Club Mi Movistar</span>
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* HERO RIGHT COLUMN: SMILING MAN IMAGE */}
          <div className="lg:col-span-4 flex justify-center relative">
            <div className="relative max-w-xs sm:max-w-sm">
              
              {/* Concentric rings background element */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-[#019DF4]/20 animate-pulse"></div>
                <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border-2 border-[#019DF4]/30"></div>
              </div>

              {/* Main Image */}
              <img
                src="/movistar_user_phone.png"
                alt="Usuario disfrutando de App Mi Movistar"
                className="w-full h-auto object-contain drop-shadow-xl rounded-2xl relative z-10"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 5. SECTION BELOW HERO: Â¿CÃ³mo ingresar a tu App Mi Movistar? */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl font-normal text-slate-800">
          Â¿CÃ³mo ingresar a tu <span className="font-bold text-[#003B5C]">App Mi Movistar</span>?
        </h2>

        {/* TABS */}
        <div className="flex justify-center border-b border-slate-300 mt-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('titular')}
            className={`px-8 py-3 font-bold text-base transition-colors relative ${
              activeTab === 'titular'
                ? 'text-[#019DF4] border-b-4 border-[#019DF4]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Soy titular
          </button>
          <button
            onClick={() => setActiveTab('usuario')}
            className={`px-8 py-3 font-semibold text-base transition-colors relative ${
              activeTab === 'usuario'
                ? 'text-[#019DF4] border-b-4 border-[#019DF4]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Soy usuario
          </button>
        </div>

        {/* TAB CONTENT: INSTRUCTIONS */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/70 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#019DF4] font-bold flex items-center justify-center text-lg mb-4">
              1
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-2">
              Descarga la App Mi Movistar
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Disponible totalmente gratis en Google Play Store, App Store de Apple y Huawei AppGallery.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/70 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#019DF4] font-bold flex items-center justify-center text-lg mb-4">
              2
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-2">
              Ingresa tu DNI o RUC
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Inicia sesiÃ³n de forma segura con el documento de identidad registrado en tu contrato.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/70 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#019DF4] font-bold flex items-center justify-center text-lg mb-4">
              3
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-2">
              Gestiona tus servicios
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Revisa tus recibos, explicaciones inteligentes con LucÃ­a AI, reporta averÃ­as y activa promociones.
            </p>
          </div>

        </div>

        {/* CTA to Login */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 bg-[#019DF4] hover:bg-[#0086D1] text-white px-7 py-3 rounded-full font-bold text-sm shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            <span>Iniciar SesiÃ³n en Mi Movistar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* FOOTER - Static reference */}
      <footer className="bg-[#002951] text-slate-300 py-8 px-4 sm:px-8 border-t border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-lg text-white">movistar</span>
            <span className="text-slate-400">Â© 2026 TelefÃ³nica del PerÃº</span>
          </div>
          <div className="flex flex-wrap gap-4 text-slate-400">
            <span className="hover:underline cursor-pointer">TÃ©rminos y Condiciones</span>
            <span className="hover:underline cursor-pointer">PolÃ­tica de Privacidad</span>
            <span className="hover:underline cursor-pointer">Centro de Ayuda</span>
          </div>
        </div>
      </footer>

      {/* 6. FLOATING ACCESSORY BUTTONS */}
      
      {/* Bottom Left: Accessibility Icon */}
      <button className="fixed bottom-6 left-6 z-50 bg-white p-3 rounded-full shadow-2xl border border-slate-300 text-slate-900 hover:bg-slate-50 transition-transform hover:scale-110 active:scale-95 cursor-pointer">
        <Accessibility className="w-6 h-6" />
      </button>

      

    </div>
  );
}

