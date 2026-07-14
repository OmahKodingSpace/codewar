# App setup guidance
_Exported on 7/14/2026 at 09:42:48 GMT+7 from Cursor (3.10.11)_

---

**User**

Setup guidance of this app

---

**Cursor**

Saya akan memeriksa dokumentasi dan konfigurasi proyek untuk menyusun panduan setup yang akurat.


# Panduan Setup CodeWar

Proyek ini adalah platform coding challenge (**CodeWar**) di atas Next.js 16, dengan auth JWT custom, database Neon Postgres + Drizzle, dan generasi challenge via Anthropic Claude.

> **Catatan:** `README.md` masih menyebut Clerk (dari template asli). Setup aktual mengikuti `AGENTS.md` dan `env.example.txt`.

---

## Prasyarat

| Tool | Versi / Catatan |
|------|-----------------|
| **Bun** (disarankan) atau npm | Package manager utama |
| **Node.js** | Kompatibel dengan Next.js 16 |
| **Akun [Neon](https://neon.tech)** | Postgres serverless |
| **API key [Anthropic](https://console.anthropic.com)** | Wajib untuk generate challenge |
| **Sentry** (opsional) | Error tracking |

---

## 1. Clone & install dependensi

```bash
git clone <url-repo-anda>
cd codewar
bun install
```

Alternatif dengan npm: `npm install`

---

## 2. Konfigurasi environment

Salin template env:

```bash
cp env.example.txt .env.local
```

Isi variabel **wajib**:

```env
# Neon Postgres connection string
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Secret untuk JWT (gunakan string acak yang kuat di production)
JWT_SECRET=your-strong-random-secret

# Anthropic — untuk AI challenge generation
ANTHROPIC_API_KEY=sk-ant-...
```

Variabel **opsional**:

```env
ANTHROPIC_BASE_URL=      # Proxy/custom endpoint
ANTHROPIC_MODEL=         # Default: claude-haiku-4-5-20251001

# Sentry — bisa dinonaktifkan di dev
NEXT_PUBLIC_SENTRY_DISABLED=true
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SENTRY_ORG=
NEXT_PUBLIC_SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
```

---

## 3. Setup database

Schema ada di `src/lib/db/schema.ts` (users, languages, categories, challenges, questions, attempts, stats, dll.).

**Opsi A — Push schema langsung (cepat untuk dev):**

```bash
bun run db:push
```

**Opsi B — Jalankan migrasi (lebih aman untuk production):**

```bash
bun run db:migrate
```

File migrasi sudah ada di folder `drizzle/`.

**Buka Drizzle Studio (opsional):**

```bash
bun run db:studio
```

---

## 4. Seed data awal

Seed bahasa pemrograman dan kategori (wajib sebelum challenge bisa di-generate):

```bash
DATABASE_URL="postgresql://..." bun run scripts/seed-languages.ts
```

Atau jika `DATABASE_URL` sudah ada di `.env.local`:

```bash
bun run scripts/seed-languages.ts
```

Script ini mengisi:
- **Languages:** JavaScript, TypeScript, Python, Go, PHP
- **Categories:** Arrays, Strings, Trees, Graphs, dll.

> Challenge **tidak** di-seed manual — di-generate on-demand oleh AI lewat API.

---

## 5. Jalankan development server

```bash
bun run dev
```

Aplikasi berjalan di **http://localhost:3000**

---

## 6. Auth & akses halaman

### Registrasi / login

- **Sign up:** `/signup` → `POST /api/auth/register`
- **Sign in:** `/login` → `POST /api/auth/login`
- Password minimal 6 karakter
- Session disimpan di cookie HTTP-only `auth-token` (JWT via `jose`)

### Rute & proteksi (middleware)

```9:17:src/middleware.ts
const publicPaths = [
  '/auth',
  '/api/auth',
  '/login',
  '/signup',
  '/about',
  '/privacy-policy',
  '/terms-of-service'
];
```

| Area | Akses |
|------|-------|
| `/login`, `/signup`, `/about`, dll. | Publik |
| `/`, `/challenges`, `/leaderboard`, `/profile`, dll. | **Login wajib** |
| `/dashboard/*` | **Login + role `admin`** |

User baru terdaftar dengan `role: 'user'` (default di schema). Untuk akses admin dashboard, update manual di database:

```sql
UPDATE users SET role = 'admin' WHERE username = 'nama-anda';
```

---

## 7. Fitur utama setelah setup

1. **Daftar / login** di `/signup` atau `/login`
2. **Buka** `/challenges` — pilih bahasa & difficulty
3. Challenge di-generate via `GET /api/challenges?language=...&difficulty=...` (membutuhkan `ANTHROPIC_API_KEY`)
4. Submit jawaban → XP, streak, leaderboard diperbarui

---

## 8. Perintah development lainnya

```bash
bun run build          # Build production
bun run start          # Jalankan production build
bun run lint           # ESLint
bun run lint:fix       # ESLint + format
bun run format         # Prettier
bun run db:generate    # Generate migrasi baru setelah ubah schema
```

---

## 9. Deploy (Vercel)

1. Push ke GitHub & connect ke Vercel
2. Set environment variables di dashboard Vercel:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `ANTHROPIC_API_KEY`
   - Variabel Sentry (jika dipakai)
3. Jalankan migrasi ke database production (`bun run db:migrate`)
4. Seed languages di production (jalankan `seed-languages.ts` sekali)

---

## Troubleshooting umum

| Masalah | Solusi |
|---------|--------|
| Error koneksi database | Pastikan `DATABASE_URL` benar & project Neon aktif |
| Challenge gagal generate | Cek `ANTHROPIC_API_KEY` valid |
| Redirect ke `/login` terus | Cookie auth belum ada — login ulang |
| `/dashboard` redirect ke `/` | User bukan admin — update `role` di DB |
| Sentry error di dev | Set `NEXT_PUBLIC_SENTRY_DISABLED=true` |
| README menyebut Clerk | Abaikan — auth sudah custom JWT |

---

## Ringkasan alur setup

```
Install deps → .env.local → db:push/migrate → seed-languages → bun run dev → signup → (opsional) set admin → pakai app
```

Kalau Anda mau, saya bisa bantu langkah spesifik (misalnya setup Neon, seed production, atau membuat user admin) — atau switch ke **Agent mode** agar saya bisa menjalankan setup langsung di mesin Anda.

