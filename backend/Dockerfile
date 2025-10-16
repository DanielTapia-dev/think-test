# Imagen base de Node
FROM node:18-alpine

# Carpeta de trabajo
WORKDIR /app

# Crear un simple servidor Express en línea
RUN npm init -y && npm install express

# Crear archivo index.js directamente
RUN echo "const express = require('express'); \
const app = express(); \
app.get('/', (req, res) => res.send('✅ Backend funcionando en puerto 3000')); \
app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));" > index.js

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar el servidor
CMD ["node", "index.js"]
