import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Settings, LogOut, Loader2, Users, Gift } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const AdminLayout = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) navigate('/admin/login');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate('/admin/login');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
      </div>
    );
  }

  if (!session) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navItems = [
    { name: 'Lead đăng ký', path: '/admin/leads', icon: Users },
    { name: 'Giới thiệu (Referral)', path: '/admin/referrers', icon: Gift },
    { name: 'Quản lý Tin tức', path: '/admin/news', icon: Newspaper },
    { name: 'Quản lý Nội dung', path: '/admin/content', icon: Settings },
    { name: 'Cài đặt chung', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 pb-16 md:pb-0" style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom))' }}>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-brand-dark text-white p-6 shadow-xl flex-col z-20">
        <div className="flex items-center gap-3 mb-10">
          <img src="/favicon.svg" alt="Logo" className="w-8 h-8" />
          <span className="font-heading font-bold text-xl">H-V Admin</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-brand-blue text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors mt-auto"
        >
          <LogOut size={20} />
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>

      {/* Mobile Top Header */}
      <div className="md:hidden bg-brand-dark text-white px-4 py-3 shadow-sm flex items-center justify-between sticky top-0 z-30" style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top))' }}>
        <div className="flex items-center gap-2">
          <img src="/favicon.svg" alt="Logo" className="w-6 h-6" />
          <span className="font-heading font-bold text-lg">H-V Admin</span>
        </div>
        <button onClick={handleLogout} className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
          <LogOut size={18} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative z-10">
        <header className="hidden md:flex bg-white border-b border-gray-200 py-4 px-8 justify-between items-center shadow-sm">
          <h2 className="text-xl font-heading font-semibold text-gray-800">
            {navItems.find(item => location.pathname.startsWith(item.path))?.name || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold">
              {session.user.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <span className="text-sm font-medium text-gray-600">{session.user.email}</span>
          </div>
        </header>
        
        {/* Mobile Page Title */}
        <div className="md:hidden bg-white border-b border-gray-200 py-3 px-4 shadow-sm flex justify-between items-center">
          <h2 className="text-lg font-heading font-semibold text-gray-800 truncate">
            {navItems.find(item => location.pathname.startsWith(item.path))?.name || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm">
              {session.user.email?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>
        </div>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-3 px-1 flex-1 transition-colors ${
                isActive ? 'text-brand-blue' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={20} className={isActive ? 'scale-110 transition-transform' : ''} />
              <span className="text-[10px] font-medium mt-1 text-center leading-tight truncate w-full px-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
