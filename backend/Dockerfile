ARG expose_port PORT
ARG workdir=/app

# Stage 1: Build the React app

FROM node:18-alpine

LABEL version="1.0"
LABEL description="backend server"

WORKDIR ${workdir}

COPY package*.json ./
RUN npm install --production
RUN npm ci --omit=dev

COPY . .

EXPOSE $expose_port
CMD ["node", "server.js"]



# Stage 2: Serve the React app with Nginx
#FROM nginx:1.23.3-alpine

#COPY --from=node /app/build /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf

#EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]
