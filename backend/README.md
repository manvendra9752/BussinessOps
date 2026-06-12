# BusinessOps Portal

A production-style full-stack CRM and invoicing portal for small consulting/service companies to manage leads, follow-ups, invoices, payments, file attachments, and users with role-based access control.

## Live URLs

- **Frontend:** [Vercel URL - TBD]
- **Backend:** [Render URL - TBD]
- **GitHub:** [Repository URL]

## Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend | Next.js 16 + React 19 + TypeScript | App Router, SSR, modern React with server components |
| Styling | Tailwind CSS v4 | Utility-first, fast iteration, production-quality UI |
| State | TanStack Query v5 | Server state caching, auto-refetch, mutation handling |
| Backend | Express.js 5 + Node.js | Lightweight, well-documented, fast API development |
| Database | MongoDB Atlas (Free Tier) | Flexible schema, free hosted cluster, great for prototyping |
| ODM | Mongoose v9 | Schema validation, middleware hooks, population support |
| Auth | JWT + httpOnly Cookies | Secure token storage, XSS-safe, automatic browser handling |
| File Storage | Cloudinary (Free Tier) | Image/PDF hosting, auto-optimization, 25GB free |
| Validation | Zod v4 | Type-safe schema validation, shared between frontend/backend |
| Deployment | Vercel (Frontend) + Render (Backend) | Free tiers, zero-config Next.js deployment |

## Test Credentials

All accounts use password: `Password@123`

| Role | Email | Access |
|------|-------|--------|
| Admin | admin@test.com | Full access to everything |
| Manager | manager@test.com | View users, manage leads, assign leads, create invoices |
| Agent 1 | agent1@test.com | Own assigned leads only, own follow-ups |
| Agent 2 | agent2@test.com | Own assigned leads only, own follow-ups |
| Finance | finance@test.com | Read-only leads, create invoices, process payments |

## Database Schema

### Collections

| Collection | Description |
|-----------|-------------|
| `users` | User accounts with name, email, hashed password, role (ADMIN/MANAGER/AGENT/FINANCE), isActive |
| `leads` | Business leads with name, email, phone, company, source, status, assignedTo (ref: User), notes |
| `followups` | Follow-up records linked to leads with followUpDate, message, status, createdBy |
| `invoices` | Invoices with items (embedded), subtotal, taxPercentage, taxAmount, discount, totalAmount, status |
| `paymentlogs` | Payment attempt records linked to invoices with provider, status, payload |
| `attachments` | File metadata with fileName, fileUrl, fileType, fileSize, uploadedBy, leadId/invoiceId |
| `auditlogs` | Activity tracking with actorUserId, action, entityType, entityId, metadata |
| `settings` | App settings with timezone, currency, companyName, companyEmail |

## API Routes

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT cookie |
| POST | `/api/auth/logout` | Clear auth cookie |
| GET | `/api/auth/me` | Get current user (protected) |

### Leads
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/leads?page=&limit=&search=&status=&assignedTo=&sort=` | List leads (paginated, filtered) |
| GET | `/api/leads/:id` | Get lead by ID |
| POST | `/api/leads` | Create lead (Admin/Manager) |
| PUT | `/api/leads/:id` | Update lead |
| DELETE | `/api/leads/:id` | Delete lead (Admin/Manager) |
| PATCH | `/api/leads/:id/assign` | Assign lead to agent (Admin/Manager) |

### Follow-ups
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/followups?status=&due=today\|overdue\|upcoming` | List follow-ups |
| GET | `/api/leads/:id/followups` | Get follow-ups for a lead |
| POST | `/api/leads/:id/followups` | Add follow-up to a lead |
| PUT | `/api/followups/:id` | Update follow-up status |

### Invoices
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/invoices?page=&limit=&status=&search=` | List invoices (paginated) |
| GET | `/api/invoices/:id` | Get invoice detail |
| POST | `/api/invoices` | Create invoice (Admin/Manager/Finance) |
| PUT | `/api/invoices/:id/status` | Update invoice status (not PAID) |
| POST | `/api/invoices/:id/send` | Send invoice (mock email) |

### Payments
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/payments/mock-create` | Initiate mock payment |
| POST | `/api/payments/mock-webhook` | Process payment webhook (requires x-webhook-secret header) |
| GET | `/api/payments/logs/:invoiceId` | Get payment logs for invoice |

### Users
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/users` | List users (Admin/Manager) |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create user (Admin only) |
| PUT | `/api/users/:id` | Update user (Admin only) |
| PATCH | `/api/users/:id/deactivate` | Deactivate user (Admin only) |

### Dashboard
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/dashboard` | Get dashboard stats |

### Other
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/audit-logs` | Get audit logs (Admin/Manager) |
| GET/PUT | `/api/settings` | Get/Update app settings |
| POST | `/api/uploads/lead/:id` | Upload lead attachment |
| POST | `/api/uploads/invoice/:id` | Upload invoice attachment |
| GET | `/api/uploads/lead/:id` | Get lead attachments |
| DELETE | `/api/attachments/:id` | Delete attachment |

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:3000
NODE_ENV=development
MOCK_WEBHOOK_SECRET=your_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Local Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Fill in your values
npm run seed          # Seed database with test data
npm run dev           # Starts on port 5000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local  # Set API URL
npm run dev                  # Starts on port 3000
```

## Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect GitHub repository, set root directory to `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all environment variables from `.env.example`
6. Set `NODE_ENV=production`

### Frontend (Vercel)
1. Import repository on Vercel
2. Set root directory to `frontend`
3. Add `NEXT_PUBLIC_API_URL` pointing to Render backend URL
4. Deploy

## Security Implementation

- Passwords hashed with bcryptjs (10 rounds)
- JWT stored in httpOnly cookies (not localStorage)
- Role-based authorization on every protected route
- Agent users can only access their own assigned leads (403 on others)
- Invoice totals calculated server-side (frontend values ignored)
- PAID status only through verified webhook with secret header
- File uploads validated for type (PDF/PNG/JPG) and size (2MB max) on backend
- Rate limiting on all routes (200/15min) and login (10/15min)
- No secrets in frontend code

## Known Limitations

- Email/WhatsApp notifications are mocked (no real sending)
- Payment gateway is mocked (no real payment processing)
- No real-time updates (polling via TanStack Query refetch)
- No password reset functionality
- No bulk operations (mass lead import/export)
- Timezone handling assumes server timezone; documented as UTC
