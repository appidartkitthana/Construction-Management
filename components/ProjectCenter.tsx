
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  GanttChartSquare, 
  LayoutPanelLeft, 
  Package, 
  Activity,
  Plus
} from 'lucide-react';
import { Contract, TaskStatus, Priority } from '../types';
import { MOCK_TASKS, MOCK_INVENTORY } from '../constants';

interface ProjectCenterProps {
  project: Contract;
  onCreateTask: () => void;
}

type Tab = 'calendar' | 'gantt' | 'kanban' | 'inventory' | 'tracking';

export const ProjectCenter: React.FC<ProjectCenterProps> = ({ project, onCreateTask }) => {
  const [activeTab, setActiveTab] = useState<Tab>('tracking');

  const tabs = [
    { id: 'tracking', label: 'ติดตามงาน', icon: Activity },
    { id: 'calendar', label: 'รายวัน', icon: CalendarIcon },
    { id: 'gantt', label: 'แผนภูมิ', icon: GanttChartSquare },
    { id: 'kanban', label: 'บอร์ด', icon: LayoutPanelLeft },
    { id: 'inventory', label: 'คลังสินค้า', icon: Package },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-5 md:p-8 rounded-3xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4 md:gap-5">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
            <Activity className="text-blue-600 w-6 h-6 md:w-8 md:h-8" />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-lg md:text-2xl font-bold text-slate-800 truncate">{project.projectName}</h1>
            <p className="text-slate-500 font-medium text-xs md:text-sm truncate">{project.clientName}</p>
          </div>
        </div>
        <div className="flex items-center justify-between md:justify-end gap-3 md:gap-6 border-t md:border-t-0 pt-4 md:pt-0">
          <div className="text-left md:text-right">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">สำเร็จแล้ว</p>
            <p className="text-xl md:text-2xl font-bold text-blue-600">68%</p>
          </div>
          <button 
            onClick={onCreateTask}
            className="px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-100 flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95 text-sm"
          >
            <Plus className="w-4 h-4" /> เพิ่มงาน
          </button>
        </div>
      </div>

      {/* Tab Navigation - Horizontal scrollable on mobile */}
      <div className="flex overflow-x-auto custom-scrollbar -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth">
        <div className="flex gap-1 bg-white p-1.5 rounded-2xl border border-slate-100 w-max md:w-fit whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-xs md:text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 md:mt-8 min-h-[400px]">
        {activeTab === 'tracking' && <TrackingView tasks={MOCK_TASKS} />}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'gantt' && <GanttView tasks={MOCK_TASKS} />}
        {activeTab === 'kanban' && <KanbanView tasks={MOCK_TASKS} />}
        {activeTab === 'inventory' && <InventoryView items={MOCK_INVENTORY} />}
      </div>
    </div>
  );
};

const TrackingView: React.FC<{ tasks: any[] }> = ({ tasks }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    {tasks.map(task => (
      <div key={task.id} className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-2 md:px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${
            task.priority === Priority.URGENT ? 'bg-red-50 text-red-600' :
            task.priority === Priority.HIGH ? 'bg-orange-50 text-orange-600' :
            'bg-blue-50 text-blue-600'
          }`}>
            {task.priority}
          </span>
          <span className="text-[10px] font-medium text-slate-400 italic">#{task.id}</span>
        </div>
        <h4 className="font-bold text-slate-800 text-base md:text-lg mb-2">{task.title}</h4>
        <p className="text-slate-500 text-xs mb-6 truncate">{task.assignee}</p>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-slate-400">สถานะงาน</span>
          <span className="text-[10px] font-bold text-blue-600">{task.progress}%</span>
        </div>
        <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
          <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${task.progress}%` }}></div>
        </div>

        <div className="mt-5 flex items-center justify-between">
           <div className="flex -space-x-2">
             {[1,2].map(i => (
               <div key={i} className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[9px] md:text-[10px] font-bold text-slate-600">
                  {i === 1 ? 'AK' : 'SP'}
               </div>
             ))}
           </div>
           <button className="text-[10px] md:text-xs font-bold text-blue-600 group-hover:underline">อัปเดต</button>
        </div>
      </div>
    ))}
  </div>
);

const KanbanView: React.FC<{ tasks: any[] }> = ({ tasks }) => {
  const columns = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.REVIEW, TaskStatus.DONE];
  return (
    <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 custom-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
      {columns.map(status => (
        <div key={status} className="flex flex-col gap-4 min-w-[260px] md:min-w-[280px]">
          <div className="flex items-center justify-between px-2">
             <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
               {status}
               <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full">
                 {tasks.filter(t => t.status === status).length}
               </span>
             </h3>
          </div>
          <div className="flex flex-col gap-4">
            {tasks.filter(t => t.status === status).map(task => (
              <div key={task.id} className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-100 cursor-grab hover:shadow-md transition-all">
                <p className="text-[9px] md:text-xs font-bold text-blue-500 mb-1">{task.category}</p>
                <h4 className="text-sm font-semibold text-slate-800 mb-3">{task.title}</h4>
                <div className="flex justify-between items-center">
                   <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold">AK</div>
                   <span className="text-[9px] md:text-[10px] text-slate-400 font-medium whitespace-nowrap">{task.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const InventoryView: React.FC<{ items: any[] }> = ({ items }) => (
  <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left min-w-[600px]">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">รายการ</th>
            <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">คงเหลือ</th>
            <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">หน่วย</th>
            <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">ดำเนินการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {items.map(item => (
            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 md:px-8 py-4 md:py-5 font-bold text-slate-700 text-sm">{item.name}</td>
              <td className="px-6 md:px-8 py-4 md:py-5 text-slate-600 font-medium text-sm">{item.quantity}</td>
              <td className="px-6 md:px-8 py-4 md:py-5 text-slate-400 text-xs">{item.unit}</td>
              <td className="px-6 md:px-8 py-4 md:py-5 text-right">
                <button className="text-blue-600 font-bold text-[10px] hover:underline mr-3">โอนย้าย</button>
                <button className="text-slate-400 font-bold text-[10px] hover:text-slate-600">ประวัติ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CalendarView: React.FC = () => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[300px] flex items-center justify-center text-slate-400 italic text-sm text-center">
    แสดงผลตารางงานรายวันสำหรับโครงการนี้<br/>(เหมาะสำหรับการดูบนแท็บเล็ตและเดสก์ท็อป)
  </div>
);

const GanttView: React.FC<{ tasks: any[] }> = ({ tasks }) => (
  <div className="bg-white p-5 md:p-8 rounded-3xl border border-slate-100 shadow-sm overflow-x-auto">
    <div className="min-w-[800px]">
      <div className="flex border-b border-slate-100 pb-4 mb-4">
        <div className="w-1/4 font-bold text-slate-400 uppercase text-[10px] tracking-wider">รายละเอียดงาน</div>
        <div className="w-3/4 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4">
          <span>ม.ค.</span><span>ก.พ.</span><span>มี.ค.</span><span>เม.ย.</span><span>พ.ค.</span><span>มิ.ย.</span>
        </div>
      </div>
      {tasks.map((t, idx) => (
        <div key={t.id} className="flex items-center mb-4 group">
          <div className="w-1/4">
            <p className="text-xs font-bold text-slate-700 truncate">{t.title}</p>
            <p className="text-[9px] text-slate-400 uppercase font-medium">{t.category}</p>
          </div>
          <div className="w-3/4 h-6 relative bg-slate-50 rounded-lg mx-2">
            <div 
              className={`absolute h-full rounded-lg flex items-center justify-center text-[9px] text-white font-bold transition-all hover:brightness-110 shadow-sm ${
                idx % 2 === 0 ? 'bg-blue-400' : 'bg-blue-300'
              }`} 
              style={{ left: `${idx * 15}%`, width: `${20 + idx * 10}%` }}
            >
              {t.progress}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
