
import React, { useState, useRef } from 'react';
import { User, Mail, Phone, Shield, Bell, Check, Save, Edit2, Camera, AlertCircle, X } from 'lucide-react';
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
    // Simulate API call success notification
    alert('บันทึกข้อมูลเรียบร้อยแล้ว');
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
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">โปรไฟล์ผู้ใช้</h1>
          <p className="text-slate-500 mt-1">จัดการข้อมูลส่วนตัวและการตั้งค่าการใช้งานของคุณ</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={handleEdit}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 shadow-sm transition-all active:scale-95"
          >
            <Edit2 className="w-4 h-4" />
            แก้ไขข้อมูล
          </button>
        ) : (
          <div className="flex gap-3">
            <button 
              onClick={handleCancel}
              className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-all"
            >
              ยกเลิก
            </button>
            <button 
              onClick={requestSave}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              บันทึกข้อมูล
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Avatar Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <div 
              className={`relative group ${isEditing ? 'cursor-pointer' : ''}`}
              onClick={handleAvatarClick}
            >
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold border-4 border-white shadow-xl overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  formData.firstName.charAt(0) + formData.lastName.charAt(0)
                )}
              </div>
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8" />
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
                  disabled={!isEditing}
                  value={isEditing ? tempData.firstName : formData.firstName}
                  onChange={(e) => setTempData({...tempData, firstName: e.target.value})}
                  className={`w-full px-4 py-3 border-none rounded-xl text-sm transition-all ${
                    isEditing ? 'bg-slate-50 text-slate-700 focus:ring-2 focus:ring-blue-100' : 'bg-transparent text-slate-500 font-medium'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">นามสกุล</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={isEditing ? tempData.lastName : formData.lastName}
                  onChange={(e) => setTempData({...tempData, lastName: e.target.value})}
                  className={`w-full px-4 py-3 border-none rounded-xl text-sm transition-all ${
                    isEditing ? 'bg-slate-50 text-slate-700 focus:ring-2 focus:ring-blue-100' : 'bg-transparent text-slate-500 font-medium'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">อีเมล</label>
                <div className="relative">
                  <Mail className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${isEditing ? 'text-slate-300' : 'text-slate-400'}`} />
                  <input 
                    type="email" 
                    disabled={!isEditing}
                    value={isEditing ? tempData.email : formData.email}
                    onChange={(e) => setTempData({...tempData, email: e.target.value})}
                    className={`w-full pl-11 pr-4 py-3 border-none rounded-xl text-sm transition-all ${
                      isEditing ? 'bg-slate-50 text-slate-700 focus:ring-2 focus:ring-blue-100' : 'bg-transparent text-slate-500 font-medium'
                    }`}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">เบอร์โทรศัพท์</label>
                <div className="relative">
                  <Phone className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${isEditing ? 'text-slate-300' : 'text-slate-400'}`} />
                  <input 
                    type="tel" 
                    disabled={!isEditing}
                    value={isEditing ? tempData.phone : formData.phone}
                    onChange={(e) => setTempData({...tempData, phone: e.target.value})}
                    className={`w-full pl-11 pr-4 py-3 border-none rounded-xl text-sm transition-all ${
                      isEditing ? 'bg-slate-50 text-slate-700 focus:ring-2 focus:ring-blue-100' : 'bg-transparent text-slate-500 font-medium'
                    }`}
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">สิทธิ์การใช้งาน (Role)</label>
                <select 
                  disabled={!isEditing}
                  value={isEditing ? tempData.role : formData.role}
                  onChange={(e) => setTempData({...tempData, role: e.target.value})}
                  className={`w-full px-4 py-3 border-none rounded-xl text-sm transition-all appearance-none ${
                    isEditing ? 'bg-slate-50 text-slate-700 focus:ring-2 focus:ring-blue-100 cursor-pointer' : 'bg-transparent text-slate-500 font-medium'
                  }`}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
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
                active={isEditing ? tempData.notifications.email : formData.notifications.email}
                onToggle={() => isEditing && setTempData({
                  ...tempData, 
                  notifications: {...tempData.notifications, email: !tempData.notifications.email}
                })}
              />
              <NotificationToggle 
                label="การแจ้งเตือนแบบ Push" 
                description="แจ้งเตือนเมื่อมีงานใหม่หรือความคืบหน้าโครงการ" 
                active={isEditing ? tempData.notifications.push : formData.notifications.push}
                onToggle={() => isEditing && setTempData({
                  ...tempData, 
                  notifications: {...tempData.notifications, push: !tempData.notifications.push}
                })}
              />
              <NotificationToggle 
                label="การแจ้งเตือนทาง SMS" 
                description="แจ้งเตือนด่วนสำหรับปัญหาหน้างานระดับวิกฤต" 
                active={isEditing ? tempData.notifications.sms : formData.notifications.sms}
                onToggle={() => isEditing && setTempData({
                  ...tempData, 
                  notifications: {...tempData.notifications, sms: !tempData.notifications.sms}
                })}
              />
              <NotificationToggle 
                label="การแจ้งเตือนในแอป (In-app)" 
                description="แสดงจุดแจ้งเตือนบนแถบเครื่องมือเมื่อมีความเคลื่อนไหว" 
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

      {/* Confirmation Modal */}
      <Modal 
        isOpen={showConfirm} 
        onClose={() => setShowConfirm(false)} 
        title="ยืนยันการเปลี่ยนแปลง"
      >
        <div className="space-y-6 text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <AlertCircle className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800">คุณแน่ใจหรือไม่?</h3>
            <p className="text-slate-500">คุณต้องการบันทึกการเปลี่ยนแปลงข้อมูลโปรไฟล์เหล่านี้ใช่หรือไม่?</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowConfirm(false)}
              className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-all"
            >
              ตรวจสอบอีกครั้ง
            </button>
            <button 
              onClick={confirmSave}
              className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
            >
              บันทึกทันที
            </button>
          </div>
        </div>
      </Modal>
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
