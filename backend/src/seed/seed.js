require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");
const Lead = require("../models/Lead");
const Followup = require("../models/Followup");
const Invoice = require("../models/Invoice");
const AuditLog = require("../models/AuditLog");
const Attachment = require("../models/Attachment");
const PaymentLog = require("../models/PaymentLog");

const seed = async () => {
  try {
    await connectDB();
    console.log("Cleaning database...");

    await User.deleteMany();
    await Lead.deleteMany();
    await Followup.deleteMany();
    await Invoice.deleteMany();
    await AuditLog.deleteMany();
    await Attachment.deleteMany();
    await PaymentLog.deleteMany();

    const password = await bcrypt.hash("Password@123", 10);

    const users = await User.insertMany([
      { name: "Admin User", email: "admin@test.com", password, role: "ADMIN" },
      {
        name: "Manager Singh",
        email: "manager@test.com",
        password,
        role: "MANAGER",
      },
      {
        name: "Agent Sharma",
        email: "agent1@test.com",
        password,
        role: "AGENT",
      },
      {
        name: "Agent Patel",
        email: "agent2@test.com",
        password,
        role: "AGENT",
      },
      {
        name: "Finance Kumar",
        email: "finance@test.com",
        password,
        role: "FINANCE",
      },
    ]);

    const [admin, manager, agent1, agent2, finance] = users;

    const sources = [
      "Website",
      "Referral",
      "LinkedIn",
      "Social Media",
      "Cold Call",
    ];
    const statuses = ["NEW", "CONTACTED", "FOLLOW_UP", "CONVERTED", "LOST"];
    const companies = [
      "TechCorp India",
      "Quantum Solutions",
      "NovaTech Pvt Ltd",
      "Apex Digital",
      "BlueStar Consulting",
      "GreenField Analytics",
      "Pinnacle Systems",
      "ClearView Software",
      "DataWave Technologies",
      "Summit Innovations",
      "BrightPath Services",
      "CoreLogic Enterprises",
      "Zenith Infotech",
      "EagleEye Solutions",
      "VistaPro Consulting",
      "NextGen Labs",
      "PrimeFocus Tech",
      "SwiftBridge IT",
      "CloudNine Services",
      "OmniSoft Solutions",
    ];
    const firstNames = [
      "Rajesh",
      "Priya",
      "Amit",
      "Sneha",
      "Vikram",
      "Anita",
      "Suresh",
      "Kavita",
      "Rahul",
      "Meera",
      "Arun",
      "Deepa",
      "Nikhil",
      "Pooja",
      "Sanjay",
      "Divya",
      "Manoj",
      "Isha",
      "Kiran",
      "Ritu",
    ];
    const lastNames = [
      "Sharma",
      "Patel",
      "Gupta",
      "Singh",
      "Kumar",
      "Verma",
      "Joshi",
      "Reddy",
      "Nair",
      "Das",
      "Mehta",
      "Iyer",
      "Chauhan",
      "Bhat",
      "Rao",
      "Mishra",
      "Kapoor",
      "Saxena",
      "Tiwari",
      "Malik",
    ];

    const leads = [];
    for (let i = 0; i < 20; i++) {
      const name = `${firstNames[i]} ${lastNames[i]}`;
      leads.push({
        name,
        email: `${firstNames[i].toLowerCase()}.${lastNames[i].toLowerCase()}@${companies[i].toLowerCase().replace(/\s+/g, "")}.com`,
        phone: `+91 ${9000000000 + Math.floor(Math.random() * 999999999)}`,
        company: companies[i],
        source: sources[i % sources.length],
        status: statuses[i % statuses.length],
        assignedTo: i % 2 === 0 ? agent1._id : agent2._id,
        notes: `Initial contact from ${sources[i % sources.length]}. ${i % 3 === 0 ? "High priority lead." : "Follow up needed."}`,
      });
    }

    const createdLeads = await Lead.insertMany(leads);

    // Followups
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(today.getDate() + 3);
    const overdue1 = new Date();
    overdue1.setDate(today.getDate() - 2);
    const overdue2 = new Date();
    overdue2.setDate(today.getDate() - 5);

    const followups = [];
    // 3 due today
    for (let i = 0; i < 3; i++) {
      followups.push({
        leadId: createdLeads[i]._id,
        followUpDate: today,
        message: `Scheduled call with ${createdLeads[i].name} today`,
        status: "PENDING",
        createdBy: manager._id,
      });
    }
    // 2 overdue
    followups.push({
      leadId: createdLeads[3]._id,
      followUpDate: overdue1,
      message: `Missed follow-up with ${createdLeads[3].name}`,
      status: "PENDING",
      createdBy: manager._id,
    });
    followups.push({
      leadId: createdLeads[4]._id,
      followUpDate: overdue2,
      message: `Overdue proposal review with ${createdLeads[4].name}`,
      status: "PENDING",
      createdBy: manager._id,
    });
    // 3 upcoming
    for (let i = 5; i < 8; i++) {
      followups.push({
        leadId: createdLeads[i]._id,
        followUpDate: tomorrow,
        message: `Demo scheduled with ${createdLeads[i].name}`,
        status: "PENDING",
        createdBy: manager._id,
      });
    }
    // 2 completed
    followups.push({
      leadId: createdLeads[8]._id,
      followUpDate: overdue1,
      message: `Completed onboarding call with ${createdLeads[8].name}`,
      status: "COMPLETED",
      createdBy: agent1._id,
    });
    followups.push({
      leadId: createdLeads[9]._id,
      followUpDate: overdue2,
      message: `Contract discussion with ${createdLeads[9].name} done`,
      status: "COMPLETED",
      createdBy: agent2._id,
    });

    await Followup.insertMany(followups);

    // Invoices - 8 total
    const invoices = [];

    // Invoice 1: Multi-item with discount and tax (PAID)
    invoices.push({
      leadId: createdLeads[0]._id,
      clientName: createdLeads[0].name,
      invoiceNumber: "INV-SEED-001",
      items: [
        {
          description: "Web Development - Phase 1",
          quantity: 2,
          unitPrice: 15000,
          lineTotal: 30000,
        },
        {
          description: "UI/UX Design",
          quantity: 1,
          unitPrice: 8000,
          lineTotal: 8000,
        },
        {
          description: "Technical Support (Monthly)",
          quantity: 3,
          unitPrice: 5000,
          lineTotal: 15000,
        },
      ],
      subtotal: 53000,
      taxPercentage: 18,
      taxAmount: 9540,
      discount: 2000,
      totalAmount: 60540,
      status: "PAID",
    });

    // Invoice 2: DRAFT
    invoices.push({
      leadId: createdLeads[1]._id,
      clientName: createdLeads[1].name,
      invoiceNumber: "INV-SEED-002",
      items: [
        {
          description: "Consulting Services",
          quantity: 5,
          unitPrice: 3000,
          lineTotal: 15000,
        },
      ],
      subtotal: 15000,
      taxPercentage: 18,
      taxAmount: 2700,
      discount: 0,
      totalAmount: 17700,
      status: "DRAFT",
    });

    // Invoice 3: SENT
    invoices.push({
      leadId: createdLeads[2]._id,
      clientName: createdLeads[2].name,
      invoiceNumber: "INV-SEED-003",
      items: [
        {
          description: "SEO Optimization Package",
          quantity: 1,
          unitPrice: 25000,
          lineTotal: 25000,
        },
      ],
      subtotal: 25000,
      taxPercentage: 18,
      taxAmount: 4500,
      discount: 1000,
      totalAmount: 28500,
      status: "SENT",
    });

    // Invoice 4: PAID
    invoices.push({
      leadId: createdLeads[3]._id,
      clientName: createdLeads[3].name,
      invoiceNumber: "INV-SEED-004",
      items: [
        {
          description: "Mobile App Development",
          quantity: 1,
          unitPrice: 50000,
          lineTotal: 50000,
        },
        {
          description: "App Store Submission",
          quantity: 1,
          unitPrice: 5000,
          lineTotal: 5000,
        },
      ],
      subtotal: 55000,
      taxPercentage: 18,
      taxAmount: 9900,
      discount: 3000,
      totalAmount: 61900,
      status: "PAID",
    });

    // Invoice 5: CANCELLED
    invoices.push({
      leadId: createdLeads[4]._id,
      clientName: createdLeads[4].name,
      invoiceNumber: "INV-SEED-005",
      items: [
        {
          description: "Cloud Migration",
          quantity: 1,
          unitPrice: 40000,
          lineTotal: 40000,
        },
      ],
      subtotal: 40000,
      taxPercentage: 18,
      taxAmount: 7200,
      discount: 0,
      totalAmount: 47200,
      status: "CANCELLED",
    });

    // Invoice 6-8: More variety
    invoices.push({
      leadId: createdLeads[5]._id,
      clientName: createdLeads[5].name,
      invoiceNumber: "INV-SEED-006",
      items: [
        {
          description: "Data Analytics Dashboard",
          quantity: 1,
          unitPrice: 35000,
          lineTotal: 35000,
        },
      ],
      subtotal: 35000,
      taxPercentage: 18,
      taxAmount: 6300,
      discount: 500,
      totalAmount: 40800,
      status: "SENT",
    });

    invoices.push({
      leadId: createdLeads[6]._id,
      clientName: createdLeads[6].name,
      invoiceNumber: "INV-SEED-007",
      items: [
        {
          description: "API Integration Services",
          quantity: 2,
          unitPrice: 12000,
          lineTotal: 24000,
        },
      ],
      subtotal: 24000,
      taxPercentage: 18,
      taxAmount: 4320,
      discount: 0,
      totalAmount: 28320,
      status: "DRAFT",
    });

    invoices.push({
      leadId: createdLeads[7]._id,
      clientName: createdLeads[7].name,
      invoiceNumber: "INV-SEED-008",
      items: [
        {
          description: "Annual Maintenance Contract",
          quantity: 1,
          unitPrice: 60000,
          lineTotal: 60000,
        },
      ],
      subtotal: 60000,
      taxPercentage: 18,
      taxAmount: 10800,
      discount: 5000,
      totalAmount: 65800,
      status: "PAID",
    });

    await Invoice.insertMany(invoices);

    // Payment logs for paid invoices
    await PaymentLog.insertMany([
      {
        invoiceId: invoices[0].leadId, // Will be overwritten below
        provider: "MOCK",
        status: "PAID",
        payload: { transactionId: "TXN_SEED_001", amount: 60540 },
      },
    ]);

    // Fix: get actual invoice IDs
    const savedInvoices = await Invoice.find({ status: "PAID" });
    for (const inv of savedInvoices) {
      await PaymentLog.create({
        invoiceId: inv._id,
        provider: "MOCK",
        status: "PAID",
        payload: {
          transactionId: "TXN_SEED_" + inv.invoiceNumber,
          amount: inv.totalAmount,
        },
      });
    }
    // Clean up the bad one
    await PaymentLog.deleteOne({ invoiceId: invoices[0].leadId });

    // Attachment
    await Attachment.create({
      fileName: "sample-contract.pdf",
      fileUrl: "https://example.com/sample-contract.pdf",
      fileType: "application/pdf",
      fileSize: 102400,
      uploadedBy: manager._id,
      leadId: createdLeads[0]._id,
    });

    // Audit logs
    await AuditLog.insertMany([
      {
        actorUserId: admin._id,
        action: "SEED_COMPLETED",
        entityType: "SYSTEM",
        entityId: "seed",
        metadata: {
          users: users.length,
          leads: 20,
          invoices: 8,
          followups: 10,
        },
      },
      {
        actorUserId: manager._id,
        action: "LEAD_CREATED",
        entityType: "LEAD",
        entityId: createdLeads[0]._id.toString(),
        metadata: { leadName: createdLeads[0].name },
      },
      {
        actorUserId: manager._id,
        action: "INVOICE_CREATED",
        entityType: "INVOICE",
        entityId: "INV-SEED-001",
        metadata: { amount: 60540 },
      },
    ]);

    console.log("Seed completed successfully!");
    console.log(`  Users: ${users.length}`);
    console.log(`  Leads: 20`);
    console.log(`  Followups: ${followups.length}`);
    console.log(`  Invoices: ${invoices.length}`);
    console.log(`  Attachments: 1`);
    console.log("\nTest Credentials (Password: Password@123):");
    console.log("  Admin:   admin@test.com");
    console.log("  Manager: manager@test.com");
    console.log("  Agent1:  agent1@test.com");
    console.log("  Agent2:  agent2@test.com");
    console.log("  Finance: finance@test.com");

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seed();
