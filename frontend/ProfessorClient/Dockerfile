FROM node:14
WORKDIR /app
RUN npm install -g expo-cli
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 19006
CMD ["expo", "start", "--web"]
