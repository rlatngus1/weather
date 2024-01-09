FROM node:20
WORKDIR /weather
COPY ./ ./
RUN npm install
# CMD ["node", "./bin/www"]
CMD [ "npm", "start" ]