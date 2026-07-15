import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { StemPage } from './pages/StemPage';
import { ArtsPage } from './pages/ArtsPage';
import { SportsPage } from './pages/SportsPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="chuong-trinh/stem" element={<StemPage />} />
            <Route path="chuong-trinh/nghe-thuat" element={<ArtsPage />} />
            <Route path="chuong-trinh/the-thao-boi-loi" element={<SportsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
