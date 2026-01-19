# Build stage
FROM node:20 AS build
WORKDIR /dboatapp
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration development

# Serve stage
FROM nginx:alpine
COPY --from=build /dboatapp/dist/dboat/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]