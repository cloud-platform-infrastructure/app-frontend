# Stage 1: build do frontend (Vite)
FROM node:22-alpine AS build

WORKDIR /app

# Instala apenas as dependências primeiro (cache melhor)
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Aceita a URL da API como argumento de build (para produção)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Gera o build estático de produção (saída em /app/dist)
RUN npm run build

# Stage 2: imagem final, apenas com Nginx servindo arquivos estáticos
FROM nginx:1.27-alpine

# Remove configuração default e copia os arquivos gerados pelo Vite
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Porta padrão HTTP dentro do container
EXPOSE 80

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]
