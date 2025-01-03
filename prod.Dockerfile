FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

ARG DB_HOST
ARG DB_USER
ARG DB_PASS

ENV DB_HOST=${DB_HOST}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}


COPY . .

EXPOSE 5000
CMD ["node", "app.js"]  # Cambia esto según tu punto de entrada
