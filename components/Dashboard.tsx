
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { MOCK_CONTRACTS } from '../constants';
import { Contract } from '../types';

const data = [
  { name: 'วิลล่า A', progress: 85 },
  { name: 'วิลล่า B', progress: 45 },
  { name: 'ตกแต่งออฟฟิศ', progress: 20 },
  { name: 'ล็อบบี้โรงแรม', progress: 100 },
];

interface DashboardProps {
  onSelectProject: (p: Contract) => void;
  onCreateProject: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectProject, onCreateProject }) => {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">พอร์ตโฟลิโอ ArchiPro</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-lg">สวัสดีตอนเช้า คุณอนันต์ นี่คือความเคลื่อนไหวล่าสุด</p>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 md:flex-none px-4 md:px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors text-sm">
            ส่งออก
          </button>
          <button 
            onClick={onCreateProject}
            className="flex-1 md:flex-none px-4 md:px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95 text-sm"
          >
            สร้างโครงการใหม่
          </button>
        </div>
      </div>

      {/* Stats Grid - Responsive columns */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard icon={<Clock className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />} label="ดำเนินการ" value="12" subValue="+2 สัปดาห์นี้" />
        <StatCard icon={<AlertCircle className="text-amber-600 w-5 h-5 md:w-6 md:h-6" />} label="งานค้าง" value="48" subValue="5 งานด่วน" />
        <StatCard icon={<CheckCircle2 className="text-emerald-600 w-5 h-5 md:w-6 md:h-6" />} label="เสร็จสิ้น" value="8" subValue="30 วันล่าสุด" />
        <StatCard icon={<TrendingUp className="text-purple-600 w-5 h-5 md:w-6 md:h-6" />} label="รายได้รวม" value="฿84.2M" subValue="เป้าปี 2024" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Progress Chart */}
        <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-bold text-slate-800">ความคืบหน้า</h3>
            <select className="text-xs font-medium text-slate-500 bg-slate-50 border-none rounded-lg py-1 px-3">
              <option>ไตรมาสนี้</option>
              <option>ปีนี้</option>
            </select>
          </div>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: '#F8FAFC'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px'}}
                  formatter={(value) => [`${value}%`, 'ความคืบหน้า']}
                />
                <Bar dataKey="progress" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project List */}
        <div className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-6">โครงการล่าสุด</h3>
          <div className="space-y-4 md:space-y-6">
            {MOCK_CONTRACTS.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors truncate pr-2">{project.projectName}</p>
                  <span className="text-[10px] font-bold text-slate-400">85%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[85%] rounded-full"></div>
                </div>
                <div className="flex justify-between mt-1.5">
                   <p className="text-[10px] text-slate-400 truncate max-w-[150px]">{project.clientName}</p>
                   <p className="text-[10px] font-medium text-blue-500">ดูงาน &rarr;</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-slate-500 font-medium border border-dashed border-slate-300 rounded-xl hover:bg-slate-50 transition-colors text-xs">
            ดูโครงการทั้งหมด
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, subValue: string }> = ({ 
  icon, label, value, subValue 
}) => (
  <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-50 flex items-center justify-center mb-3 md:mb-4 shrink-0">
      {icon}
    </div>
    <p className="text-slate-500 text-[10px] md:text-sm font-medium">{label}</p>
    <h4 className="text-lg md:text-2xl font-bold text-slate-800 mt-0.5">{value}</h4>
    <p className="text-[9px] md:text-xs text-slate-400 mt-1 md:mt-2 truncate">{subValue}</p>
  </div>
);
