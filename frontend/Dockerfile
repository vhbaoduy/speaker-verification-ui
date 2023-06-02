FROM node:18
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
RUN npm run build
CMD ["npm",  "start"]