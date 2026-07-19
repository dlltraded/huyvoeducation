import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MainLayout } from './layouts/MainLayout';
import { DynamicPage } from './pages/DynamicPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetail } from './pages/NewsDetail';
import { AdminLayout } from './layouts/AdminLayout';
import { Login } from './pages/admin/Login';
import { NewsManager } from './pages/admin/NewsManager';
import { PageBuilder } from './pages/admin/PageBuilder';
import { GlobalSettings } from './pages/admin/GlobalSettings';
import { LeadsManager } from './pages/admin/LeadsManager';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DynamicPage slug="home" />} />
            <Route path="chuong-trinh/stem" element={<DynamicPage slug="stem" />} />
            <Route path="chuong-trinh/nghe-thuat" element={<DynamicPage slug="arts" />} />
            <Route path="chuong-trinh/the-thao-boi-loi" element={<DynamicPage slug="sports" />} />
            <Route path="tin-tuc" element={<NewsPage />} />
            <Route path="tin-tuc/:id" element={<NewsDetail />} />
          </Route>
          
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<div className="p-8 text-xl font-bold">Trang chủ Admin (Đang cập nhật)</div>} />
            <Route path="news" element={<NewsManager />} />
            <Route path="content" element={<PageBuilder />} />
            <Route path="settings" element={<GlobalSettings />} />
            <Route path="leads" element={<LeadsManager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
