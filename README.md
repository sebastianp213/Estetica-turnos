# Estética Turnos

Sistema web de gestión de turnos para un centro de estética.

## Descripción

Estética Turnos es una aplicación web que permite administrar las reservas de un centro de estética. Los clientes pueden consultar los tratamientos disponibles, conocer a los profesionales y visualizar los horarios disponibles para reservar sus turnos.

El sistema cuenta con distintos perfiles de usuario y funcionalidades según el rol:

- **Cliente:** consulta servicios, reserva turnos y administra sus reservas.
- **Profesional:** consulta su agenda y gestiona el estado de sus turnos.
- **Administrador:** administra tratamientos, profesionales, horarios, usuarios y reservas.

El sistema está diseñado para una única sucursal.

---

## Funcionalidades

### Clientes

- Registro e inicio de sesión.
- Consulta de tratamientos disponibles.
- Consulta de profesionales.
- Visualización de horarios disponibles.
- Reserva de turnos.
- Consulta de próximas reservas e historial.
- Cancelación de reservas respetando las condiciones establecidas.

### Profesionales

- Inicio de sesión.
- Consulta de agenda personal.
- Visualización de turnos asignados.
- Finalización de turnos realizados.

### Administradores

- Gestión de tratamientos y precios.
- Gestión de profesionales.
- Configuración de horarios de atención.
- Administración de reservas.
- Gestión de usuarios.

---

## Tecnologías utilizadas

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS

### Backend

- Node.js
- Express
- JWT
- bcryptjs
- Helmet
- CORS
- express-rate-limit

### Base de datos

- MariaDB
- Prisma ORM
- Prisma Client
- Adaptador Prisma para MariaDB

### Herramientas

- Git
- GitHub
- Visual Studio Code
- XAMPP

---

## Estructura del proyecto

```text
estetica-turnos/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── assets/
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── .env.example
│   ├── prisma.config.ts
│   ├── server.js
│   └── package.json
│
├── docs/
│   ├── base_de_datos.md
│   ├── plan_Estetica_Turnos.md
│   ├── propuesta_inicial.md
│   └── spec.md
│
├── AGENTS.md
├── README.md
└── .gitignore
```

---

## Requisitos previos

Para ejecutar el proyecto localmente se necesita:

- Node.js y npm.
- MariaDB.
- XAMPP, o una instalación equivalente de MariaDB.
- Git.

Se recomienda utilizar una versión de Node.js compatible con las versiones de React, Vite y Prisma utilizadas en el proyecto.

---

# Instalación y configuración

## 1. Clonar el repositorio

```bash
git clone https://github.com/sebastianp213/Estetica-Turnos.git
```

Ingresar al directorio:

```bash
cd Estetica-Turnos
```

---

## 2. Configurar la base de datos

Iniciar MariaDB desde XAMPP.

Crear una base de datos con el nombre:

```sql
CREATE DATABASE estetica_turnos;
```

La base de datos puede crearse desde phpMyAdmin o mediante una consola SQL.

---

## 3. Configurar el backend

Ingresar a la carpeta:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` dentro de `backend/`, tomando como referencia `.env.example`.

Configuración de ejemplo:

```env
PORT=3000

JWT_SECRET=REEMPLAZAR_POR_UN_SECRET_SEGURO
JWT_EXPIRES_IN=2h

DATABASE_URL=mysql://root@localhost:3306/estetica_turnos
```

### Variables de entorno

| Variable | Descripción |
|---|---|
| `PORT` | Puerto utilizado por el servidor backend. |
| `JWT_SECRET` | Clave secreta utilizada para firmar los tokens JWT. |
| `JWT_EXPIRES_IN` | Tiempo de expiración de los tokens. |
| `DATABASE_URL` | URL de conexión a MariaDB. |

> Los valores de ejemplo deben adaptarse al entorno local. No se deben publicar credenciales reales ni secretos.

### Aplicar migraciones

Desde la carpeta `backend/`:

```bash
npx prisma migrate dev
```

Este comando aplica las migraciones de Prisma en la base de datos de desarrollo.

Para comprobar el esquema:

```bash
npx prisma validate
```

### Iniciar el backend

```bash
node server.js
```

El servidor estará disponible en:

```text
http://localhost:3000
```

La ruta raíz permite comprobar que la API está funcionando.

---

## 4. Configurar el frontend

Abrir una segunda terminal e ingresar a:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

Crear el archivo `.env` a partir de `.env.example`.

Configuración de ejemplo:

```env
VITE_API_URL=/api
```

### Iniciar el frontend

```bash
npm run dev
```

Vite mostrará la dirección local donde estará disponible la aplicación. Por defecto:

```text
http://localhost:5173
```

---

# Ejecución del sistema

Para utilizar la aplicación localmente, se deben mantener ejecutándose:

1. MariaDB.
2. Backend Express.
3. Frontend React/Vite.

El frontend se comunica con el backend a través de la API.

---

## Seguridad

El backend incorpora distintas medidas de seguridad:

- Autenticación mediante JWT.
- Contraseñas almacenadas mediante hash.
- Autorización basada en roles.
- Protección de encabezados HTTP mediante Helmet.
- Configuración CORS.
- Limitación de solicitudes mediante rate limiting.
- Límite de tamaño para solicitudes JSON.
- Manejo controlado de errores.
- Validaciones de datos.
- Restricciones de acceso a reservas según el usuario y su rol.

Los secretos y las configuraciones locales se gestionan mediante variables de entorno.

Los archivos `.env` no deben subirse al repositorio.

---

## Reglas principales del sistema

- El sistema contempla una única sucursal.
- Los clientes pueden reservar turnos con profesionales que realizan el tratamiento seleccionado.
- La disponibilidad se calcula teniendo en cuenta los horarios configurados, la duración del tratamiento y las reservas existentes.
- Se evita la superposición de reservas.
- Los clientes pueden cancelar sus turnos respetando el límite establecido de 24 horas.
- Los administradores pueden cancelar reservas sin ese límite.
- Los profesionales pueden completar los turnos que tienen asignados.
- Los turnos completados o cancelados conservan su historial.
- La duración del tratamiento determina el tiempo ocupado por la reserva.
- Las reservas se realizan dentro del período de anticipación habilitado por el sistema.

---

## Validaciones y pruebas

Durante el desarrollo se realizaron pruebas funcionales y validaciones técnicas.

### Validaciones técnicas

- Validación del esquema de Prisma.
- Comprobación de sintaxis del backend.
- Compilación del frontend.
- Ejecución de ESLint.
- Verificación de la conexión entre frontend y backend.
- Comprobación de conexión a la base de datos.

### Pruebas funcionales

- Registro e inicio de sesión.
- Consulta de tratamientos.
- Consulta de profesionales.
- Consulta de disponibilidad.
- Creación de reservas.
- Consulta de reservas personales.
- Cancelación de reservas.
- Funcionamiento de paneles de profesionales y administradores.
- Validación de permisos y acceso a rutas.
- Comportamiento ante rutas inexistentes.

Las pruebas realizadas hasta el momento son principalmente manuales y de validación técnica. El proyecto todavía no cuenta con una suite automatizada completa de pruebas.

---

## Documentación

La documentación adicional se encuentra en `docs/`.

| Documento | Contenido |
|---|---|
| `spec.md` | Especificación funcional y reglas del sistema. |
| `base_de_datos.md` | Modelo y estructura de la base de datos. |
| `propuesta_inicial.md` | Propuesta original del proyecto. |
| `plan_Estetica_Turnos.md` | Plan de desarrollo, tareas y etapas. |

---

## Estado del proyecto

El sistema cuenta con las funcionalidades principales implementadas y verificadas en entorno local.

Actualmente se encuentra en etapa de revisión final, documentación y preparación para su publicación.

### Pendientes

- Completar la revisión final de documentación.
- Ampliar las pruebas automatizadas.
- Revisar configuración de producción.
- Rotar los secretos utilizados durante el desarrollo.
- Publicar la base de datos.
- Desplegar backend y frontend.
- Verificar el funcionamiento de la aplicación en un entorno público.

---

## Autor

Proyecto desarrollado como práctica de programación y desarrollo web.

**Repositorio:**  
https://github.com/sebastianp213/Estetica-Turnos
