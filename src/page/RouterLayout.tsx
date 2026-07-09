// src/layouts/RootLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';

export const RootLayout: React.FC = () => {
  return (
    <AuthProvider> {/* ★ここが RouterProvider の内側になるため、エラーが消えます */}
      {/* 必要であれば、ここに全ページ共通のナビゲーションバーなどを置けます */}
      <Outlet /> {/* ここに login や dashboard などの各ページが身代わりで入ります */}
    </AuthProvider>
  );
};
