# Despliegue de Estética Turnos

## 1. Información general

Estética Turnos es una aplicación web de gestión de turnos para un centro de estética.

El proyecto se encuentra desplegado en un entorno público, con el frontend y el backend publicados como servicios independientes.

## 2. Enlaces de acceso

| Servicio | URL |
|---|---|
| Aplicación web (Frontend) | https://estetica-turnos-z6fw.onrender.com |
| API (Backend) | https://estetica-turnos-api.onrender.com |
| Repositorio de GitHub | https://github.com/sebastianp213/Estetica-Turnos |

**Para utilizar el sistema se debe ingresar desde el enlace del frontend.** El backend proporciona los servicios y las operaciones que utiliza la aplicación.

## 3. Arquitectura del despliegue

El despliegue está compuesto por tres elementos principales:

### Frontend

- Desarrollado con React y Vite.
- Proporciona la interfaz gráfica del sistema.
- Permite a los clientes, profesionales y administradores interactuar con la aplicación.
- Se encuentra publicado en Render.

### Backend

- Desarrollado con Node.js y Express.
- Gestiona las solicitudes del frontend.
- Procesa la autenticación, las autorizaciones, las reservas y las operaciones administrativas.
- Se comunica con la base de datos.
- Se encuentra publicado en Render.

### Base de datos

- Utiliza MariaDB.
- Se administra mediante Prisma ORM.
- Almacena usuarios, profesionales, tratamientos, horarios y reservas.
- Se encuentra alojada en un servicio externo al frontend y al backend.

## 4. Funcionamiento de la aplicación

El funcionamiento general del sistema sigue este flujo:

1. El usuario ingresa a la aplicación desde el navegador.
2. El frontend presenta las opciones correspondientes al usuario.
3. Cuando se realiza una operación, el frontend envía una solicitud a la API.
4. El backend recibe y procesa la solicitud.
5. Cuando corresponde, el backend consulta o modifica la información almacenada en MariaDB.
6. El resultado se devuelve al frontend para actualizar la interfaz.

## 5. Configuración de producción

Los servicios utilizan variables de entorno para configurar sus conexiones y parámetros de funcionamiento.

### Backend

Entre las variables utilizadas por el backend se encuentran:

| Variable | Descripción |
|---|---|
| `PORT` | Puerto de ejecución del servidor. |
| `DATABASE_URL` | Dirección de conexión a MariaDB. |
| `JWT_SECRET` | Secreto utilizado para firmar los tokens de autenticación. |
| `JWT_EXPIRES_IN` | Tiempo de expiración de los tokens. |

### Frontend

La variable `VITE_API_URL` permite configurar la dirección de la API utilizada por el frontend.

Los valores de producción se configuran en el entorno de despliegue y no deben contenerse como credenciales privadas dentro del repositorio.

## 6. Publicación y actualización

El código fuente se encuentra alojado en GitHub.

Repositorio:

https://github.com/sebastianp213/Estetica-Turnos

Cuando se realizan cambios en el proyecto y se suben a la rama configurada para el despliegue, Render puede ejecutar el proceso de publicación automáticamente, de acuerdo con la configuración de cada servicio.

El proceso general consiste en:

1. Realizar los cambios en el código.
2. Verificar que el proyecto funcione correctamente.
3. Registrar los cambios mediante un commit.
4. Enviar los cambios al repositorio remoto.
5. Comprobar el resultado del despliegue.
6. Verificar que la aplicación continúe funcionando correctamente.

## 7. Verificación del despliegue

Luego de publicar una actualización, se recomienda comprobar:

- Que el frontend cargue correctamente.
- Que el backend responda a las solicitudes.
- Que exista conexión con la base de datos.
- Que el inicio de sesión funcione.
- Que se puedan consultar los tratamientos y profesionales.
- Que se puedan consultar los horarios disponibles.
- Que se puedan crear y consultar reservas.
- Que los paneles de administración y profesionales funcionen correctamente.

## 8. Seguridad

Para mantener la seguridad del sistema:

- No publicar archivos `.env`.
- No incluir contraseñas ni credenciales reales en GitHub.
- Utilizar secretos seguros para JWT.
- Mantener protegidas las credenciales de la base de datos.
- Configurar correctamente los permisos y el acceso según los roles de usuario.

## 9. Acceso final

La aplicación se encuentra disponible en:

**https://estetica-turnos-z6fw.onrender.com**

El repositorio del proyecto se encuentra en:

https://github.com/sebastianp213/Estetica-Turnos