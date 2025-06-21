# 🛠️ Morsl Admin Dashboard – Backend

This is the backend API for the **Morsl App Admin Dashboard**, supporting content and feedback management for a minimalist, offline-first mobile app designed to help users identify food cravings via intuitive swipe interactions.

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Multer** – for image uploads
- **JWT** – for admin authentication

---

## 📁 Project Structure

/src
┣ /controllers → Route handlers (auth, feedback, image, etc.)
┣ /middlewares → JWT auth checks, error handling
┣ /routes → All express routes
┣ /utils → Helper functions
┣ /uploads → Image storage
┣ app.ts → App setup
┗ server.ts → Server entry point
prisma/schema.prisma → Prisma DB schema

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/morsl-admin-backend.git
cd morsl-admin-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/morsldb
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Start the Server

```bash
npm run dev
```

Server will run at `http://localhost:5000`.

---

## 🧪 Seeding (Optional)

To import feedback from a JSON file:

```bash
npx ts-node prisma/seed.ts
```

Or use the `POST /api/feedbacks/import` endpoint with a JSON file.

---

## 🛠️ API Routes Summary

> All routes are protected by JWT middleware except login.

### 🔐 Auth

- `POST /api/auth/login` – Admin login (returns JWT)
- `POST /api/auth/logout` – Invalidate the token

### 📥 Feedback

- `GET /api/feedbacks` – View all feedback
- `POST /api/feedbacks/import` – Import JSON (no duplicates)

### 🖼️ Images

- `GET /api/images` – Get all images
- `POST /api/images` – Upload new image with metadata
- `PUT /api/images/:id` – Update image details
- `DELETE /api/images/:id` – Delete image

---

## ⚠️ Notes

- Token blacklist is in-memory. For production, use Redis.
- Protect all admin routes with middleware.
- Ensure `/uploads` folder exists or configure cloud storage in production.

---

## 📝 License

This backend is built for the Morsl App project and is for internal use only.

---

## 🙋 Contact

**Developer:** Barshon  
GitHub: [github.com/yourusername](https://github.com/barshono96)
