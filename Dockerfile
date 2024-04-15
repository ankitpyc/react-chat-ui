FROM node:18-alpine
WORKDIR /rchatApp/
COPY public/ /rchatApp/public
COPY src/ /rchatApp/src
COPY package.json /rchatApp/
RUN npm install
CMD ["npm", "start"]