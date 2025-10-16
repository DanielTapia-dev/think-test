# Usar Nginx como servidor
FROM nginx:alpine

# Crear un HTML simple directamente
RUN echo "<!DOCTYPE html><html><head><title>Frontend React Placeholder</title></head><body><h1>✅ Frontend funcionando en puerto 3001</h1></body></html>" > /usr/share/nginx/html/index.html

# Exponer puerto 80 (interno)
EXPOSE 80

# Mantener Nginx corriendo
CMD ["nginx", "-g", "daemon off;"]
