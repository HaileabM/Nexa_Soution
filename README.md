# Nexa Solution

A modern, full-stack web application built for Nexa Solution featuring comprehensive service management, public showcase pages, client inquiry handling, and a secure admin dashboard.

## 🚀 Features

- **Modern Web Architecture**: Next.js 16 App Router with React 19 & TypeScript.
- **Client Facing Pages**:
  - Interactive Landing Page with dynamic highlights.
  - Services Catalog & Request Modal.
  - About Us showcasing mission, vision, and team.
  - Contact Form with direct inquiry submission.
- **Admin Management Portal**:
  - Secure JWT-based authentication with bcrypt password hashing.
  - Comprehensive Dashboard for tracking client inquiries, service requests, and news updates.
  - Interactive status controls and content management.
- **Data Persistence**: Prisma ORM with SQLite database integration.
- **Responsive & Dynamic UI**: Built with custom CSS design system, dark/light theme support, and Lucide icons.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router)
- **UI & Components**: [React](https://react.dev/) 19, [Lucide React](https://lucide.dev/)
- **Database & ORM**: SQLite via [Prisma](https://www.prisma.io/)
- **Authentication**: JWT (`jsonwebtoken`) & `bcryptjs`
- **Language**: TypeScript

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/HaileabM/Nexa_Soution.git
cd Nexa_Soution
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment configuration

Copy the example environment file and adjust variables if needed:

```bash
cp .env.example .env
```

### 4. Setup Database

Initialize the Prisma database and run seed data:

```bash
npm run prisma:generate
npm run db:push
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

- `npm run dev`: Starts the local development server with Turbopack.
- `npm run build`: Generates Prisma client and creates production build.
- `npm run start`: Starts the production server.
- `npm run db:push`: Pushes schema changes directly to the database.
- `npm run db:seed`: Seeds database with initial administrative and sample data.
- `npm run prisma:generate`: Generates Prisma Client.

---

## 📄 License

This project is licensed under the ISC License.
