
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
  CalendarDays
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
    { id: 'dashboard', label: 'ภาพรวมระบบ', icon: LayoutDashboard },
    { id: 'contracts', label: 'บริหารสัญญา', icon: FileText },
    { id: 'full-calendar', label: 'ตารางงานรวม', icon: CalendarDays },
    { id: 'projects', label: 'บริหารโครงการ', icon: HardHat },
    { id: 'vendors', label: 'คู่ค้าและผู้รับเหมา', icon: Truck },
    { id: 'reports', label: 'รายงานประจำวัน', icon: ClipboardCheck },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F0F7FF]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
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
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-xs text-slate-400 uppercase font-semibold mb-2">เลือกโครงการ</p>
            <select 
              value={selectedProject?.id || ''} 
              onChange={(e) => {
                const p = MOCK_CONTRACTS.find(c => c.id === e.target.value);
                if (p) onSelectProject(p);
              }}
              className="w-full bg-transparent text-sm font-medium text-slate-700 focus:outline-none"
            >
              {MOCK_CONTRACTS.map(p => (
                <option key={p.id} value={p.id}>{p.projectName}</option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="text-sm">หน้าหลัก</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-sm font-medium text-slate-700 capitalize">
              {menuItems.find(m => m.id === currentView)?.label || (currentView === 'profile' ? 'โปรไฟล์ผู้ใช้' : '')}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="ค้นหาข้อมูล..." 
                className="bg-slate-50 border-none rounded-full py-2 pl-10 pr-4 w-64 text-sm focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div 
              className="flex items-center gap-3 pl-6 border-l border-slate-200 cursor-pointer group"
              onClick={() => onNavigate('profile')}
            >
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800 leading-none group-hover:text-blue-600 transition-colors">อนันต์ เค.</p>
                <p className="text-xs text-slate-500">ผู้จัดการโครงการ</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm overflow-hidden transition-transform group-hover:scale-105">
                AK
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
