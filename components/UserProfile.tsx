
import React, { useState } from 'react';
import { User, Mail, Phone, Shield, Bell, Check, Save } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: 'อนันต์',
    lastName: 'เค.',
    email: 'anan.k@archipro.com',
    phone: '081-234-5678',
    role: 'ผู้จัดการโครงการ (Project Manager)',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">โปรไฟล์ผู้ใช้</h1>
          <p className="text-slate-500 mt-1">จัดการข้อมูลส่วนตัวและการตั้งค่าการใช้งานของคุณ</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          {saved ? 'บันทึกสำเร็จ' : 'บันทึกข้อมูล'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Avatar Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold border-4 border-white shadow-xl">
                AK
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-slate-100 text-slate-400 hover:text-blue-600 transition-colors">
                <User className="w-4 h-4" />
              </button>
            </div>
            <h2 className="mt-6 text-xl font-bold text-slate-800">{formData.firstName} {formData.lastName}</h2>
            <p className="text-blue-600 font-semibold text-sm mt-1">{formData.role}</p>
            <div className="mt-6 pt-6 border-t border-slate-50 w-full flex flex-col gap-3">
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <Shield className="w-4 h-4 text-slate-300" />
                <span>สถานะ: พนักงานประจำ</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>ยืนยันตัวตนแล้ว</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Forms */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" /> ข้อมูลการติดต่อ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">ชื่อ</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 text-sm focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">นามสกุล</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 text-sm focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">อีเมล</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 text-sm focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">เบอร์โทรศัพท์</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 text-sm focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-500" /> ตั้งค่าการแจ้งเตือน
            </h3>
            <div className="space-y-4">
              <NotificationToggle 
                label="การแจ้งเตือนทางอีเมล" 
                description="รับสรุปผลงานรายสัปดาห์และข่าวสารบริษัท" 
                active={formData.notifications.email}
                onToggle={() => setFormData({
                  ...formData, 
                  notifications: {...formData.notifications, email: !formData.notifications.email}
                })}
              />
              <NotificationToggle 
                label="การแจ้งเตือนแบบ Push" 
                description="แจ้งเตือนเมื่อมีงานใหม่หรือความคืบหน้าโครงการ" 
                active={formData.notifications.push}
                onToggle={() => setFormData({
                  ...formData, 
                  notifications: {...formData.notifications, push: !formData.notifications.push}
                })}
              />
              <NotificationToggle 
                label="การแจ้งเตือนทาง SMS" 
                description="แจ้งเตือนด่วนสำหรับปัญหาหน้างานระดับวิกฤต" 
                active={formData.notifications.sms}
                onToggle={() => setFormData({
                  ...formData, 
                  notifications: {...formData.notifications, sms: !formData.notifications.sms}
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationToggle: React.FC<{ label: string, description: string, active: boolean, onToggle: () => void }> = ({ 
  label, description, active, onToggle 
}) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 transition-all">
    <div>
      <p className="text-sm font-bold text-slate-700">{label}</p>
      <p className="text-xs text-slate-400 mt-0.5">{description}</p>
    </div>
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-all relative ${active ? 'bg-blue-600' : 'bg-slate-300'}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${active ? 'left-7' : 'left-1'}`} />
    </button>
  </div>
);
