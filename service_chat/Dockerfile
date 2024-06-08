# Menggunakan image resmi Node.js sebagai base image
FROM node:20-alpine

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstal dependencies
RUN npm install

# Menyalin seluruh kode aplikasi ke direktori kerja
COPY . .

# Mengekspos port yang digunakan oleh aplikasi
EXPOSE 7001

# Menentukan perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
