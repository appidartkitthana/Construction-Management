
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
  Menu,
  MoreVertical
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
    { id: 'dashboard', label: 'ภาพรวม', icon: LayoutDashboard },
    { id: 'contracts', label: 'สัญญา', icon: FileText },
    { id: 'full-calendar', label: 'ตารางงาน', icon: CalendarDays },
    { id: 'projects', label: 'โครงการ', icon: HardHat },
    { id: 'reports', label: 'รายงาน', icon: ClipboardCheck },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F0F7FF] flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate-200 flex-col shrink-0 shadow-sm z-20">
        <div className="p-8 border-b border-slate-50 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100">
            <HardHat className="text-white w-7 h-7" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase block leading-none">ArchiPro</span>
            <span className="text-[10px] text-blue-500 font-bold tracking-[0.2em] uppercase">Enterprise</span>
          </div>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as View)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                currentView === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 translate-x-1' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-white' : 'group-hover:text-blue-500'}`} />
              <span className="font-bold text-sm tracking-tight">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => onNavigate('vendors')}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
              currentView === 'vendors' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 translate-x-1' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`}
          >
            <Truck className={`w-5 h-5 ${currentView === 'vendors' ? 'text-white' : 'group-hover:text-blue-500'}`} />
            <span className="font-bold text-sm tracking-tight">คู่ค้า/ผู้รับเหมา</span>
          </button>
        </nav>

        <div className="p-6 border-t border-slate-50">
          <div className="bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100">
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-3">Project Active</p>
            <select 
              value={selectedProject?.id || ''} 
              onChange={(e) => {
                const p = MOCK_CONTRACTS.find(c => c.id === e.target.value);
                if (p) onSelectProject(p);
              }}
              className="w-full bg-transparent text-sm font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              {MOCK_CONTRACTS.map(p => (
                <option key={p.id} value={p.id}>{p.projectName}</option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 md:px-10 flex items-center justify-between shrink-0 z-10">
          <div className="md:hidden flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <HardHat className="text-white w-6 h-6" />
             </div>
             <span className="text-xl font-black text-slate-800 uppercase tracking-tighter">ArchiPro</span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-slate-300">
            <span className="text-xs font-bold uppercase tracking-wider">Archi</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {menuItems.find(m => m.id === currentView)?.label || 'Profile'}
            </span>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <button className="p-2.5 text-slate-400 hover:text-blue-600 transition-colors relative bg-slate-50 rounded-xl">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div 
              className="flex items-center gap-3 md:pl-8 md:border-l md:border-slate-100 cursor-pointer group"
              onClick={() => onNavigate('profile')}
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-black text-slate-800 leading-none group-hover:text-blue-600 transition-colors">อนันต์ เค.</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">Project Manager</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black border-4 border-white shadow-lg shadow-blue-100 overflow-hidden transition-all group-hover:scale-110 group-active:scale-95">
                AK
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 md:p-10 pb-24 md:pb-10">
          <div className="max-w-[1400px] mx-auto h-full">
            {children}
          </div>
        </div>

        {/* Bottom Navigation (Mobile Only) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 px-4 py-3 flex justify-around items-center z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] rounded-t-[2.5rem]">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as View)}
              className={`flex flex-col items-center gap-1.5 px-4 py-1 rounded-2xl transition-all duration-300 ${
                currentView === item.id ? 'text-blue-600 bg-blue-50/50' : 'text-slate-400'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'scale-110' : ''}`} />
              <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => onNavigate('vendors')}
            className={`flex flex-col items-center gap-1.5 px-4 py-1 rounded-2xl transition-all ${
              currentView === 'vendors' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-400'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[9px] font-black uppercase tracking-tighter">เมนู</span>
          </button>
        </nav>
      </main>
    </div>
  );
};
