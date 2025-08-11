FROM node:22.18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]
