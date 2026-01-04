
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin, Shield } from 'lucide-react';

interface FullCalendarProps {
  onCreateAppointment: () => void;
}

export const FullCalendar: React.FC<FullCalendarProps> = ({ onCreateAppointment }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1)); // March 2024
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const weekDays = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
  const months = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const events: Record<number, any[]> = {
    5: [{ title: 'เริ่มตอกเสาเข็ม', project: 'แกรนด์ เรสซิเดนซ์', type: 'งานโครงสร้าง' }],
    12: [{ title: 'ส่งมอบวัสดุเหล็ก', project: 'อีโค ทาวเวอร์', type: 'พัสดุ' }],
    15: [
      { title: 'ตรวจงวดงานครั้งที่ 1', project: 'แกรนด์ เรสซิเดนซ์', type: 'ตรวจสอบ' },
      { title: 'ประชุมประจำเดือน', project: 'บริษัท', type: 'ประชุม' }
    ],
    20: [{ title: 'ติดตั้งระบบไฟฟ้าชั้น 12', project: 'อีโค ทาวเวอร์', type: 'งานระบบ' }],
    28: [{ title: 'ทำบุญขึ้นบ้านใหม่ (Villa A)', project: 'แกรนด์ เรสซิเดนซ์', type: 'กิจกรรม' }]
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm text-blue-600">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">ตารางงานรวม</h1>
            <p className="text-slate-500 mt-1">แผนงานก่อสร้างและนัดหมายประจำเดือน {months[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden p-1">
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-6 font-bold text-slate-700 min-w-[140px] text-center">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={onCreateAppointment}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> นัดหมายใหม่
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-100">
          {weekDays.map((day, idx) => (
            <div key={idx} className="py-4 text-center">
              <span className={`text-xs font-bold uppercase tracking-widest ${idx === 0 || idx === 6 ? 'text-blue-300' : 'text-slate-400'}`}>
                {day}
              </span>
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-7 divide-x divide-y divide-slate-50">
          {calendarDays.map((day, idx) => (
            <div key={idx} className={`min-h-[100px] p-3 group transition-colors hover:bg-blue-50/30 ${day ? 'bg-white' : 'bg-slate-50/50'}`}>
              {day && (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full transition-all ${
                      day === 15 ? 'bg-blue-600 text-white' : 'text-slate-500 group-hover:text-blue-600'
                    }`}>
                      {day}
                    </span>
                    {events[day] && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                  </div>
                  <div className="space-y-1.5">
                    {events[day]?.map((event, eIdx) => (
                      <div 
                        key={eIdx} 
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg border-l-4 border-blue-500 truncate hover:shadow-sm cursor-pointer transition-shadow"
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
             <Clock className="w-5 h-5" />
           </div>
           <div>
             <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">กำลังจะมาถึง</p>
             <p className="text-slate-800 font-bold">ส่งมอบวัสดุเหล็ก (ใน 3 วัน)</p>
           </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
             <MapPin className="w-5 h-5" />
           </div>
           <div>
             <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">หน้างานหลัก</p>
             <p className="text-slate-800 font-bold">วิลล่า A, แกรนด์ เรสซิเดนซ์</p>
           </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
             <Shield className="w-5 h-5" />
           </div>
           <div>
             <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">สถานะทีมงาน</p>
             <p className="text-slate-800 font-bold">ทีมช่างประจำ (Active)</p>
           </div>
        </div>
      </div>
    </div>
  );
};
