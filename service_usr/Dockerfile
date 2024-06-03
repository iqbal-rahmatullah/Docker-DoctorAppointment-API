# Menggunakan image resmi Node.js sebagai base image
FROM node:20-alpine

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstal dependencies
RUN npm install

# Menyalin direktori prisma secara khusus sebelum prisma generate
COPY prisma ./prisma

# Menjalankan npx prisma generate setelah dependencies terinstall dan prisma schema disalin
RUN npx prisma generate

# Menyalin seluruh kode aplikasi ke direktori kerja
COPY . .

# Mengekspos port yang digunakan oleh aplikasi
EXPOSE 4000

# Menentukan perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
