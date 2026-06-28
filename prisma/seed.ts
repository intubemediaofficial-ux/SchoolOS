import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Super Admin
  const superAdminPassword = await bcrypt.hash("admin123", 12);
  const superAdmin = await prisma.user.create({
    data: {
      name: "Platform Admin",
      email: "admin@schoolos.in",
      phone: "9999900000",
      passwordHash: superAdminPassword,
      role: "super_admin",
      isActive: true,
      isVerified: true,
    },
  });
  console.log("Super admin created:", superAdmin.email);

  // Create Demo School
  const school = await prisma.school.create({
    data: {
      name: "Delhi Public School",
      subdomain: "dps-jaipur",
      email: "admin@dpsjaipur.schoolos.in",
      phone: "9876543210",
      city: "Jaipur",
      state: "Rajasthan",
      board: "CBSE",
      affiliationNo: "1730001",
      principalName: "Dr. Rajesh Sharma",
      establishedYear: 2003,
      subscription: "professional",
      subscriptionStatus: "active",
      subscriptionStart: new Date(),
      subscriptionEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      maxStudents: 5000,
      maxTeachers: 200,
    },
  });
  console.log("Demo school created:", school.name);

  // Create School Admin
  const schoolAdminPassword = await bcrypt.hash("school123", 12);
  await prisma.user.create({
    data: {
      name: "Dr. Rajesh Sharma",
      email: "admin@dpsjaipur.edu",
      phone: "9876543210",
      passwordHash: schoolAdminPassword,
      role: "school_admin",
      isActive: true,
      isVerified: true,
      schoolId: school.id,
    },
  });

  // Create Academic Session
  await prisma.academicSession.create({
    data: {
      schoolId: school.id,
      name: "2025-26",
      startDate: new Date("2025-04-01"),
      endDate: new Date("2026-03-31"),
      isCurrent: true,
    },
  });

  // Create Classes & Sections
  const classData = [
    { name: "LKG", order: 0 }, { name: "UKG", order: 1 },
    { name: "Class 1", order: 2 }, { name: "Class 2", order: 3 },
    { name: "Class 3", order: 4 }, { name: "Class 4", order: 5 },
    { name: "Class 5", order: 6 }, { name: "Class 6", order: 7 },
    { name: "Class 7", order: 8 }, { name: "Class 8", order: 9 },
    { name: "Class 9", order: 10 }, { name: "Class 10", order: 11 },
    { name: "Class 11", order: 12 }, { name: "Class 12", order: 13 },
  ];

  const classes: Record<string, string> = {};
  const sections: Record<string, string> = {};

  for (const c of classData) {
    const cls = await prisma.class.create({
      data: {
        schoolId: school.id,
        name: c.name,
        numericOrder: c.order,
        sections: {
          create: [
            { schoolId: school.id, name: "A", capacity: 40 },
            { schoolId: school.id, name: "B", capacity: 40 },
          ],
        },
      },
      include: { sections: true },
    });
    classes[c.name] = cls.id;
    for (const s of cls.sections) {
      sections[`${c.name}-${s.name}`] = s.id;
    }
  }

  // Create Subjects
  const subjectNames = ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer Science", "Physical Education", "Art & Craft", "Music", "Sanskrit"];
  const subjects: Record<string, string> = {};

  for (const name of subjectNames) {
    const subject = await prisma.subject.create({
      data: { schoolId: school.id, name, code: name.slice(0, 3).toUpperCase() },
    });
    subjects[name] = subject.id;
  }

  // Create Teachers
  const teacherData = [
    { name: "Priya Verma", phone: "9876501001", gender: "female" as const, qual: "M.A. English", dept: "English", desig: "PGT" },
    { name: "Amit Kumar", phone: "9876501002", gender: "male" as const, qual: "M.Sc. Mathematics", dept: "Mathematics", desig: "PGT" },
    { name: "Sunita Devi", phone: "9876501003", gender: "female" as const, qual: "M.Sc. Physics", dept: "Science", desig: "PGT" },
    { name: "Rahul Singh", phone: "9876501004", gender: "male" as const, qual: "M.A. Hindi", dept: "Hindi", desig: "TGT" },
    { name: "Meena Gupta", phone: "9876501005", gender: "female" as const, qual: "M.A. Social Studies", dept: "Social Studies", desig: "TGT" },
    { name: "Vijay Sharma", phone: "9876501006", gender: "male" as const, qual: "MCA", dept: "Computer Science", desig: "PGT" },
    { name: "Neha Agarwal", phone: "9876501007", gender: "female" as const, qual: "B.P.Ed", dept: "Physical Education", desig: "PRT" },
    { name: "Deepak Joshi", phone: "9876501008", gender: "male" as const, qual: "M.A. Sanskrit", dept: "Sanskrit", desig: "TGT" },
  ];

  const teachers: Record<string, string> = {};
  let empCount = 1;
  for (const t of teacherData) {
    const teacher = await prisma.teacher.create({
      data: {
        schoolId: school.id,
        employeeId: `EMP${String(empCount++).padStart(4, "0")}`,
        name: t.name,
        phone: t.phone,
        gender: t.gender,
        qualification: t.qual,
        department: t.dept,
        designation: t.desig,
        experience: Math.floor(Math.random() * 15) + 2,
        salary: 35000 + Math.floor(Math.random() * 30000),
      },
    });
    teachers[t.name] = teacher.id;
  }

  // Create Teacher User Accounts
  const teacherPassword = await bcrypt.hash("teacher123", 12);
  for (const t of teacherData.slice(0, 3)) {
    await prisma.user.create({
      data: {
        name: t.name,
        email: `${t.name.toLowerCase().replace(/ /g, ".")}@dpsjaipur.edu`,
        phone: t.phone,
        passwordHash: teacherPassword,
        role: "teacher",
        isActive: true,
        isVerified: true,
        schoolId: school.id,
      },
    });
  }

  // Create Students
  const firstNames = ["Arjun", "Aisha", "Rahul", "Priya", "Vikram", "Sneha", "Rohan", "Kavya", "Aditya", "Ananya", "Dev", "Ishita", "Karan", "Riya", "Siddharth", "Tanvi", "Varun", "Zara", "Dhruv", "Meera"];
  const lastNames = ["Sharma", "Verma", "Singh", "Gupta", "Kumar", "Agarwal", "Jain", "Patel", "Mishra", "Chauhan"];

  let studentCount = 0;
  for (const className of ["Class 1", "Class 5", "Class 8", "Class 10", "Class 12"]) {
    for (const sec of ["A", "B"]) {
      const sectionId = sections[`${className}-${sec}`];
      for (let i = 0; i < 8; i++) {
        const firstName = firstNames[(studentCount + i) % firstNames.length];
        const lastName = lastNames[(studentCount + i) % lastNames.length];
        const fatherFirst = firstNames[(studentCount + i + 5) % firstNames.length];

        const parent = await prisma.parent.create({
          data: {
            schoolId: school.id,
            name: `${fatherFirst} ${lastName}`,
            phone: `98765${String(20000 + studentCount).padStart(5, "0")}`,
            email: `${fatherFirst.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
          },
        });

        await prisma.student.create({
          data: {
            schoolId: school.id,
            admissionNo: `25${String(studentCount + 1).padStart(4, "0")}`,
            name: `${firstName} ${lastName}`,
            dateOfBirth: new Date(2010 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
            gender: i % 2 === 0 ? "male" : "female",
            fatherName: `${fatherFirst} ${lastName}`,
            fatherPhone: parent.phone,
            fatherEmail: parent.email,
            sectionId,
            rollNo: i + 1,
            parentId: parent.id,
            status: "active",
            category: ["General", "OBC", "SC", "General"][i % 4],
          },
        });
        studentCount++;
      }
    }
  }
  console.log(`Created ${studentCount} students`);

  // Create Fee Structures
  const feeStructures = await Promise.all([
    prisma.feeStructure.create({ data: { schoolId: school.id, name: "Tuition Fee", amount: 5000, frequency: "monthly", dueDay: 10, lateFee: 200, lateFeeAfterDays: 15 } }),
    prisma.feeStructure.create({ data: { schoolId: school.id, name: "Transport Fee", amount: 2000, frequency: "monthly", dueDay: 10, isOptional: true } }),
    prisma.feeStructure.create({ data: { schoolId: school.id, name: "Annual Fee", amount: 15000, frequency: "yearly", dueDay: 1 } }),
    prisma.feeStructure.create({ data: { schoolId: school.id, name: "Lab Fee", amount: 3000, frequency: "yearly", dueDay: 1, isOptional: true } }),
  ]);

  // Create some Fee Payments
  const allStudents = await prisma.student.findMany({ where: { schoolId: school.id }, take: 20 });
  const paymentMethods = ["upi", "online_gateway", "bank_transfer", "cash", "cheque"] as const;

  for (const student of allStudents) {
    const isPaid = Math.random() > 0.3;
    await prisma.feePayment.create({
      data: {
        schoolId: school.id,
        studentId: student.id,
        feeStructureId: feeStructures[0].id,
        amount: 5000,
        paidAmount: isPaid ? 5000 : 0,
        dueDate: new Date(2025, 5, 10),
        paidDate: isPaid ? new Date(2025, 5, Math.floor(Math.random() * 10) + 1) : null,
        status: isPaid ? "paid" : "pending",
        paymentMethod: isPaid ? paymentMethods[Math.floor(Math.random() * paymentMethods.length)] : null,
        receiptNo: isPaid ? `RCP-${Date.now().toString(36).toUpperCase()}${student.id.slice(-4)}` : null,
      },
    });
  }

  // Create Attendance Records for today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const statuses = ["present", "present", "present", "present", "present", "present", "present", "absent", "late", "present"] as const;

  for (const student of allStudents) {
    await prisma.attendanceRecord.create({
      data: {
        schoolId: school.id,
        studentId: student.id,
        sectionId: student.sectionId,
        date: today,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        markedBy: "Priya Verma",
        deviceType: "manual",
      },
    });
  }

  // Create Events
  const events = [
    { title: "Annual Day", type: "event", date: new Date(2025, 11, 20), description: "Annual day celebration" },
    { title: "Parent-Teacher Meeting", type: "meeting", date: new Date(2025, 7, 15), description: "PTM for all classes" },
    { title: "Independence Day", type: "holiday", date: new Date(2025, 7, 15) },
    { title: "Mid-Term Exam", type: "exam", date: new Date(2025, 8, 1) },
    { title: "Science Fair", type: "competition", date: new Date(2025, 9, 10), description: "Inter-school science fair" },
  ];

  for (const e of events) {
    await prisma.event.create({
      data: { schoolId: school.id, ...e },
    });
  }

  // Create Books
  const books = [
    { title: "NCERT Mathematics Class 10", author: "NCERT", category: "Textbook", isbn: "978-8174-5050-1" },
    { title: "Together with English", author: "Rachna Sagar", category: "Guide", isbn: "978-9350-5040-2" },
    { title: "Wings of Fire", author: "APJ Abdul Kalam", category: "Biography", isbn: "978-8173-7146-3" },
    { title: "The Story of My Experiments with Truth", author: "M.K. Gandhi", category: "Autobiography", isbn: "978-8172-2451-4" },
    { title: "Malgudi Days", author: "R.K. Narayan", category: "Fiction", isbn: "978-0140-1071-5" },
  ];

  for (const b of books) {
    await prisma.book.create({
      data: { schoolId: school.id, ...b, totalCopies: 10, availableCopies: Math.floor(Math.random() * 8) + 2 },
    });
  }

  // Create Vehicles & Routes
  const bus = await prisma.vehicle.create({
    data: { schoolId: school.id, vehicleNo: "RJ-14-PA-1234", type: "bus", capacity: 40, driverName: "Ramesh Yadav", driverPhone: "9876509001", gpsDeviceId: "GPS-001" },
  });

  await prisma.transportRoute.create({
    data: {
      schoolId: school.id,
      name: "Route 1 - Mansarovar",
      vehicleId: bus.id,
      fare: 2000,
      stops: [
        { name: "Mansarovar Metro", lat: 26.8503, lng: 75.7887, time: "07:00", order: 1 },
        { name: "Vaishali Nagar", lat: 26.9124, lng: 75.7363, time: "07:20", order: 2 },
        { name: "School", lat: 26.9025, lng: 75.7621, time: "07:45", order: 3 },
      ],
    },
  });

  // Create Notices
  await prisma.notice.create({
    data: { schoolId: school.id, title: "Fee Payment Reminder", content: "Kindly pay the pending fees for the month of June 2025 before 15th June to avoid late charges.", priority: "important", createdBy: "Admin" },
  });

  // Create Second Demo School
  const school2 = await prisma.school.create({
    data: {
      name: "St. Mary's Convent School",
      subdomain: "st-marys-delhi",
      email: "info@stmarys.edu",
      phone: "9876500001",
      city: "Delhi",
      state: "Delhi",
      board: "ICSE",
      principalName: "Sr. Maria Francis",
      subscription: "enterprise",
      subscriptionStatus: "active",
      subscriptionStart: new Date(),
      subscriptionEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.user.create({
    data: {
      name: "Sr. Maria Francis",
      email: "admin@stmarys.edu",
      phone: "9876500001",
      passwordHash: schoolAdminPassword,
      role: "school_admin",
      isActive: true,
      isVerified: true,
      schoolId: school2.id,
    },
  });

  // Create Support Tickets
  await prisma.supportTicket.create({
    data: {
      schoolId: school.id,
      schoolName: school.name,
      subject: "Unable to generate report cards",
      description: "Getting error while generating report cards for Class 10. Please help.",
      priority: "high",
      status: "open",
    },
  });

  await prisma.supportTicket.create({
    data: {
      schoolId: school2.id,
      schoolName: school2.name,
      subject: "Custom domain setup",
      description: "Need help setting up our custom domain stmarys.edu.in",
      priority: "medium",
      status: "in_progress",
      assignedTo: "Platform Admin",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
