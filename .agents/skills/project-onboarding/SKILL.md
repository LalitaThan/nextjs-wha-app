---
name: project-onboarding
description: Use when a new developer asks about setup project. how to get started,what tech stack is used. Triggers on "โปรเจกต์ตั้งค่าอย่างไร","โปรเจกต์นี้เริ่มต้นอย่างไร". or any orientation question from someone unfamiliar with the codebase.
compatibility: Use Node.js 22+
license: MIT
metadata: 
 author: Lalita
 version: "1.0"
---

## First-Time Setup

```bash
# 1. Install Deps
npm install

# 2.Copy env
cp .env.example .env

# 3. pull DB Schema (Prisma ORM)
npx prisma db pull

# 4. Generate Prisma Client
npx prisma generate

# 5. Check lint
npm run dev
```

## Gotchas
- ต้องติดตั้ง และเปิด Docker Desktop ไว้

## Output
- ถ้าถามการ Setup ให้ตอบเป็นในรูปแบบของตาราง และอ่านง่าย
