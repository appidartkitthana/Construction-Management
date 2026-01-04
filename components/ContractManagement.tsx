
import React from 'react';
import { Plus, Download, Filter, FileText, Calendar, DollarSign, Users } from 'lucide-react';
import { MOCK_CONTRACTS } from '../constants';

interface ContractManagementProps {
  onCreateContract: () => void;
}

export const ContractManagement: React.FC<ContractManagementProps> = ({ onCreateContract }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">บริหารจัดการสัญญา</h1>
          <p className="text-slate-500 mt-1">การจัดการข้อตกลงทางกฎหมายและขอบเขตโครงการ</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> กรองข้อมูล
          </button>
          <button 
            onClick={onCreateContract}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            <Plus className="w-4 h-4" /> สร้างสัญญาใหม่
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_CONTRACTS.map((contract) => (
          <div key={contract.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    contract.status === 'เปิดใช้งาน' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {contract.status}
                  </span>
                  <span className="text-sm font-bold text-slate-400">เลขที่สัญญา # {contract.contractNumber}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{contract.projectName}</h2>
                <div className="flex flex-wrap gap-6">
                   <div className="flex items-center gap-2 text-slate-500">
                     <Users className="w-4 h-4" />
                     <span className="text-sm">{contract.clientName}</span>
                   </div>
                   <div className="flex items-center gap-2 text-slate-500">
                     <Calendar className="w-4 h-4" />
                     <span className="text-sm">{contract.startDate} ถึง {contract.endDate}</span>
                   </div>
                   <div className="flex items-center gap-2 text-blue-600 font-bold">
                     <DollarSign className="w-4 h-4" />
                     <span className="text-sm">มูลค่างาน: ฿{contract.value.toLocaleString()}</span>
                   </div>
                </div>
                <div className="text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-4">
                  <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">ขอบเขตงาน (Scope of Work)</span>
                  {contract.scope}
                </div>
              </div>

              <div className="lg:w-72 space-y-4 bg-slate-50 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                   <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">เอกสารแนบ</h4>
                   <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm cursor-pointer hover:border-blue-200 transition-colors">
                     <FileText className="text-blue-500 w-5 h-5" />
                     <div className="flex-1 truncate">
                       <p className="text-xs font-bold text-slate-700 truncate">สัญญาหลัก_ฉบับลงนาม.pdf</p>
                       <p className="text-[10px] text-slate-400">2.4 MB</p>
                     </div>
                     <Download className="w-4 h-4 text-slate-300" />
                   </div>
                </div>
                <div className="space-y-2">
                   <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors">แก้ไขข้อตกลง</button>
                   <button className="w-full py-2.5 bg-white text-slate-600 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 transition-colors">ต่ออายุสัญญา</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
