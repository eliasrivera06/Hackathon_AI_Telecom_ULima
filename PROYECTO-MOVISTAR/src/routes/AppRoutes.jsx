import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/Home/HomePage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import ChatBotPage from '../pages/ChatBot/ChatBotPage';
import ChatCelPage from '../pages/ChatCel/ChatCelPage';
import ChatWasapPage from '../pages/ChatWasap/ChatWasapPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home / Landing Page (Web Mode) */}
      <Route path="/" element={<HomePage />} />

      {/* Auth & Mobile App Screen */}
      <Route path="/login" element={<ChatCelPage />} />
      <Route path="/chat-cel" element={<ChatCelPage />} />

      {/* Standalone WhatsApp Route */}
      <Route path="/chat-wasap" element={<ChatWasapPage />} />

      {/* Internal Dashboard / Web Chat Layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chat-web" element={<ChatBotPage webhookUrl={(import.meta.env.VITE_MAKE_WEBHOOK_URL_WEB || import.meta.env.VITE_N8N_WEBHOOK_URL_WEB || import.meta.env.VITE_MAKE_WEBHOOK_URL)} />} />
        <Route path="/recibos" element={<DashboardPage />} />
        <Route path="/beneficios" element={<DashboardPage />} />
        <Route path="/configuracion" element={<DashboardPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
