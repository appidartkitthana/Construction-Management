
import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  HardHat, 
  Truck, 
  ClipboardCheck, 
  ChevronRight,
  Bell,
  Search,
  User,
  CalendarDays,
  Menu
} from 'lucide-react';
import { View } from '../App';
import { Contract } from '../types';
import { MOCK_CONTRACTS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
  selectedProject: Contract | null;
  onSelectProject: (p: Contract) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  onNavigate, 
  selectedProject,
  onSelectProject
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'หน้าแรก', shortLabel: 'หน้าแรก', icon: LayoutDashboard },
    { id: 'contracts', label: 'สัญญา', shortLabel: 'สัญญา', icon: FileText },
    { id: 'full-calendar', label: 'ตารางงาน', shortLabel: 'ตาราง', icon: CalendarDays },
    { id: 'projects', label: 'โครงการ', shortLabel: 'โครงการ', icon: HardHat },
    { id: 'reports', label: 'รายงาน', shortLabel: 'รายงาน', icon: ClipboardCheck },
  ];

  const vendorMenuItem = { id: 'vendors', label: 'คู่ค้า', icon: Truck };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F0F7FF] flex-col md:flex-row">
      {/* Sidebar (Desktop Only) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col shrink-0">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
            <HardHat className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight uppercase">ArchiPro</span>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as View)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                currentView === item.id 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => onNavigate('vendors')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === 'vendors' 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <vendorMenuItem.icon className={`w-5 h-5 ${currentView === 'vendors' ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
            <span className="font-medium">{vendorMenuItem.label}</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-xs text-slate-400 uppercase font-semibold mb-2 text-[10px]">เลือกโครงการ</p>
            <select 
              value={selectedProject?.id || ''} 
              onChange={(e) => {
                const p = MOCK_CONTRACTS.find(c => c.id === e.target.value);
                if (p) onSelectProject(p);
              }}
              className="w-full bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              {MOCK_CONTRACTS.map(p => (
                <option key={p.id} value={p.id}>{p.projectName}</option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-hidden pb-16 md:pb-0">
        {/* Top Header */}
        <header className="h-16 md:h-20 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shrink-0">
          {/* Logo Mobile */}
          <div className="flex items-center gap-2 md:hidden">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <HardHat className="text-white w-5 h-5" />
             </div>
             <span className="text-lg font-bold text-slate-800 uppercase tracking-tighter">ArchiPro</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <span className="text-xs">หน้าหลัก</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-xs font-medium text-slate-700 capitalize">
              {menuItems.find(m => m.id === currentView)?.label || (currentView === 'profile' ? 'โปรไฟล์ผู้ใช้' : 'บริหารงาน')}
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden lg:relative lg:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="ค้นหา..." 
                className="bg-slate-50 border-none rounded-full py-2 pl-10 pr-4 w-48 text-sm focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div 
              className="flex items-center gap-2 md:gap-3 md:pl-6 md:border-l md:border-slate-200 cursor-pointer group"
              onClick={() => onNavigate('profile')}
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-slate-800 leading-none group-hover:text-blue-600 transition-colors">อนันต์ เค.</p>
                <p className="text-[10px] text-slate-500">Project Manager</p>
              </div>
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm overflow-hidden transition-transform group-hover:scale-105">
                AK
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as View)}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
              currentView === item.id ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            <item.icon className={`w-5 h-5 ${currentView === item.id ? 'scale-110' : ''} transition-transform`} />
            <span className="text-[10px] font-bold">{item.shortLabel}</span>
            {currentView === item.id && (
              <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
            )}
          </button>
        ))}
        {/* Extra Menu for Mobile (Vendors etc) */}
        <button
            onClick={() => onNavigate('vendors')}
            className={`flex flex-col items-center gap-1 px-3 py-1 transition-all ${
              currentView === 'vendors' ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] font-bold">เพิ่มเติม</span>
          </button>
      </nav>
    </div>
  );
};
