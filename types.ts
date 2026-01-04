
export enum ProjectStatus {
  ACTIVE = 'เปิดใช้งาน',
  DRAFT = 'ร่าง',
  COMPLETED = 'เสร็จสิ้น',
  CANCELLED = 'ยกเลิก'
}

export enum TaskStatus {
  TODO = 'งานที่ต้องทำ',
  IN_PROGRESS = 'กำลังดำเนินการ',
  REVIEW = 'รอตรวจสอบ',
  DONE = 'เสร็จสมบูรณ์',
  BLOCKED = 'ติดปัญหา'
}

export enum Priority {
  LOW = 'ต่ำ',
  MEDIUM = 'กลาง',
  HIGH = 'สูง',
  URGENT = 'ด่วนที่สุด'
}

export enum IssueLevel {
  CRITICAL = 'วิกฤต',
  HIGH = 'สูง',
  MEDIUM = 'กลาง',
  LOW = 'ต่ำ'
}

export interface Contract {
  id: string;
  clientName: string;
  projectName: string;
  contractNumber: string;
  startDate: string;
  endDate: string;
  value: number;
  scope: string;
  status: ProjectStatus;
  attachments: string[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  assignee: string;
  type: 'บริษัท' | 'ซับคอนแทรค';
  priority: Priority;
  status: TaskStatus;
  startDate: string;
  endDate: string;
  progress: number;
  category: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  image?: string;
}

export interface InventoryItem {
  id: string;
  projectId: string;
  name: string;
  quantity: number;
  unit: string;
  status: 'มีสินค้า' | 'สินค้าใกล้หมด' | 'สินค้าหมด';
  history: InventoryHistory[];
}

export interface InventoryHistory {
  id: string;
  type: 'รับเข้า' | 'เบิกออก';
  quantity: number;
  date: string;
  user: string;
}

export interface DailyReport {
  id: string;
  projectId: string;
  date: string;
  problems: string;
  severity: IssueLevel;
  images: string[];
  engineer: string;
}

export interface Vendor {
  id: string;
  name: string;
  type: string;
  contact: string;
  email: string;
  address: string;
  note: string;
}
