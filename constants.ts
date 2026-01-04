
import { 
  Contract, ProjectStatus, Task, TaskStatus, Priority, InventoryItem, Vendor, DailyReport, IssueLevel 
} from './types';

export const MOCK_CONTRACTS: Contract[] = [
  {
    id: 'C-001',
    clientName: 'บริษัท สยาม ลักชูรี โฮมส์ จำกัด',
    projectName: 'หมู่บ้านแกรนด์ เรสซิเดนซ์ เฟส 1',
    contractNumber: 'SR-2024-001',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    value: 45000000,
    scope: 'งานโครงสร้างและตกแต่งภายในวิลล่าจำนวน 5 หลัง',
    status: ProjectStatus.ACTIVE,
    attachments: []
  },
  {
    id: 'C-002',
    clientName: 'บริษัท โมเดิร์น ออฟฟิศ จำกัด',
    projectName: 'อาคารอีโค ทาวเวอร์ (งานตกแต่ง)',
    contractNumber: 'MO-2024-088',
    startDate: '2024-03-15',
    endDate: '2024-09-30',
    value: 12500000,
    scope: 'ปรับปรุงระบบไฟฟ้าและ HVAC ชั้น 12-15',
    status: ProjectStatus.ACTIVE,
    attachments: []
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 'T-001',
    projectId: 'C-001',
    title: 'ตอกเสาเข็มฐานราก',
    assignee: 'สมชาย พ.',
    type: 'บริษัท',
    priority: Priority.HIGH,
    status: TaskStatus.DONE,
    startDate: '2024-01-05',
    endDate: '2024-01-20',
    progress: 100,
    category: 'งานโครงสร้าง',
    comments: []
  },
  {
    id: 'T-002',
    projectId: 'C-001',
    title: 'เดินสายไฟ - วิลล่า A',
    assignee: 'โวลต์ มาสเตอร์ (ซับ)',
    type: 'ซับคอนแทรค',
    priority: Priority.MEDIUM,
    status: TaskStatus.IN_PROGRESS,
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    progress: 45,
    category: 'งานไฟฟ้า',
    comments: [
      { id: 'CM-1', text: 'กำลังรอการส่งมอบวัสดุอุปกรณ์', author: 'มานะ เรียนรู้', timestamp: '2024-02-10 09:00' }
    ]
  },
  {
    id: 'T-003',
    projectId: 'C-001',
    title: 'งานไม้โถงกลาง',
    assignee: 'ดีไซน์ ไม้สัก',
    type: 'ซับคอนแทรค',
    priority: Priority.URGENT,
    status: TaskStatus.TODO,
    startDate: '2024-03-01',
    endDate: '2024-03-15',
    progress: 0,
    category: 'งานไม้',
    comments: []
  }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'I-001',
    projectId: 'C-001',
    name: 'ปูนซีเมนต์ปอร์ตแลนด์ (50กก.)',
    quantity: 150,
    unit: 'ถุง',
    status: 'มีสินค้า',
    history: []
  },
  {
    id: 'I-002',
    projectId: 'C-001',
    name: 'เหล็กเส้น (12มม.)',
    quantity: 12,
    unit: 'ตัน',
    status: 'สินค้าใกล้หมด',
    history: []
  }
];

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'V-001',
    name: 'ไทย สตีล ซัพพลาย',
    type: 'วัสดุก่อสร้าง',
    contact: '02-123-4567',
    email: 'sales@thaisteel.com',
    address: 'กรุงเทพมหานคร, ประเทศไทย',
    note: 'เหล็กเกรดพรีเมียม'
  },
  {
    id: 'V-002',
    name: 'โวลต์ มาสเตอร์ จำกัด',
    type: 'ซับคอนแทรคงานไฟฟ้า',
    contact: '081-999-0000',
    email: 'info@voltmasters.com',
    address: 'นนทบุรี, ประเทศไทย',
    note: 'เชี่ยวชาญระบบแรงดันสูง'
  }
];

export const MOCK_REPORTS: DailyReport[] = [
  {
    id: 'R-001',
    projectId: 'C-001',
    date: '2024-02-15',
    problems: 'ฝนตกหนักทำให้การเทคอนกรีตวิลล่า A ล่าช้า',
    severity: IssueLevel.MEDIUM,
    images: ['https://picsum.photos/400/300?random=1'],
    engineer: 'อนันต์ เค.'
  }
];
