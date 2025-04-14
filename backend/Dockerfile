FROM node:alpine
WORKDIR /usr/app
COPY ./backend/package.json .
RUN npm install\ 
    && npm install typescript -g

COPY ./backend .
RUN tsc

EXPOSE 80


CMD ["npm", "run", "dev"]
