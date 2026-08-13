import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import ChatBotPage from '../pages/ChatBot/ChatBotPage';
import ChatCelPage from '../pages/ChatCel/ChatCelPage';
import ChatWasapPage from '../pages/ChatWasap/ChatWasapPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Screen */}
      <Route path="/login" element={<LoginPage />} />

      {/* Main App Layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chat-web" element={<ChatBotPage webhookUrl={import.meta.env.VITE_N8N_WEBHOOK_URL_WEB} />} />
        <Route path="/recibos" element={<DashboardPage />} />
        <Route path="/beneficios" element={<DashboardPage />} />
        <Route path="/configuracion" element={<DashboardPage />} />
      </Route>

      {/* Standalone Chat Routes (Mobile & WhatsApp) - No Sidebar */}
      <Route path="/chat-cel" element={<ChatCelPage />} />
      <Route path="/chat-wasap" element={<ChatWasapPage />} />

      {/* Fallback & Default Redirection */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
