export type UserRole =
  | "super_admin"
  | "school_admin"
  | "principal"
  | "teacher"
  | "parent"
  | "student";

export type SubscriptionPlan = "starter" | "professional" | "enterprise";
export type SubscriptionStatus = "active" | "trial" | "expired" | "cancelled";
export type PaymentStatus = "paid" | "pending" | "overdue" | "partial";
export type AttendanceStatus = "present" | "absent" | "late" | "half_day" | "leave";
export type ExamType = "unit_test" | "midterm" | "final" | "quiz" | "assignment";
export type CommunicationType = "sms" | "email" | "push" | "whatsapp";
export type AdmissionStatus = "enquiry" | "applied" | "interview" | "accepted" | "enrolled" | "rejected";

export interface School {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  board: string;
  logo?: string;
  website?: string;
  subdomain: string;
  customDomain?: string;
  subscription: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
  studentCount: number;
  teacherCount: number;
  createdAt: string;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  schoolId?: string;
}

export interface Student {
  id: string;
  admissionNo: string;
  name: string;
  fatherName: string;
  motherName: string;
  email?: string;
  phone: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  bloodGroup?: string;
  class: string;
  section: string;
  rollNo: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
  photo?: string;
  status: "active" | "inactive" | "graduated" | "transferred";
  admissionDate: string;
  feeStatus: PaymentStatus;
  attendancePercent: number;
}

export interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  experience: number;
  department: string;
  designation: string;
  salary: number;
  joiningDate: string;
  status: "active" | "inactive" | "on_leave";
}

export interface FeeStructure {
  id: string;
  name: string;
  class: string;
  amount: number;
  frequency: "monthly" | "quarterly" | "half_yearly" | "yearly" | "one_time";
  dueDate: string;
  lateFee: number;
  category: string;
}

export interface FeePayment {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  amount: number;
  paidAmount: number;
  status: PaymentStatus;
  paymentDate?: string;
  paymentMethod?: "online" | "cash" | "cheque" | "upi" | "bank_transfer";
  receiptNo?: string;
  dueDate: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  date: string;
  status: AttendanceStatus;
  markedBy: string;
  remarks?: string;
}

export interface TimetableEntry {
  id: string;
  day: string;
  period: number;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  class: string;
  section: string;
  room: string;
}

export interface Exam {
  id: string;
  name: string;
  type: ExamType;
  class: string;
  subject: string;
  date: string;
  startTime: string;
  duration: number;
  maxMarks: number;
  passingMarks: number;
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
}

export interface Communication {
  id: string;
  title: string;
  message: string;
  type: CommunicationType;
  audience: string;
  sentAt: string;
  sentBy: string;
  readCount: number;
  totalRecipients: number;
  status: "sent" | "scheduled" | "draft" | "failed";
}

export interface Admission {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  class: string;
  previousSchool?: string;
  status: AdmissionStatus;
  appliedDate: string;
  source: "website" | "walk_in" | "referral" | "social_media" | "qr_code";
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalRevenue: number;
  pendingFees: number;
  todayAttendance: number;
  newAdmissions: number;
  activeClasses: number;
  upcomingExams: number;
}

export interface SuperAdminStats {
  totalSchools: number;
  activeSchools: number;
  totalStudents: number;
  totalRevenue: number;
  monthlyRevenue: number;
  trialSchools: number;
  expiredSchools: number;
  supportTickets: number;
}
