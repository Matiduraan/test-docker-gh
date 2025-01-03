FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

ENV MYSQLDB_USER=root
ENV MYSQLDB_ROOT_PASSWORD=demo_pass
ENV MYSQLDB_DATABASE=demo_db
ENV DB_USER=root
ENV DB_PASSWORD=demo_pass
ENV DB_NAME=demo_db

COPY . .

EXPOSE 5000
CMD ["node", "app.js"]  # Cambia esto según tu punto de entrada
