# Next.js Vestir Charro Shop

Para correr localmente se necesita la base de datos

```
docker-compose up -d
```

\*El -d significa **detached**

## Configurar las variables de entorno

Renombrar el archivo **.env.template**a**.env**
\*MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/charroshopdb
```

\*Reconstruir los modulos de node y levantar Next

```
npm i
npm run dev
```

## Llenar la base de datos con la informacion de pruebas

Lamarla

```
http://localhost:3000/api/seed
```

<!-- MONGO_URL=mongodb://localhost:27017/charroshopdb -->
