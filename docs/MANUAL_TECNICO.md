# Manual Técnico – Estética Turnos

## 1. Introducción

El presente documento describe los aspectos técnicos del sistema Estética Turnos. Está dirigido a desarrolladores y personas encargadas del mantenimiento de la aplicación.

Se detallan la arquitectura, las tecnologías utilizadas, la organización general del proyecto, el modelo de datos y los procedimientos básicos para ejecutar el sistema en un entorno local.

## 2. Descripción general

Estética Turnos es una aplicación web destinada a la gestión de turnos de un establecimiento de estética.

El sistema permite administrar tratamientos, profesionales, horarios de atención y reservas. Cuenta con diferentes roles de usuario que determinan las operaciones disponibles:

- **CLIENTE:** consulta los tratamientos y profesionales disponibles, solicita turnos y administra sus propias reservas.
- **PROFESIONAL:** consulta las reservas correspondientes a su actividad y puede gestionar su finalización.
- **ADMIN:** administra los tratamientos, profesionales, horarios y reservas.

## 3. Arquitectura del sistema

La aplicación utiliza una arquitectura cliente-servidor, separando el frontend del backend.

### 3.1. Frontend

Es la parte visual con la que interactúa el usuario.

Se encarga de:

- Mostrar las pantallas y formularios.
- Gestionar la navegación.
- Validar datos ingresados desde la interfaz.
- Enviar solicitudes al backend.
- Mostrar los resultados y mensajes correspondientes.

Tecnologías utilizadas:

- React.
- JavaScript.
- Vite.
- React Router.
- CSS.

### 3.2. Backend

Es el encargado de procesar las solicitudes, aplicar las reglas de negocio y comunicarse con la base de datos.

Entre sus responsabilidades se encuentran:

- Gestionar el registro y el inicio de sesión.
- Validar permisos según el rol del usuario.
- Administrar tratamientos y profesionales.
- Gestionar horarios de atención.
- Crear, consultar y cancelar reservas.
- Controlar la disponibilidad de los turnos.

Tecnologías utilizadas:

- Node.js.
- Express.
- Prisma ORM.
- JSON Web Token (JWT).
- bcryptjs.
- Helmet.
- CORS.
- express-rate-limit.

### 3.3. Base de datos

El sistema utiliza MariaDB para almacenar la información.

La comunicación entre el backend y la base de datos se realiza mediante Prisma ORM, que permite consultar y modificar los registros utilizando modelos definidos en el esquema.

## 4. Tecnologías utilizadas

| Tecnología | Función |
|---|---|
| React | Desarrollo de la interfaz de usuario. |
| Vite | Herramienta de desarrollo y compilación del frontend. |
| JavaScript | Lenguaje utilizado en frontend y backend. |
| React Router | Navegación entre las distintas vistas. |
| Node.js | Entorno de ejecución del backend. |
| Express | Desarrollo de la API. |
| Prisma ORM | Acceso y gestión de datos. |
| MariaDB | Sistema de gestión de base de datos. |
| JWT | Autenticación mediante tokens. |
| bcryptjs | Encriptación mediante hash de contraseñas. |
| Git y GitHub | Control de versiones y almacenamiento del código fuente. |
| Render | Plataforma utilizada para el despliegue. |

## 5. Modelo de datos

La base de datos está organizada mediante entidades relacionadas entre sí.

### 5.1. Usuario

Almacena la información de las cuentas registradas.

Campos principales:

- id.
- nombre.
- email.
- passwordHash.
- rol.
- activo.
- createdAt.

El campo `rol` permite diferenciar clientes, profesionales y administradores.

### 5.2. Profesional

Contiene la información específica de los profesionales.

Se relaciona con un usuario y permite registrar su descripción, estado, tratamientos asociados, horarios y reservas.

### 5.3. Tratamiento

Almacena los servicios ofrecidos por el establecimiento.

Campos principales:

- id.
- nombre.
- descripción.
- duración en minutos.
- precio.
- estado de actividad.

### 5.4. ProfesionalTratamiento

Representa la relación entre profesionales y tratamientos.

Permite establecer qué servicios puede realizar cada profesional.

La relación utiliza una clave primaria compuesta por `profesionalId` y `tratamientoId`.

### 5.5. HorarioAtencion

Almacena los horarios de trabajo de cada profesional.

Contiene:

- profesionalId.
- día de la semana.
- hora de inicio.
- hora de finalización.

Se establece una restricción para evitar más de un bloque de atención por profesional y día.

### 5.6. Reserva

Registra los turnos solicitados por los clientes.

Campos principales:

- id.
- clienteId.
- profesionalId.
- tratamientoId.
- inicio.
- fin.
- precioAplicado.
- estado.
- createdAt.

La reserva mantiene relaciones con el cliente, el profesional y el tratamiento correspondiente.

El campo `precioAplicado` permite conservar el precio registrado al momento de realizar la reserva.

## 6. Relaciones principales

Las relaciones entre las entidades son las siguientes:

- Un usuario puede tener un perfil profesional.
- Un profesional puede estar asociado a varios tratamientos.
- Un tratamiento puede ser realizado por varios profesionales.
- Un profesional puede tener varios horarios de atención.
- Un cliente puede realizar varias reservas.
- Un profesional puede tener varias reservas.
- Un tratamiento puede estar asociado a varias reservas.

La relación entre profesionales y tratamientos es de muchos a muchos y se implementa mediante la entidad intermedia `ProfesionalTratamiento`.

## 7. Seguridad y autenticación

El sistema incorpora mecanismos para proteger el acceso y la información.

### 7.1. Contraseñas

Las contraseñas no se almacenan directamente en texto plano. Se utiliza bcryptjs para generar un hash que se guarda en la base de datos.

### 7.2. Autenticación

El inicio de sesión valida las credenciales del usuario y permite generar un token JWT.

Este token se utiliza para identificar al usuario en las solicitudes que requieren autenticación.

### 7.3. Autorización

Las operaciones se restringen según el rol del usuario.

De esta manera, un cliente no puede acceder a las funciones administrativas ni consultar las reservas de otros clientes.

### 7.4. Protección adicional

Se utilizan herramientas como Helmet, CORS y express-rate-limit para incorporar medidas adicionales de protección en el backend.

## 8. Reglas de negocio principales

El funcionamiento del sistema contempla las siguientes reglas:

- Solo se pueden reservar tratamientos activos.
- El profesional seleccionado debe estar asociado al tratamiento solicitado.
- Las reservas deben realizarse para fechas futuras.
- Se permite reservar dentro de los próximos 30 días.
- No se permiten reservas que se superpongan con otras existentes.
- La duración del turno se determina según el tratamiento.
- La disponibilidad se vuelve a comprobar al confirmar una reserva.
- Los clientes pueden cancelar sus turnos con al menos 24 horas de anticipación.
- Los administradores pueden cancelar reservas sin esa restricción.
- Las reservas completadas y canceladas se conservan como historial.

## 9. Instalación y ejecución local

Para ejecutar el proyecto en un entorno de desarrollo se necesita:

- Node.js y npm.
- MariaDB.
- Git.
- Un editor de código, como Visual Studio Code.

### 9.1. Obtener el proyecto

Clonar el repositorio:

```bash
git clone https://github.com/sebastianp213/Estetica-Turnos.git
```

Ingresar a la carpeta:

```bash
cd Estetica-Turnos
```

### 9.2. Configurar el backend

Ingresar a la carpeta del backend:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

Configurar las variables de entorno necesarias en el archivo `.env`, tomando como referencia el archivo de ejemplo del proyecto.

Entre las configuraciones necesarias se encuentran la conexión a la base de datos y la clave secreta utilizada para JWT.

No se deben publicar credenciales ni claves privadas en el repositorio.

### 9.3. Preparar la base de datos

Crear o configurar una base de datos compatible con MariaDB y verificar que la URL de conexión esté correctamente configurada.

Aplicar las migraciones correspondientes utilizando las instrucciones de Prisma definidas por el proyecto.

### 9.4. Ejecutar el backend

Desde la carpeta `backend`, ejecutar:

```bash
node server.js
```

El servidor queda disponible en el puerto configurado para la aplicación.

### 9.5. Configurar y ejecutar el frontend

Abrir otra terminal e ingresar a la carpeta del frontend:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

Configurar las variables de entorno necesarias según la configuración del proyecto.

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará la dirección local desde la cual se puede acceder a la aplicación.

## 10. Despliegue

El sistema se encuentra desplegado utilizando Render.

La arquitectura de producción separa los servicios:

- Frontend: aplicación React compilada y publicada en Render.
- Backend: servidor Node.js y Express publicado en Render.
- Base de datos: servicio MariaDB externo.

Direcciones de producción:

**Aplicación web:**

https://estetica-turnos-z6fw.onrender.com

**API:**

https://estetica-turnos-api.onrender.com

Para conocer los detalles de configuración y publicación, consultar el documento `README_DEPLOY.md`.

## 11. Mantenimiento

Para mantener el correcto funcionamiento del sistema se recomienda:

- Mantener actualizadas las dependencias.
- No compartir las variables de entorno.
- Realizar copias de seguridad de la base de datos.
- Revisar los registros del servidor ante errores.
- Verificar las migraciones antes de modificar el modelo de datos.
- Probar los cambios en un entorno de desarrollo antes de publicarlos.

## 12. Repositorio

El código fuente del proyecto se encuentra disponible en GitHub:

https://github.com/sebastianp213/Estetica-Turnos.git
