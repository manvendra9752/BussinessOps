const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const leadRoutes = require("./routes/lead.routes");
const followupRoutes = require("./routes/followup.routes");
const invoiceRoutes = require("./routes/invoice.routes");
const userRoutes = require("./routes/user.routes");
const paymentRoutes = require("./routes/payment.routes");
const uploadRoutes = require("./routes/upload.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const errorHandler = require("./middlewares/errorHandler");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(helmet());

app.set("trust proxy", 1);

const allowedOrigins = [
  "https://bussiness-ops.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "https://bussiness-ops.vercel.app",
//     credentials: true,
//   }),
// );

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);

app.use("/api/users", userRoutes);

app.use("/api/followups", followupRoutes);

app.use("/api/invoices", invoiceRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/uploads", uploadRoutes);

app.use("/api/attachments", uploadRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/settings", require("./routes/setting.routes"));

app.use("/api/audit-logs", require("./routes/audit.routes"));

app.use(errorHandler);

module.exports = app;
