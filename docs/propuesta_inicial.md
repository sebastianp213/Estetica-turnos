# TP Final -- Sistema de turnos para un centro de estética

## 1. Descripción del proyecto

El proyecto consiste en desarrollar una aplicación web para gestionar los turnos de un centro de estética ficticio. El sistema permitirá que los clientes consulten los tratamientos disponibles, conozcan a los profesionales y reserven turnos según la disponibilidad.

Además, contará con un sector de administración para gestionar los tratamientos, los profesionales, los horarios de atención y las reservas.

El objetivo es construir una aplicación completa, con frontend, backend y base de datos, que pueda utilizarse y probarse desde internet.

## 2. Objetivo general

Desarrollar un sistema web que permita organizar y administrar las reservas de un centro de estética, evitando superposiciones de horarios y facilitando la gestión de los turnos de clientes y profesionales.

## 3. Tipos de usuarios

### Clientes

- Registrarse e iniciar sesión.
- Consultar los tratamientos disponibles.
- Consultar los profesionales que realizan cada tratamiento.
- Ver los horarios disponibles.
- Reservar un turno.
- Consultar sus próximas reservas y su historial.
- Cancelar un turno respetando las condiciones establecidas.

### Profesionales

- Iniciar sesión.
- Consultar su agenda de turnos.
- Ver los detalles de los turnos asignados.
- Marcar un turno como completado.
- Consultar el estado de los turnos asignados.

### Administradores

- Gestionar los tratamientos y sus precios.
- Registrar, modificar y desactivar profesionales.
- Configurar los horarios y días de atención.
- Consultar todas las reservas.
- Modificar o cancelar turnos según los permisos establecidos.
- Consultar y administrar las cuentas de los clientes.

## 4. Funcionalidades principales

1. **Registro e inicio de sesión:** permitirá identificar a clientes, profesionales y administradores.
2. **Catálogo de tratamientos:** mostrará los servicios disponibles, su descripción, duración y precio.
3. **Gestión de profesionales:** permitirá consultar qué profesionales realizan cada tratamiento.
4. **Disponibilidad:** mostrará los horarios que se pueden reservar según la agenda del profesional.
5. **Reserva de turnos:** permitirá seleccionar tratamiento, profesional, fecha y horario.
6. **Gestión de reservas:** permitirá consultar y cancelar turnos, además de actualizar su estado de acuerdo con los permisos.
7. **Panel de administración:** reunirá las herramientas para gestionar tratamientos, profesionales, horarios y reservas.

## 5. Reglas de negocio iniciales

Estas reglas son una primera propuesta. Antes de implementar el sistema se van a revisar, precisar y numerar en el documento de especificación (`docs/spec.md`).

1. Para reservar un turno, el cliente debe tener una cuenta e iniciar sesión.
2. No se pueden reservar turnos para fechas u horarios pasados.
3. Un profesional no puede tener dos turnos superpuestos.
4. La duración de cada reserva depende de la duración del tratamiento seleccionado.
5. Un cliente no puede cancelar un turno con menos de 24 horas de anticipación.
6. Solamente un administrador puede crear, modificar o desactivar tratamientos.
7. Cada profesional tiene días y horarios de atención definidos.
8. Cada turno debe tener uno de estos estados: confirmado, completado o cancelado.
9. Un profesional solamente puede recibir reservas para tratamientos que esté habilitado para realizar.
10. El sistema debe comprobar nuevamente la disponibilidad al confirmar una reserva, para evitar que dos clientes ocupen el mismo horario.

## 6. Tecnologías propuestas

| Componente | Tecnología |
|---|---|
| Frontend | React |
| Backend | Node.js + Express |
| Base de datos | MariaDB |
| ORM | Prisma |
| Autenticación | JWT |
| Publicación del frontend | Netlify |
| Publicación del backend | Render |
| Publicación de la base de datos | Servicio compatible con MariaDB |
| Control de versiones | Git y GitHub |

Se podrán ajustar estas tecnologías si durante el diseño aparece una razón concreta para hacerlo.

## 7. Arquitectura general

La aplicación estará dividida en tres partes:

- **Frontend:** interfaz con la que interactúan clientes, profesionales y administradores. Se comunicará con el backend mediante solicitudes HTTP.
- **Backend:** recibirá las solicitudes, validará los datos y aplicará las reglas de negocio. También controlará los permisos de cada tipo de usuario.
- **Base de datos:** almacenará usuarios, tratamientos, profesionales, horarios y reservas.

El frontend no accederá directamente a la base de datos. Toda operación con información persistente se realizará a través del backend.

## 8. Publicación y entrega

El proyecto se mantendrá en un repositorio público de GitHub. La aplicación deberá quedar publicada para que se pueda probar desde internet, sin necesidad de descargar el código ni ejecutar los servicios localmente.

La entrega incluirá:

- Código fuente del frontend y del backend.
- Configuración y migraciones de la base de datos.
- Documento de especificación con las reglas de negocio numeradas.
- `AGENTS.md` y las reglas para los agentes.
- Documento del plan y tareas del proyecto.
- Informe de pruebas.
- README con instrucciones e información del proyecto.
- Enlaces públicos para acceder a la aplicación.

Los secretos y credenciales se guardarán en variables de entorno y no se subirán al repositorio. Se incluirá un archivo `.env.example` con los nombres de las variables necesarias, sin valores privados.

## 9. Organización del desarrollo

El trabajo se realizará por etapas:

1. Definir y revisar el alcance del proyecto.
2. Redactar la especificación (`docs/spec.md`) con las reglas numeradas.
3. Preparar `AGENTS.md` y las reglas para los agentes.
4. Diseñar la arquitectura, las entidades y la base de datos.
5. Elaborar el plan y dividirlo en tareas.
6. Implementar el backend y sus pruebas.
7. Implementar el frontend y conectarlo con el backend.
8. Ejecutar las pruebas de integración y corregir errores.
9. Publicar frontend, backend y base de datos.
10. Completar el README y el informe de pruebas, y verificar la entrega.

Se trabajará con Git, realizando un commit por cada tarea completada.

---

**Estado del documento:** propuesta inicial del proyecto. Las reglas y funcionalidades se detallan en el documento de especificación `docs/spec.md`.