# Prueba Técnica - Node.js y MongoDB

API REST construida con **Express** y **MongoDB (Mongoose)** para gestionar usuarios, cumpliendo con los requerimientos de la prueba técnica de desarrollador junior.

## Tecnologías

- Node.js
- Express
- MongoDB + Mongoose
- dotenv (variables de entorno)

## Estructura del proyecto

```
prueba-backend/
├── src/
│   ├── config/
│   │   └── db.js               # Conexión a MongoDB
|   |   └── swagger.js          #configuración documentación
│   ├── controllers/
│   │   └── usuarioController.js # Lógica de negocio y validaciones
│   ├── middlewares/
│   │   └── errorHandler.js      # Manejo de errores y rutas 404
│   ├── models/
│   │   └── Usuario.js           # Esquema de Usuario (Mongoose)
│   ├── routes/
│   │   └── usuarioRoutes.js     # Definición de rutas /usuarios
│   └── server.js                # Punto de entrada de la app
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- MongoDB corriendo localmente (o una URI de MongoDB Atlas)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd prueba-backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz (puedes copiar `.env.example`):

   ```bash
   cp .env.example .env
   ```

   Contenido de `.env`:

   ```
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/prueba_backend
   ```

   > Si usas MongoDB Atlas, reemplaza `MONGO_URI` por tu cadena de conexión (asegúrate de que apunte a la base de datos `prueba_backend`).

## Ejecución

- Modo desarrollo (con recarga automática usando nodemon):

  ```bash
  npm run dev
  ```

- Modo producción:

  ```bash
  npm start
  ```

El servidor quedará escuchando en `http://localhost:3000/`.

## Modelo de Usuario

```js
{
  nombre: String,          // requerido
  email: String,           // requerido, único
  edad: Number,             // opcional
  fecha_creacion: Date,     // por defecto: fecha actual
  direcciones: [
    {
      calle: String,
      ciudad: String,
      pais: String,
      codigo_postal: String
    }
  ]
}
```

## Endpoints en local 

| Método | Ruta                        | Descripción                                        |
|--------|-----------------------------|-----------------------------------------------------|
| POST   | `api/usuarios`                 | Crea un nuevo usuario                                |
| GET    | `api/usuarios`                 | Lista usuarios (soporta paginación)                  |
| GET    | `api/usuarios/buscar?ciudad=X` | Busca usuarios con una dirección en la ciudad `X`    |
| GET    | `api/usuarios/:id`             | Obtiene un usuario por su ID                         |
| PUT    | `api/usuarios/:id`             | Actualiza un usuario por su ID                       |
| DELETE | `api/usuarios/:id`             | Elimina un usuario por su ID                         |


## Endpoints en render (SIMULACIÓN DE PRODUCIÓN)

| Método | Ruta                                                                                  | Descripción                                          |
|--------|---------------------------------------------------------------------------------------|------------------------------------------------------|
| POST   | `http://localhost:3000/api/usuarios`                                                  | Crea un nuevo usuario                                |
| GET    | `https://prueba-backend-4js1.onrender.com/api/usuarios?pagina=1&limite=10`           | Lista usuarios (soporta paginación)                  |
| GET    | `https://prueba-backend-4js1.onrender.com/api/usuarios/buscar?ciudad=X`               | Busca usuarios con una dirección en la ciudad `X`    |
| GET    | `https://prueba-backend-4js1.onrender.com/api/usuarios/ID`                            | Obtiene un usuario por su ID                         |
| PUT    | `https://prueba-backend-4js1.onrender.com/api/usuarios/ID`                            | Actualiza un usuario por su ID                       |
| DELETE | `https://prueba-backend-4js1.onrender.com/api/usuarios/ID`                            | Elimina un usuario por su ID                         |

### Ejemplos de uso

#### Crear usuario

```bash
curl -X POST http://localhost:3000/api/usuarios/ \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "edad": 28,
    "direcciones": [
      {
        "calle": "Av. Principal",
        "ciudad": "Lima",
        "pais": "Perú",
        "codigo_postal": "15001"
      }
    ]
  }'
```

#### Listar usuarios (con paginación)

```bash
curl "http://localhost:3000/api/usuarios?pagina=1&limite=10"
```

Respuesta:

```json
{
  "total": 1,
  "pagina": 1,
  "limite": 10,
  "totalPaginas": 1,
  "usuarios": [ ... ]
}
```

#### Obtener usuario por ID

```bash
curl http://localhost:3000/api/usuarios/<ID>
```

#### Actualizar usuario

```bash
curl -X PUT http://localhost:3000/api/usuarios/<ID> \
  -H "Content-Type: application/json" \
  -d '{ "edad": 29 }'
```

#### Eliminar usuario

```bash
curl -X DELETE http://localhost:3000/api/usuarios/<ID>
```

#### Buscar usuarios por ciudad

```bash
curl "http://localhost:3000/api/usuarios/buscar?ciudad=Lima"
```

## Validaciones y manejo de errores

- No se permiten emails duplicados (error `409 Conflict`).
- Si faltan `nombre` o `email` al crear un usuario, se devuelve `400 Bad Request`.
- Se valida que `direcciones` sea un array de objetos con `calle`, `ciudad` y `pais` como strings; de lo contrario se devuelve `400 Bad Request`.
- IDs inválidos (formato incorrecto de ObjectId) devuelven `400 Bad Request`.
- Usuario no encontrado devuelve `404 Not Found`.
- Rutas no definidas devuelven `404 Not Found` con un mensaje descriptivo.

## Extras implementados

- Paginación en `GET /usuarios` mediante los query params `pagina` y `limite`.
- Uso de `dotenv` para variables de entorno (`PORT`, `MONGO_URI`).
- Índices en MongoDB para `email` (único) y `direcciones.ciudad` (búsquedas más rápidas).
