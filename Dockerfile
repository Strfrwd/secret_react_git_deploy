FROM node:18-alpine
WORKDIR /secretword
COPY package*.json .
RUN npm install
#RUN npm i -g serve
COPY . . 
RUN npm run build
EXPOSE 3000
CMD ["npm" ,"run" ,"preview"]
#CMD ["npm" ,"run" ,"dev"]
#CMD ["serve", "-s", "dist"]