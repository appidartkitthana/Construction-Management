
import React from 'react';
import { User, Phone, Mail, MapPin, MoreHorizontal, Plus } from 'lucide-react';
import { MOCK_VENDORS } from '../constants';

interface VendorDirectoryProps {
  onCreateVendor: () => void;
}

export const VendorDirectory: React.FC<VendorDirectoryProps> = ({ onCreateVendor }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">ฐานข้อมูลคู่ค้าและผู้รับเหมา</h1>
          <p className="text-slate-500 mt-1">พันธมิตรที่เชื่อถือได้และเครือข่ายซัพพลายเชนของเรา</p>
        </div>
        <button 
          onClick={onCreateVendor}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> เพิ่มคู่ค้าใหม่
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_VENDORS.map((vendor) => (
          <div key={vendor.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600">
                <User className="w-8 h-8" />
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-1">{vendor.name}</h3>
            <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-6">{vendor.type}</p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <Phone className="w-4 h-4 text-slate-300" />
                <span>เบอร์โทร: {vendor.contact}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <Mail className="w-4 h-4 text-slate-300" />
                <span className="truncate">อีเมล: {vendor.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <MapPin className="w-4 h-4 text-slate-300" />
                <span>ที่อยู่: {vendor.address}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
              <div className="flex -space-x-1.5">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-400">
                     AK
                   </div>
                 ))}
              </div>
              <button className="text-xs font-bold text-blue-600 hover:underline">ดูประวัติการทำงาน</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
