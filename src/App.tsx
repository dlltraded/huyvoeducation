import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { captureAttribution } from './lib/referralTracking';
import { MainLayout } from './layouts/MainLayout';
import { DynamicPage } from './pages/DynamicPage';
const NewsPage = lazy(() => import('./pages/NewsPage').then(m => ({ default: m.NewsPage })));
const NewsDetail = lazy(() => import('./pages/NewsDetail').then(m => ({ default: m.NewsDetail })));
const ChildProtection = lazy(() => import('./pages/ChildProtection').then(m => ({ default: m.ChildProtection })));
const Careers = lazy(() => import('./pages/Careers').then(m => ({ default: m.Careers })));
import { Instructors } from './pages/Instructors';
import { ProgramsIndex } from './pages/ProgramsIndex';
import { ProgramDetail } from './pages/ProgramDetail';
const AdminLayout = lazy(() => import('./layouts/AdminLayout').then(m => ({ default: m.AdminLayout })));
const Login = lazy(() => import('./pages/admin/Login').then(m => ({ default: m.Login })));
const NewsManager = lazy(() => import('./pages/admin/NewsManager').then(m => ({ default: m.NewsManager })));
const PageBuilder = lazy(() => import('./pages/admin/PageBuilder').then(m => ({ default: m.PageBuilder })));
const GlobalSettings = lazy(() => import('./pages/admin/GlobalSettings').then(m => ({ default: m.GlobalSettings })));
const LeadsManager = lazy(() => import('./pages/admin/LeadsManager').then(m => ({ default: m.LeadsManager })));
const ReferrersManager = lazy(() => import('./pages/admin/ReferrersManager').then(m => ({ default: m.ReferrersManager })));
import { NotFound } from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

// Old programmes URL now lives at /dich-vu; keep any #anchor.
const LegacyProgramsRedirect = () => {
  const { hash } = useLocation();
  return <Navigate to={`/dich-vu${hash}`} replace />;
};

function App() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DynamicPage slug="home" />} />
            {/* Old CMS programme pages are superseded by /dich-vu */}
            <Route path="chuong-trinh/stem" element={<Navigate to="/dich-vu#stem" replace />} />
            <Route path="chuong-trinh/nghe-thuat" element={<Navigate to="/dich-vu#nghe-thuat" replace />} />
            <Route path="chuong-trinh/the-thao-boi-loi" element={<Navigate to="/dich-vu#the-thao" replace />} />
            <Route path="dich-vu" element={<ProgramsIndex />} />
            <Route path="chuong-trinh" element={<LegacyProgramsRedirect />} />
            <Route path="chuong-trinh/:slug" element={<ProgramDetail />} />
            <Route path="doi-ngu-giang-vien" element={<Instructors />} />
            <Route path="tin-tuc" element={<NewsPage />} />
            <Route path="tin-tuc/:id" element={<NewsDetail />} />
            <Route path="chinh-sach-bao-ve-tre-em" element={<ChildProtection />} />
            <Route path="tuyen-dung" element={<Careers />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="leads" replace />} />
            <Route path="news" element={<NewsManager />} />
            <Route path="content" element={<PageBuilder />} />
            <Route path="settings" element={<GlobalSettings />} />
            <Route path="leads" element={<LeadsManager />} />
            <Route path="referrers" element={<ReferrersManager />} />
          </Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
