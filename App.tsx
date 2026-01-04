
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ContractManagement } from './components/ContractManagement';
import { ProjectCenter } from './components/ProjectCenter';
import { VendorDirectory } from './components/VendorDirectory';
import { DailyReports } from './components/DailyReports';
import { UserProfile } from './components/UserProfile';
import { FullCalendar } from './components/FullCalendar';
import { Modal } from './components/Modal';
import { ProjectForm, TaskForm, VendorForm, ReportForm, AppointmentForm } from './components/Forms';
import { Contract } from './types';
import { MOCK_CONTRACTS } from './constants';

export type View = 'dashboard' | 'contracts' | 'projects' | 'vendors' | 'reports' | 'profile' | 'full-calendar';
export type ModalType = 'none' | 'project' | 'task' | 'vendor' | 'report' | 'appointment';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedProject, setSelectedProject] = useState<Contract | null>(MOCK_CONTRACTS[0]);
  const [activeModal, setActiveModal] = useState<ModalType>('none');

  const handleOpenModal = (type: ModalType) => setActiveModal(type);
  const handleCloseModal = () => setActiveModal('none');
  const handleFormSubmit = (data: any) => {
    console.log('Form data:', data);
    handleCloseModal();
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard 
          onSelectProject={(p) => { setSelectedProject(p); setCurrentView('projects'); }} 
          onCreateProject={() => handleOpenModal('project')}
        />;
      case 'contracts':
        return <ContractManagement onCreateContract={() => handleOpenModal('project')} />;
      case 'projects':
        return selectedProject ? (
          <ProjectCenter project={selectedProject} onCreateTask={() => handleOpenModal('task')} />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            กรุณาเลือกโครงการจากหน้าแดชบอร์ดหรือแถบด้านข้าง
          </div>
        );
      case 'vendors':
        return <VendorDirectory onCreateVendor={() => handleOpenModal('vendor')} />;
      case 'reports':
        return <DailyReports onCreateReport={() => handleOpenModal('report')} />;
      case 'profile':
        return <UserProfile />;
      case 'full-calendar':
        return <FullCalendar onCreateAppointment={() => handleOpenModal('appointment')} />;
      default:
        return <Dashboard 
          onSelectProject={(p) => { setSelectedProject(p); setCurrentView('projects'); }} 
          onCreateProject={() => handleOpenModal('project')}
        />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={setCurrentView} 
      selectedProject={selectedProject}
      onSelectProject={setSelectedProject}
    >
      {renderView()}

      {/* Modal Manager */}
      <Modal isOpen={activeModal === 'project'} onClose={handleCloseModal} title="สร้างโครงการ / สัญญาใหม่">
        <ProjectForm onCancel={handleCloseModal} onSubmit={handleFormSubmit} />
      </Modal>
      <Modal isOpen={activeModal === 'task'} onClose={handleCloseModal} title="เพิ่มงานใหม่">
        <TaskForm onCancel={handleCloseModal} onSubmit={handleFormSubmit} />
      </Modal>
      <Modal isOpen={activeModal === 'vendor'} onClose={handleCloseModal} title="เพิ่มคู่ค้าใหม่">
        <VendorForm onCancel={handleCloseModal} onSubmit={handleFormSubmit} />
      </Modal>
      <Modal isOpen={activeModal === 'report'} onClose={handleCloseModal} title="สร้างรายงานหน้างานประจำวัน">
        <ReportForm onCancel={handleCloseModal} onSubmit={handleFormSubmit} />
      </Modal>
      <Modal isOpen={activeModal === 'appointment'} onClose={handleCloseModal} title="นัดหมายใหม่">
        <AppointmentForm onCancel={handleCloseModal} onSubmit={handleFormSubmit} />
      </Modal>
    </Layout>
  );
};

export default App;
