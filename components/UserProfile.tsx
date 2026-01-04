
import React, { useState, useRef } from 'react';
import { User, Mail, Phone, Shield, Bell, Check, Save, Edit2, Camera, AlertCircle, X, ChevronDown } from 'lucide-react';
import { Modal } from './Modal';

export const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
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
    setFormData({ ...tempData });
    setIsEditing(false);
    setShowConfirm(false);
    // ในระบบจริงจะมีการเรียก API ที่นี่
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
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-2 block">Settings</span>
          <h1 className="text-4xl font-black text-slate-800 tracking-tighter">โปรไฟล์ผู้ใช้งาน</h1>
          <p className="text-slate-500 mt-2 font-medium">จัดการตัวตนของคุณและสิทธิ์การเข้าถึงในระบบ</p>
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
            <button 
              onClick={handleCancel}
              className="px-8 py-4 text-slate-500 font-bold hover:bg-slate-100 rounded-[1.5rem] transition-all"
            >
              ยกเลิก
            </button>
            <button 
              onClick={requestSave}
              className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              บันทึกข้อมูล
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Avatar Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-50 to-slate-50 -z-0"></div>
            
            <div 
              className={`relative z-10 ${isEditing ? 'cursor-pointer' : ''}`}
              onClick={handleAvatarClick}
            >
              <div className="w-36 h-36 rounded-[2.5rem] bg-white flex items-center justify-center text-blue-600 text-5xl font-black border-8 border-white shadow-2xl overflow-hidden transition-transform group-hover:scale-105">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  formData.firstName.charAt(0) + formData.lastName.charAt(0)
                )}
              </div>
              {isEditing && (
                <div className="absolute inset-0 bg-blue-600/60 rounded-[2.5rem] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
                  <div className="text-center">
                    <Camera className="w-8 h-8 mx-auto mb-1" />
                    <span className="text-[10px] font-black uppercase">Change</span>
                  </div>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>

            <div className="mt-8 z-10">
              <h2 className="text-2xl font-black text-slate-800 tracking-tighter">{formData.firstName} {formData.lastName}</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{formData.role}</span>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-slate-50 w-full flex flex-col gap-4 z-10">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-widest">
                <span>Account Status</span>
                <span className="text-emerald-500 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Verified
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 font-medium text-sm bg-slate-50 p-4 rounded-2xl">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>Enterprise User #8841</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 mb-10 tracking-tight uppercase">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center"><User className="w-4 h-4 text-blue-600" /></div>
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">First Name</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={isEditing ? tempData.firstName : formData.firstName}
                  onChange={(e) => setTempData({...tempData, firstName: e.target.value})}
                  className={`w-full px-6 py-4 border-none rounded-2xl text-sm font-bold transition-all ${
                    isEditing ? 'bg-slate-50 text-slate-800 ring-2 ring-transparent focus:ring-blue-100' : 'bg-transparent text-slate-400'
                  }`}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Last Name</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={isEditing ? tempData.lastName : formData.lastName}
                  onChange={(e) => setTempData({...tempData, lastName: e.target.value})}
                  className={`w-full px-6 py-4 border-none rounded-2xl text-sm font-bold transition-all ${
                    isEditing ? 'bg-slate-50 text-slate-800 ring-2 ring-transparent focus:ring-blue-100' : 'bg-transparent text-slate-400'
                  }`}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Official Email</label>
                <div className="relative">
                  <Mail className={`w-4 h-4 absolute left-6 top-1/2 -translate-y-1/2 ${isEditing ? 'text-blue-500' : 'text-slate-300'}`} />
                  <input 
                    type="email" 
                    disabled={!isEditing}
                    value={isEditing ? tempData.email : formData.email}
                    onChange={(e) => setTempData({...tempData, email: e.target.value})}
                    className={`w-full pl-14 pr-6 py-4 border-none rounded-2xl text-sm font-bold transition-all ${
                      isEditing ? 'bg-slate-50 text-slate-800 ring-2 ring-transparent focus:ring-blue-100' : 'bg-transparent text-slate-400'
                    }`}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Number</label>
                <div className="relative">
                  <Phone className={`w-4 h-4 absolute left-6 top-1/2 -translate-y-1/2 ${isEditing ? 'text-blue-500' : 'text-slate-300'}`} />
                  <input 
                    type="tel" 
                    disabled={!isEditing}
                    value={isEditing ? tempData.phone : formData.phone}
                    onChange={(e) => setTempData({...tempData, phone: e.target.value})}
                    className={`w-full pl-14 pr-6 py-4 border-none rounded-2xl text-sm font-bold transition-all ${
                      isEditing ? 'bg-slate-50 text-slate-800 ring-2 ring-transparent focus:ring-blue-100' : 'bg-transparent text-slate-400'
                    }`}
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">System Role</label>
                <div className="relative">
                  <select 
                    disabled={!isEditing}
                    value={isEditing ? tempData.role : formData.role}
                    onChange={(e) => setTempData({...tempData, role: e.target.value})}
                    className={`w-full px-6 py-4 border-none rounded-2xl text-sm font-bold transition-all appearance-none ${
                      isEditing ? 'bg-slate-50 text-slate-800 ring-2 ring-transparent focus:ring-blue-100 cursor-pointer' : 'bg-transparent text-slate-400'
                    }`}
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  {isEditing && <ChevronDown className="w-4 h-4 absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 mb-10 tracking-tight uppercase">
               <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center"><Bell className="w-4 h-4 text-blue-600" /></div>
               Notifications Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NotificationToggle 
                label="Email Updates" 
                active={isEditing ? tempData.notifications.email : formData.notifications.email}
                onToggle={() => isEditing && setTempData({
                  ...tempData, 
                  notifications: {...tempData.notifications, email: !tempData.notifications.email}
                })}
              />
              <NotificationToggle 
                label="Push Notifications" 
                active={isEditing ? tempData.notifications.push : formData.notifications.push}
                onToggle={() => isEditing && setTempData({
                  ...tempData, 
                  notifications: {...tempData.notifications, push: !tempData.notifications.push}
                })}
              />
              <NotificationToggle 
                label="SMS Alerts" 
                active={isEditing ? tempData.notifications.sms : formData.notifications.sms}
                onToggle={() => isEditing && setTempData({
                  ...tempData, 
                  notifications: {...tempData.notifications, sms: !tempData.notifications.sms}
                })}
              />
              <NotificationToggle 
                label="In-app Notification" 
                active={isEditing ? tempData.notifications.inApp : formData.notifications.inApp}
                onToggle={() => isEditing && setTempData({
                  ...tempData, 
                  notifications: {...tempData.notifications, inApp: !tempData.notifications.inApp}
                })}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="ยืนยันการบันทึก">
        <div className="text-center space-y-8 p-4">
          <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <AlertCircle className="w-12 h-12" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-2">Are you sure?</h3>
            <p className="text-slate-500 font-medium">คุณยืนยันที่จะบันทึกการเปลี่ยนแปลงข้อมูลทั้งหมดนี้ใช่หรือไม่?</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowConfirm(false)}
              className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-100 rounded-2xl transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={confirmSave}
              className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
            >
              Confirm & Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const NotificationToggle: React.FC<{ label: string, active: boolean, onToggle: () => void }> = ({ 
  label, active, onToggle 
}) => (
  <div 
    onClick={onToggle}
    className={`flex items-center justify-between p-6 rounded-3xl border transition-all cursor-pointer ${
      active ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-50 border-slate-50 text-slate-500 hover:border-slate-200'
    }`}
  >
    <span className="text-sm font-bold uppercase tracking-tight">{label}</span>
    <div className={`w-10 h-6 rounded-full relative transition-all ${active ? 'bg-white/30' : 'bg-slate-300'}`}>
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${active ? 'left-5' : 'left-1'}`} />
    </div>
  </div>
);
