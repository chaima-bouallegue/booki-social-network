# Étape 1 : Build stage
FROM node:18.20.4 AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Générer les services à partir de l'OpenAPI
RUN npm run api-gen

# Construire l'application Angular en mode production
RUN npm run build -- --configuration production

# Étape 2 : Runtime stage avec Nginx
FROM nginx:alpine

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers compilés
COPY --from=build-stage /app/dist/book-network-ui /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]