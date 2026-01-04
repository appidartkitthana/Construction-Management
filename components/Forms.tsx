
import React from 'react';
import { Priority, TaskStatus, IssueLevel, ProjectStatus } from '../types';

interface FormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const InputField = ({ label, type = "text", placeholder = "", required = false }: any) => (
  <div className="space-y-1.5">
    <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{label} {required && '*'}</label>
    <input 
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border-none rounded-xl text-slate-700 text-sm focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-300"
    />
  </div>
);

const SelectField = ({ label, options, required = false }: any) => (
  <div className="space-y-1.5">
    <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{label} {required && '*'}</label>
    <select className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border-none rounded-xl text-slate-700 text-sm focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer">
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const TextareaField = ({ label, placeholder = "", rows = 3 }: any) => (
  <div className="space-y-1.5">
    <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</label>
    <textarea 
      rows={rows}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border-none rounded-xl text-slate-700 text-sm focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-300 resize-none"
    />
  </div>
);

const FormActions = ({ onCancel }: { onCancel: () => void }) => (
  <div className="flex gap-3 pt-6 mt-6 border-t border-slate-50">
    <button 
      type="button"
      onClick={onCancel}
      className="flex-1 py-3 text-slate-500 font-bold text-xs md:text-sm hover:bg-slate-50 rounded-xl transition-colors"
    >
      ยกเลิก
    </button>
    <button 
      type="submit"
      className="flex-[2] py-3 bg-blue-600 text-white font-bold text-xs md:text-sm rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98]"
    >
      บันทึกข้อมูล
    </button>
  </div>
);

export const ProjectForm: React.FC<FormProps> = ({ onCancel, onSubmit }) => (
  <form onSubmit={(e) => { e.preventDefault(); onSubmit({}); }} className="space-y-4 md:space-y-5">
    <InputField label="ชื่อโครงการ" placeholder="เช่น หมู่บ้านแกรนด์ เรสซิเดนซ์" required />
    <InputField label="ชื่อลูกค้า" placeholder="บริษัท หรือ บุคคล" required />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="เลขที่สัญญา" placeholder="SR-2024-XXX" />
      <InputField label="มูลค่างาน (บาท)" type="number" placeholder="0.00" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <InputField label="วันที่เริ่ม" type="date" />
      <InputField label="วันที่สิ้นสุด" type="date" />
    </div>
    <SelectField label="สถานะ" options={Object.values(ProjectStatus)} />
    <TextareaField label="ขอบเขตงาน (Scope of Work)" placeholder="รายละเอียดงานโดยสรุป..." />
    <FormActions onCancel={onCancel} />
  </form>
);

export const TaskForm: React.FC<FormProps> = ({ onCancel, onSubmit }) => (
  <form onSubmit={(e) => { e.preventDefault(); onSubmit({}); }} className="space-y-4 md:space-y-5">
    <InputField label="หัวข้องาน" placeholder="เช่น งานเดินท่อน้ำทิ้ง" required />
    <InputField label="ผู้รับผิดชอบ" placeholder="ระบุชื่อพนักงาน หรือ ทีมช่าง" required />
    <div className="grid grid-cols-2 gap-4">
      <SelectField label="ประเภทงาน" options={['งานโครงสร้าง', 'งานไม้', 'งานไฟฟ้า', 'งานประปา', 'งานระบบ', 'งานตกแต่ง']} />
      <SelectField label="ประเภทช่าง" options={['บริษัท', 'ซับคอนแทรค']} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <SelectField label="ระดับความสำคัญ" options={Object.values(Priority)} />
      <SelectField label="สถานะ" options={Object.values(TaskStatus)} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <InputField label="เริ่มวันที่" type="date" />
      <InputField label="สิ้นสุดวันที่" type="date" />
    </div>
    <FormActions onCancel={onCancel} />
  </form>
);

export const VendorForm: React.FC<FormProps> = ({ onCancel, onSubmit }) => (
  <form onSubmit={(e) => { e.preventDefault(); onSubmit({}); }} className="space-y-4 md:space-y-5">
    <InputField label="ชื่อบริษัท / ชื่อคู่ค้า" placeholder="บริษัท ไทยวัสดุ จำกัด" required />
    <SelectField label="ประเภทบริการ/สินค้า" options={['วัสดุก่อสร้าง', 'งานไฟฟ้า', 'งานประปา', 'งานไม้', 'เช่าเครื่องจักร']} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="เบอร์โทรศัพท์" placeholder="02-XXX-XXXX" />
      <InputField label="อีเมล" type="email" placeholder="contact@company.com" />
    </div>
    <TextareaField label="ที่อยู่" placeholder="เลขที่, ถนน, ตำบล..." />
    <TextareaField label="หมายเหตุเพิ่มเติม" />
    <FormActions onCancel={onCancel} />
  </form>
);

export const ReportForm: React.FC<FormProps> = ({ onCancel, onSubmit }) => (
  <form onSubmit={(e) => { e.preventDefault(); onSubmit({}); }} className="space-y-4 md:space-y-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="วันที่รายงาน" type="date" required />
      <SelectField label="ระดับความรุนแรง" options={Object.values(IssueLevel)} />
    </div>
    <TextareaField label="ปัญหาที่พบหน้างาน" placeholder="อธิบายปัญหาที่พบ..." required />
    <div className="space-y-1.5">
      <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">รูปถ่ายหน้างาน</label>
      <div className="w-full h-24 md:h-32 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer group">
         <div className="p-2 md:p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform mb-2">📸</div>
         <span className="text-[10px] md:text-xs font-bold">อัปโหลดรูปภาพ</span>
      </div>
    </div>
    <FormActions onCancel={onCancel} />
  </form>
);

export const AppointmentForm: React.FC<FormProps> = ({ onCancel, onSubmit }) => (
  <form onSubmit={(e) => { e.preventDefault(); onSubmit({}); }} className="space-y-4 md:space-y-5">
    <InputField label="หัวข้อการนัดหมาย" placeholder="เช่น ตรวจงวดงานเบสเมนท์" required />
    <div className="grid grid-cols-2 gap-4">
      <InputField label="วันที่" type="date" required />
      <InputField label="เวลา" type="time" required />
    </div>
    <SelectField label="โครงการที่เกี่ยวข้อง" options={['แกรนด์ เรสซิเดนซ์', 'อีโค ทาวเวอร์', 'อื่นๆ']} />
    <TextareaField label="รายละเอียดเพิ่มเติม" />
    <FormActions onCancel={onCancel} />
  </form>
);
