# ใช้ Node.js version 20
FROM node:20.14.0

# สร้าง working directory ใน container
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอก source code ทั้งหมดเข้า container
COPY . .

# ระบุพอร์ตที่ container จะ expose
EXPOSE 3000

# คำสั่งรันแอป
CMD ["npm", "start"]
