import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import ChatBotPage from '../pages/ChatBot/ChatBotPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Screen */}
      <Route path="/login" element={<LoginPage />} />

      {/* Main App Layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chat" element={<ChatBotPage />} />
        <Route path="/recibos" element={<DashboardPage />} />
        <Route path="/beneficios" element={<ChatBotPage />} />
        <Route path="/configuracion" element={<DashboardPage />} />
      </Route>

      {/* Fallback & Default Redirection */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
