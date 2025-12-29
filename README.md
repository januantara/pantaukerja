# Pantau Kerja

**Your Personal Job Search Companion.**

[**🚀 Live Demo**](https://pantaukerja.vercel.app)

Job hunting is hard work. Keeping track of it shouldn't be. **Pantau Kerja** replaces messy spreadsheets and scattered notes with a clean, intuitive dashboard designed to help you stay organized, focused, and ready for your next big opportunity.

## 🎯 Why Pantau Kerja?

- **Stay Organized**: Keep every application, status, and detail in one centralized hub.
- **Visualize Progress**: A beautiful Kanban board lets you see exactly where you stand with every company.
- **Beat the Chaos**: Track interviews, notes, and follow-ups so nothing slips through the cracks.
- **Focus on the Goal**: Spend less time managing data and more time preparing for interviews.

## ✨ Key Features for Job Seekers

- 📋 **Smart Application Tracking**: Log every job applied to, complete with salary info, dates, and custom notes.
- 📊 **Visual Board & List Views**: Switch between a high-level board view and a detailed list view to suit your workflow.
- 📅 **Interview Scheduler**: Dedicated space to track upcoming interviews (HR, Technical, User) so you're always prepared.
- 🗓️ **Add to Google Calendar**: Never miss a beat, add interviews directly to your Google Calendar with a single click.
- 🔍 **Instant Search**: Find that one company you applied to weeks ago in seconds.
- 🌙 **Dark Mode**: Easy on the eyes for those late-night application sessions.

---

## 💻 Tech Stack (For Developers)

While designed for job seekers, Pantau Kerja is built with a high-performance, modern tech stack:

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Bun](https://bun.sh/) (v1.0 or later) is required for this project.
- A PostgreSQL database (we recommend [Neon](https://neon.tech/) for serverless Postgres).

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/januantara/pantaukerja.git
   cd pantaukerja
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and configure your environment variables:
   ```env
   DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"
   # Add other Google/Social Auth keys if needed
   ```

4. **Database Setup**
   Push the schema to your database:
   ```bash
   bunx drizzle-kit push
   ```

5. **Run the development server**
   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
