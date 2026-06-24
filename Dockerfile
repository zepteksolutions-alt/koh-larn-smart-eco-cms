# ---------- build stage ----------
FROM node:20-slim AS build
WORKDIR /app

# ติดตั้ง dependencies ทั้งหมด (รวม devDependencies เพื่อใช้ build)
COPY package*.json ./
RUN npm ci

# คอมไพล์ TypeScript -> dist/
COPY . .
RUN npm run build

# ---------- runtime stage ----------
FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

# ติดตั้งเฉพาะ production dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# คัดลอกเฉพาะผลลัพธ์ที่ต้องใช้ตอนรัน
COPY --from=build /app/dist ./dist
COPY views ./views
COPY public ./public

# Cloud Run จะส่งพอร์ตมาทาง env PORT (ค่าเริ่มต้น 8080)
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/main.js"]
