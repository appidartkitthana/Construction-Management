
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
    { id: 'tracking', label: 'ติดตามความคืบหน้า', icon: Activity },
    { id: 'calendar', label: 'ตารางงานรายวัน', icon: CalendarIcon },
    { id: 'gantt', label: 'ผังงาน (Gantt)', icon: GanttChartSquare },
    { id: 'kanban', label: 'บอร์ดคัมบัง', icon: LayoutPanelLeft },
    { id: 'inventory', label: 'สต๊อกหน้างาน', icon: Package },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Activity className="text-blue-600 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{project.projectName}</h1>
            <p className="text-slate-500 font-medium">{project.clientName} • รหัส: {project.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right mr-4">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">ความคืบหน้าโดยรวม</p>
            <p className="text-2xl font-bold text-blue-600">68%</p>
          </div>
          <button 
            onClick={onCreateTask}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-100 flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> เพิ่มงานใหม่
          </button>
        </div>
      </div>

      <div className="flex gap-1 bg-white p-1.5 rounded-2xl border border-slate-100 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 min-h-[500px]">
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
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {tasks.map(task => (
      <div key={task.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            task.priority === Priority.URGENT ? 'bg-red-50 text-red-600' :
            task.priority === Priority.HIGH ? 'bg-orange-50 text-orange-600' :
            'bg-blue-50 text-blue-600'
          }`}>
            ความสำคัญ: {task.priority}
          </span>
          <span className="text-xs font-medium text-slate-400 italic">รหัส: {task.id}</span>
        </div>
        <h4 className="font-bold text-slate-800 text-lg mb-2">{task.title}</h4>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2">ผู้รับผิดชอบ: {task.assignee}</p>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-400">เสร็จสมบูรณ์</span>
          <span className="text-xs font-bold text-blue-600">{task.progress}%</span>
        </div>
        <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
          <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${task.progress}%` }}></div>
        </div>

        <div className="mt-6 flex items-center justify-between">
           <div className="flex -space-x-2">
             {[1,2].map(i => (
               <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                  {i === 1 ? 'AK' : 'SP'}
               </div>
             ))}
           </div>
           <button className="text-xs font-bold text-blue-600 group-hover:underline">อัปเดตสถานะ</button>
        </div>
      </div>
    ))}
  </div>
);

const KanbanView: React.FC<{ tasks: any[] }> = ({ tasks }) => {
  const columns = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.REVIEW, TaskStatus.DONE];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 overflow-x-auto pb-4 custom-scrollbar">
      {columns.map(status => (
        <div key={status} className="flex flex-col gap-4 min-w-[280px]">
          <div className="flex items-center justify-between px-2">
             <h3 className="font-bold text-slate-700 flex items-center gap-2">
               {status}
               <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">
                 {tasks.filter(t => t.status === status).length}
               </span>
             </h3>
          </div>
          <div className="flex flex-col gap-4">
            {tasks.filter(t => t.status === status).map(task => (
              <div key={task.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 cursor-grab active:cursor-grabbing hover:shadow-md transition-all">
                <p className="text-xs font-bold text-blue-500 mb-1">{task.category}</p>
                <h4 className="font-semibold text-slate-800 mb-3">{task.title}</h4>
                <div className="flex justify-between items-center">
                   <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold">AK</div>
                   <span className="text-[10px] text-slate-400 font-medium">กำหนดเสร็จ: {task.endDate}</span>
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
  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
    <table className="w-full text-left">
      <thead className="bg-slate-50 border-b border-slate-100">
        <tr>
          <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">ชื่อวัสดุ / รายการ</th>
          <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">คงเหลือ</th>
          <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">หน่วย</th>
          <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">สถานะ</th>
          <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">ดำเนินการ</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {items.map(item => (
          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
            <td className="px-8 py-5 font-bold text-slate-700">{item.name}</td>
            <td className="px-8 py-5 text-slate-600 font-medium">{item.quantity}</td>
            <td className="px-8 py-5 text-slate-500">{item.unit}</td>
            <td className="px-8 py-5">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                item.status === 'มีสินค้า' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {item.status}
              </span>
            </td>
            <td className="px-8 py-5 text-right">
              <button className="text-blue-600 font-bold text-xs hover:underline mr-4">โอนย้าย</button>
              <button className="text-slate-400 font-bold text-xs hover:text-slate-600">ประวัติ</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CalendarView: React.FC = () => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[600px] flex items-center justify-center text-slate-400 italic">
    การแสดงผลตารางปฏิทินแบบย่อสำหรับโครงการนี้
  </div>
);

const GanttView: React.FC<{ tasks: any[] }> = ({ tasks }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm overflow-x-auto">
    <div className="min-w-[800px]">
      <div className="flex border-b border-slate-100 pb-4 mb-4">
        <div className="w-1/4 font-bold text-slate-400 uppercase text-xs">รายละเอียดงาน</div>
        <div className="w-3/4 flex justify-between text-xs font-bold text-slate-400">
          <span>ม.ค.</span><span>ก.พ.</span><span>มี.ค.</span><span>เม.ย.</span><span>พ.ค.</span><span>มิ.ย.</span>
        </div>
      </div>
      {tasks.map((t, idx) => (
        <div key={t.id} className="flex items-center mb-4 group">
          <div className="w-1/4">
            <p className="text-sm font-bold text-slate-700">{t.title}</p>
            <p className="text-[10px] text-slate-400 uppercase font-medium">{t.category}</p>
          </div>
          <div className="w-3/4 h-8 relative">
            <div 
              className={`absolute h-full rounded-lg flex items-center justify-center text-[10px] text-white font-bold transition-all hover:scale-[1.02] shadow-sm ${
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
