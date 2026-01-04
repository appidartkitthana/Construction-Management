
import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Phone, Shield, Bell, Check, Save, Edit2, Camera, AlertCircle, History, ChevronDown } from 'lucide-react';
import { Modal } from './Modal';

interface ProfileHistoryRecord {
  id: string;
  timestamp: string;
  modifiedFields: string[];
}

const ROLE_DESCRIPTIONS: Record<string, string> = {
  'Admin': 'สิทธิ์สูงสุด: จัดการผู้ใช้งาน, กำหนดสิทธิ์ระบบ, เข้าถึงข้อมูลการเงินและสัญญาทั้งหมด',
  'Project Manager': 'สิทธิ์บริหาร: จัดการทุกโครงการ, อนุมัติแผนงานและงบประมาณ, ดูรายงานภาพรวมระดับบริษัท',
  'Site Engineer': 'สิทธิ์หน้างาน: บันทึกรายงานประจำวัน, อัปเดตสถานะงาน, ตรวจสอบวัสดุและเครื่องจักรหน้างาน',
  'Staff': 'สิทธิ์ทั่วไป: บันทึกข้อมูลพื้นฐาน, ดูรายละเอียดงานที่ได้รับมอบหมาย, พิมพ์เอกสารเบื้องต้น',
  'Sub-Contract': 'สิทธิ์จำกัด: อัปเดตเฉพาะงานจ้างเหมาที่รับผิดชอบ, บันทึกจำนวนคนงานรายวัน'
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${d}/${m}/${y} ${h}:${min}`;
};

export const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [history, setHistory] = useState<ProfileHistoryRecord[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: 'อนันต์',
    lastName: 'เค.',
    email: 'anan.k@archipro.com',
    phone: '081-234-5678',
    role: 'Project Manager',
    notifications: {
      email: true,
      push: true,
      sms: false,
      inApp: true
    }
  });

  const roles = [
    'Admin',
    'Project Manager',
    'Site Engineer',
    'Staff',
    'Sub-Contract'
  ];

  const [tempData, setTempData] = useState({ ...formData });

  useEffect(() => {
    const savedHistory = localStorage.getItem('profile_change_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleEdit = () => {
    setTempData({ ...formData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const requestSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmSave = () => {
    const modifiedFields: string[] = [];
    if (tempData.firstName !== formData.firstName) modifiedFields.push('ชื่อ');
    if (tempData.lastName !== formData.lastName) modifiedFields.push('นามสกุล');
    if (tempData.email !== formData.email) modifiedFields.push('อีเมล');
    if (tempData.phone !== formData.phone) modifiedFields.push('เบอร์โทรศัพท์');
    if (tempData.role !== formData.role) modifiedFields.push('บทบาท');
    
    if (modifiedFields.length > 0) {
      const newRecord: ProfileHistoryRecord = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        modifiedFields
      };
      const updatedHistory = [newRecord, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('profile_change_history', JSON.stringify(updatedHistory));
    }

    setFormData({ ...tempData });
    setIsEditing(false);
    setShowConfirm(false);
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-2 block">Settings</span>
          <h1 className="text-4xl font-black text-slate-800 tracking-tighter">โปรไฟล์ผู้ใช้งาน</h1>
          <p className="text-slate-500 mt-2 font-medium">จัดการตัวตนและสิทธิ์การเข้าถึงข้อมูลในระบบองค์กร</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={handleEdit}
            className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-800 rounded-[1.5rem] font-bold hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all active:scale-95"
          >
            <Edit2 className="w-4 h-4 text-blue-500" />
            แก้ไขข้อมูลส่วนตัว
          </button>
        ) : (
          <div className="flex gap-3">
            <button onClick={handleCancel} className="px-8 py-4 text-slate-500 font-bold hover:bg-slate-100 rounded-[1.5rem] transition-all">ยกเลิก</button>
            <button onClick={requestSave} className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95">
              <Save className="w-4 h-4" /> บันทึกข้อมูล
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Card & History */}
        <div className="lg:col-span-1 space-y-10">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-50 to-slate-50 -z-0"></div>
            <div className={`relative z-10 ${isEditing ? 'cursor-pointer' : ''}`} onClick={handleAvatarClick}>
              <div className="w-36 h-36 rounded-[2.5rem] bg-white flex items-center justify-center text-blue-600 text-5xl font-black border-8 border-white shadow-2xl overflow-hidden transition-transform group-hover:scale-105">
                {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : formData.firstName.charAt(0) + formData.lastName.charAt(0)}
              </div>
              {isEditing && (
                <div className="absolute inset-0 bg-blue-600/60 rounded-[2.5rem] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
                  <Camera className="w-8 h-8" />
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>
            <div className="mt-8 z-10">
              <h2 className="text-2xl font-black text-slate-800 tracking-tighter">{formData.firstName} {formData.lastName}</h2>
              <span className="mt-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest block">{formData.role}</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-3 mb-6 tracking-tight uppercase">
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center"><History className="w-4 h-4 text-slate-400" /></div>
              ประวัติการเปลี่ยนแปลง
            </h3>
            {history.length === 0 ? (
              <p className="text-xs text-slate-400 font-medium italic">ยังไม่มีประวัติการบันทึกข้อมูล</p>
            ) : (
              <div className="space-y-4">
                {history.map((record) => (
                  <div key={record.id} className="border-l-2 border-blue-200 pl-4 py-1">
                    <p className="text-[10px] font-bold text-slate-400 mb-1">{formatDate(record.timestamp)}</p>
                    <p className="text-xs font-bold text-slate-700">แก้ไข: <span className="text-blue-600">{record.modifiedFields.join(', ')}</span></p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Sections */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 mb-10 tracking-tight uppercase">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center"><User className="w-4 h-4 text-blue-600" /></div>
              Personal Information
            </h3>
            <div className="space-y-2">
              <ProfileInputRow label="ชื่อ" value={isEditing ? tempData.firstName : formData.firstName} disabled={!isEditing} onChange={(v) => setTempData({...tempData, firstName: v})} />
              <ProfileInputRow label="นามสกุล" value={isEditing ? tempData.lastName : formData.lastName} disabled={!isEditing} onChange={(v) => setTempData({...tempData, lastName: v})} />
              <ProfileInputRow label="อีเมลทางการ" icon={<Mail className="w-4 h-4" />} value={isEditing ? tempData.email : formData.email} disabled={!isEditing} onChange={(v) => setTempData({...tempData, email: v})} type="email" />
              <ProfileInputRow label="เบอร์โทรศัพท์" icon={<Phone className="w-4 h-4" />} value={isEditing ? tempData.phone : formData.phone} disabled={!isEditing} onChange={(v) => setTempData({...tempData, phone: v})} type="tel" />
              
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-6 border-b border-slate-50 last:border-0">
                <label className="md:w-1/3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">บทบาทในระบบ</label>
                <div className="flex-1 space-y-4">
                  <div className="relative">
                    <select 
                      disabled={!isEditing}
                      value={isEditing ? tempData.role : formData.role}
                      onChange={(e) => setTempData({...tempData, role: e.target.value})}
                      className={`w-full px-6 py-4 border-none rounded-2xl text-sm font-bold transition-all appearance-none ${
                        isEditing ? 'bg-slate-50 text-slate-800 ring-2 ring-transparent focus:ring-blue-100 cursor-pointer' : 'bg-transparent text-slate-400'
                      }`}
                    >
                      {roles.map(role => <option key={role} value={role}>{role}</option>)}
                    </select>
                    {isEditing && <ChevronDown className="w-4 h-4 absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />}
                  </div>
                  <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                      <Shield className="w-3 h-3" /> รายละเอียดสิทธิ์ (Permissions)
                    </p>
                    <p className="text-xs font-medium text-slate-600 leading-relaxed">
                      {ROLE_DESCRIPTIONS[isEditing ? tempData.role : formData.role]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 mb-10 tracking-tight uppercase">
               <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center"><Bell className="w-4 h-4 text-blue-600" /></div>
               การแจ้งเตือน
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NotificationToggle label="อีเมลอัปเดตงาน" active={isEditing ? tempData.notifications.email : formData.notifications.email} onToggle={() => isEditing && setTempData({...tempData, notifications: {...tempData.notifications, email: !tempData.notifications.email}})} />
              <NotificationToggle label="Push Notifications" active={isEditing ? tempData.notifications.push : formData.notifications.push} onToggle={() => isEditing && setTempData({...tempData, notifications: {...tempData.notifications, push: !tempData.notifications.push}})} />
              <NotificationToggle label="แจ้งเตือน SMS ด่วน" active={isEditing ? tempData.notifications.sms : formData.notifications.sms} onToggle={() => isEditing && setTempData({...tempData, notifications: {...tempData.notifications, sms: !tempData.notifications.sms}})} />
              <NotificationToggle label="การแจ้งเตือนในแอป" active={isEditing ? tempData.notifications.inApp : formData.notifications.inApp} onToggle={() => isEditing && setTempData({...tempData, notifications: {...tempData.notifications, inApp: !tempData.notifications.inApp}})} />
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="ยืนยันการบันทึก">
        <div className="text-center space-y-8 p-4">
          <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-inner"><AlertCircle className="w-12 h-12" /></div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-2">ยืนยันการเปลี่ยนแปลง?</h3>
            <p className="text-slate-500 font-medium">คุณกำลังจะบันทึกข้อมูลใหม่และบันทึกลงในประวัติประวัติการใช้งาน</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setShowConfirm(false)} className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-100 rounded-2xl transition-all">ยกเลิก</button>
            <button onClick={confirmSave} className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">ตกลงและบันทึก</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const ProfileInputRow: React.FC<{ label: string; value: string; disabled: boolean; onChange: (v: string) => void; icon?: React.ReactNode; type?: string; }> = ({ label, value, disabled, onChange, icon, type = "text" }) => (
  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-6 border-b border-slate-50 last:border-0 transition-all hover:bg-slate-50/50 -mx-4 px-4 rounded-xl group">
    <label className="md:w-1/3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</label>
    <div className="flex-1 relative">
      {icon && <div className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${disabled ? 'text-slate-300' : 'text-blue-500'}`}>{icon}</div>}
      <input type={type} disabled={disabled} value={value} onChange={(e) => onChange(e.target.value)}
        className={`w-full py-4 border-none rounded-2xl text-sm font-bold transition-all ${icon ? 'pl-14 pr-6' : 'px-6'} ${
          disabled ? 'bg-transparent text-slate-400' : 'bg-slate-50 text-slate-800 ring-2 ring-transparent focus:ring-blue-100 shadow-sm'
        }`}
      />
    </div>
  </div>
);

const NotificationToggle: React.FC<{ label: string, active: boolean, onToggle: () => void }> = ({ label, active, onToggle }) => (
  <div onClick={onToggle} className={`flex items-center justify-between p-6 rounded-3xl border transition-all cursor-pointer ${active ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-50 border-slate-50 text-slate-500 hover:border-slate-200'}`}>
    <span className="text-sm font-bold uppercase tracking-tight">{label}</span>
    <div className={`w-10 h-6 rounded-full relative transition-all ${active ? 'bg-white/30' : 'bg-slate-300'}`}>
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${active ? 'left-5' : 'left-1'}`} />
    </div>
  </div>
);
