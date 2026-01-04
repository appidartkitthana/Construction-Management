
import React from 'react';
import { Camera, MapPin, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import { MOCK_REPORTS } from '../constants';
import { IssueLevel } from '../types';

interface DailyReportsProps {
  onCreateReport: () => void;
}

export const DailyReports: React.FC<DailyReportsProps> = ({ onCreateReport }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">รายงานหน้างานรายวัน</h1>
          <p className="text-slate-500 mt-1">ติดตามความคืบหน้าและปัญหาหน้างานแบบเรียลไทม์</p>
        </div>
        <button 
          onClick={onCreateReport}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          <Camera className="w-5 h-5" /> สร้างรายงานใหม่
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">ตัวกรองด่วน</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-xl text-sm transition-colors">รายงานทั้งหมด</button>
              <button className="w-full text-left px-4 py-2 text-slate-500 font-medium rounded-xl text-sm hover:bg-slate-50 transition-colors">ความสำคัญสูง</button>
              <button className="w-full text-left px-4 py-2 text-slate-500 font-medium rounded-xl text-sm hover:bg-slate-50 transition-colors">ที่มีรูปแนบ</button>
            </div>
          </div>
          <div className="bg-slate-800 text-white p-6 rounded-3xl shadow-xl shadow-slate-200">
             <AlertTriangle className="w-10 h-10 text-amber-400 mb-4" />
             <h4 className="text-lg font-bold mb-2">ปัญหาที่ยังไม่แก้ไข</h4>
             <p className="text-slate-400 text-sm mb-6">ขณะนี้มีปัญหาในระดับวิกฤต 3 รายการ ที่ต้องการการตรวจสอบโดยด่วน</p>
             <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm transition-colors border border-white/20">ตรวจสอบปัญหา</button>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          {MOCK_REPORTS.map((report) => (
            <div key={report.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-lg">
                      {report.date.split('-')[2]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">รายงานหน้างาน - วิลล่า A</h3>
                      <p className="text-sm text-slate-400 font-medium flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> โครงการ แกรนด์ เรสซิเดนซ์ • วันที่ {report.date}
                      </p>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 ${
                    report.severity === IssueLevel.CRITICAL ? 'bg-red-50 text-red-600 border border-red-100' :
                    report.severity === IssueLevel.MEDIUM ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                    'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                    ความสำคัญ: {report.severity}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 italic">
                      "{report.problems}"
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold">AK</div>
                         <p className="text-xs font-bold text-slate-700">วิศวกร: {report.engineer}</p>
                       </div>
                       <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>
                  <div className="relative group rounded-3xl overflow-hidden shadow-sm h-48 md:h-auto">
                    <img 
                      src={report.images[0]} 
                      alt="Site" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                       <p className="text-white text-xs font-bold flex items-center gap-2">
                         <FileText className="w-4 h-4" /> แนบไฟล์ทั้งหมด 3 รายการ
                       </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-8 py-4 flex items-center justify-between">
                <button className="text-xs font-bold text-slate-400 hover:text-blue-600">เขียนความคิดเห็น</button>
                <div className="flex gap-4">
                  <button className="text-xs font-bold text-slate-400 hover:text-slate-600">ส่งออกเป็น PDF</button>
                  <button className="text-xs font-bold text-blue-600 hover:underline">ดูรายละเอียดแบบเต็ม &rarr;</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
