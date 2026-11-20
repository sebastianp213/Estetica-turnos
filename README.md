# Estética Turnos

**Sistema web de gestión de turnos para un centro de estética.**

🌐 **Aplicación publicada:** https://estetica-turnos-z6fw.onrender.com

💻 **Repositorio:** https://github.com/sebastianp213/Estetica-Turnos

## Descripción

Estética Turnos es una aplicación web que permite gestionar las reservas de un centro de estética. Los clientes pueden consultar los tratamientos disponibles, conocer a los profesionales y visualizar los horarios disponibles para reservar sus turnos.

El sistema cuenta con distintos perfiles de usuario y funcionalidades según el rol:

- **Cliente:** consulta tratamientos, reserva turnos y administra sus reservas.
- **Profesional:** consulta su agenda y gestiona el estado de sus turnos.
- **Administrador:** administra tratamientos, profesionales, horarios y reservas.

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
- Alta, modificación y desactivación de profesionales.
- Asignación de tratamientos a profesionales.
- Configuración de horarios de atención.
- Administración de reservas.
- Consulta y gestión de la información del sistema.

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
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       └── assets/
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
│   ├── prisma.config.ts
│   └── server.js
│
├── docs/
│   ├── base_de_datos.md
│   ├── plan_Estetica_Turnos.md
│   ├── propuesta_inicial.md
│   ├── spec.md
│   └── README_DEPLOY.md
│
├── README.md
└── .gitignore
```

---

## Requisitos para ejecutar localmente

Para ejecutar el proyecto en un entorno local se necesita:

- Node.js y npm.
- MariaDB.
- XAMPP o una instalación equivalente de MariaDB.
- Git.

Se recomienda utilizar versiones compatibles con las dependencias del proyecto.

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/sebastianp213/Estetica-Turnos.git
cd Estetica-Turnos
```

### 2. Configurar la base de datos

Iniciar MariaDB desde XAMPP y crear una base de datos:

```sql
CREATE DATABASE estetica_turnos;
```

### 3. Configurar el backend

Ingresar a la carpeta:

```bash
cd backend
npm install
```

Crear un archivo `.env` tomando como referencia `.env.example`.

Configurar las variables necesarias para la conexión a la base de datos y la autenticación.

Aplicar las migraciones:

```bash
npx prisma migrate dev
```

Iniciar el servidor:

```bash
node server.js
```

### 4. Configurar el frontend

Abrir otra terminal e ingresar a:

```bash
cd frontend
npm install
```

Crear el archivo `.env` tomando como referencia `.env.example`.

Iniciar el frontend:

```bash
npm run dev
```

Vite mostrará la dirección local para acceder a la aplicación, normalmente:

```text
http://localhost:5173
```

Para utilizar el sistema localmente deben permanecer ejecutándose MariaDB, el backend y el frontend.

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

## Seguridad

El backend incorpora:

- Autenticación mediante JWT.
- Contraseñas almacenadas mediante hash.
- Autorización basada en roles.
- Protección de encabezados HTTP mediante Helmet.
- Configuración CORS.
- Limitación de solicitudes mediante rate limiting.
- Validaciones de datos.
- Manejo controlado de errores.
- Restricciones de acceso a reservas según el usuario y su rol.

Los secretos y las configuraciones locales se gestionan mediante variables de entorno. Los archivos `.env` no deben subirse al repositorio.

---

## Documentación

La documentación complementaria del proyecto se encuentra en la carpeta `docs/`.

| Documento | Descripción |
|---|---|
| `README_DEPLOY.md` | Información del despliegue y acceso a la aplicación. |
| `MANUAL_USUARIO.md` | Instrucciones para utilizar el sistema como cliente. |
| `MANUAL_ADMINISTRACION.md` | Instrucciones para gestionar el sistema como administrador. |
| `MANUAL_TECNICO.md` | Arquitectura, tecnologías e instalación del proyecto. |
| `RELEVAMIENTO.md` | Relevamiento y requisitos del sistema. |
| `INFORME_DE_PRUEBAS.md` | Casos de prueba y resultados obtenidos. |
| `base_de_datos.md` | Modelo y estructura de la base de datos. |
| `spec.md` | Especificación funcional y reglas del sistema. |
| `propuesta_inicial.md` | Propuesta original del proyecto. |
| `plan_Estetica_Turnos.md` | Plan de desarrollo y etapas del proyecto. |

---

## Estado del proyecto

El sistema cuenta con sus funcionalidades principales implementadas y desplegadas en un entorno público.

Se realizaron pruebas funcionales de los procesos principales, incluyendo autenticación, gestión administrativa, asignación de tratamientos y reservas.

La documentación complementaria se encuentra en proceso de preparación para la entrega.

---

## Autor

Proyecto desarrollado como práctica de programación y desarrollo web.

**Repositorio:** https://github.com/sebastianp213/Estetica-Turnos

**Aplicación:** https://estetica-turnos-z6fw.onrender.com