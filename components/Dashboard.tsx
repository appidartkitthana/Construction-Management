
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">พอร์ตโฟลิโอ ArchiPro</h1>
          <p className="text-slate-500 mt-1 text-lg">สวัสดีตอนเช้า คุณอนันต์ นี่คือความเคลื่อนไหวของโครงการในวันนี้</p>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors">
            ส่งออกรายงาน
          </button>
          <button 
            onClick={onCreateProject}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            สร้างโครงการใหม่
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Clock className="text-blue-600" />} label="กำลังดำเนินการ" value="12" subValue="+2 ในสัปดาห์นี้" />
        <StatCard icon={<AlertCircle className="text-amber-600" />} label="งานที่ค้างคา" value="48" subValue="5 งานด่วนที่สุด" />
        <StatCard icon={<CheckCircle2 className="text-emerald-600" />} label="เสร็จสิ้นแล้ว" value="8" subValue="ใน 30 วันที่ผ่านมา" />
        <StatCard icon={<TrendingUp className="text-purple-600" />} label="รายได้รวมโครงการ" value="฿84.2M" subValue="เป้าหมายปี 2024" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">สัดส่วนความคืบหน้าโครงการ</h3>
            <select className="text-sm font-medium text-slate-500 bg-slate-50 border-none rounded-lg py-1 px-3">
              <option>ไตรมาสนี้</option>
              <option>ปีนี้</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#F8FAFC'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  formatter={(value) => [`${value}%`, 'ความคืบหน้า']}
                />
                <Bar dataKey="progress" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6">โครงการล่าสุด</h3>
          <div className="space-y-6">
            {MOCK_CONTRACTS.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <div className="flex justify-between mb-2">
                  <p className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{project.projectName}</p>
                  <span className="text-xs font-bold text-slate-400">85%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[85%] rounded-full"></div>
                </div>
                <div className="flex justify-between mt-2">
                   <p className="text-xs text-slate-400">{project.clientName}</p>
                   <p className="text-xs font-medium text-blue-500">ดูรายละเอียด &rarr;</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-3 text-slate-500 font-medium border border-dashed border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
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
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
      {icon}
    </div>
    <p className="text-slate-500 text-sm font-medium">{label}</p>
    <h4 className="text-2xl font-bold text-slate-800 mt-1">{value}</h4>
    <p className="text-xs text-slate-400 mt-2">{subValue}</p>
  </div>
);
