# Relevamiento – Estética Turnos

## 1. Introducción

El presente documento tiene como finalidad describir el relevamiento realizado para el desarrollo de Estética Turnos, una aplicación web destinada a la administración de turnos de un centro de estética.

El relevamiento permitió identificar las necesidades principales del establecimiento, los tipos de usuarios que interactúan con el sistema, las funcionalidades requeridas y las condiciones que debía cumplir la solución.

El proyecto se desarrolla tomando como referencia un centro de estética ficticio, por lo que el análisis se realiza sobre un escenario propuesto y no sobre una organización real.

## 2. Descripción de la situación

Se plantea un centro de estética que ofrece distintos tratamientos a sus clientes y cuenta inicialmente con dos profesionales encargados de realizar los servicios.

La organización de los turnos requiere administrar información relacionada con:

- Los tratamientos ofrecidos.
- Los precios y la duración de cada tratamiento.
- Los profesionales disponibles.
- Los servicios que puede realizar cada profesional.
- Los días y horarios de atención.
- Las reservas realizadas por los clientes.

La gestión de esta información requiere mantener los datos organizados y evitar conflictos en la asignación de horarios.

## 3. Problemática identificada

En el escenario planteado, la administración de turnos puede presentar diferentes dificultades cuando no existe un sistema centralizado.

Entre los principales problemas identificados se encuentran:

- Dificultad para consultar rápidamente los horarios disponibles.
- Posibilidad de superposición de turnos de un mismo profesional.
- Necesidad de consultar manualmente qué tratamientos realiza cada profesional.
- Dificultad para mantener actualizados los precios, las duraciones y los horarios.
- Falta de un registro centralizado de las reservas.
- Dificultad para consultar el historial de turnos realizados o cancelados.

Estas situaciones justifican la necesidad de implementar una herramienta que permita organizar la información y facilitar la administración del establecimiento.

## 4. Objetivo del sistema

Desarrollar una aplicación web que permita gestionar las reservas de un centro de estética, facilitando la consulta de tratamientos, profesionales y horarios disponibles, y evitando superposiciones en la asignación de turnos.

Además, el sistema deberá proporcionar herramientas de administración para mantener actualizada la información del establecimiento.

## 5. Usuarios involucrados

Se identificaron cuatro tipos de usuarios que interactúan con el sistema.

### 5.1. Visitante

Es la persona que ingresa al sitio sin haber iniciado sesión.

Necesita:

- Consultar los tratamientos disponibles.
- Conocer la información general del centro.
- Registrarse para poder solicitar un turno.

### 5.2. Cliente

Es la persona que se registra en el sistema para solicitar servicios.

Necesita:

- Consultar los tratamientos disponibles.
- Consultar qué profesionales realizan cada tratamiento.
- Ver los horarios disponibles.
- Reservar un turno.
- Consultar sus próximas reservas y su historial.
- Cancelar sus propias reservas cuando se cumplan las condiciones establecidas.

### 5.3. Profesional

Es la persona encargada de realizar los tratamientos.

Necesita:

- Iniciar sesión.
- Consultar su agenda.
- Ver los detalles de los turnos asignados.
- Marcar los turnos realizados como completados.

### 5.4. Administrador

Es el responsable de gestionar la información y la operación del establecimiento.

Necesita:

- Registrar y modificar tratamientos.
- Actualizar precios y duraciones.
- Registrar y administrar profesionales.
- Asociar profesionales con los tratamientos que realizan.
- Configurar horarios de atención.
- Consultar y administrar las reservas.
- Cancelar reservas y actualizar sus estados.

## 6. Requerimientos funcionales

A partir de las necesidades identificadas, se establecieron los siguientes requerimientos funcionales:

| Código | Requerimiento |
|---|---|
| RF-01 | El sistema debe permitir registrar clientes. |
| RF-02 | El sistema debe permitir iniciar y cerrar sesión. |
| RF-03 | El sistema debe diferenciar los permisos según el rol del usuario. |
| RF-04 | El sistema debe mostrar el catálogo de tratamientos disponibles. |
| RF-05 | El sistema debe permitir consultar los profesionales y sus tratamientos asociados. |
| RF-06 | El sistema debe permitir consultar los horarios disponibles. |
| RF-07 | El sistema debe permitir crear reservas. |
| RF-08 | El sistema debe permitir consultar las reservas propias del cliente. |
| RF-09 | El sistema debe permitir cancelar reservas respetando las condiciones establecidas. |
| RF-10 | El sistema debe permitir a los profesionales consultar su agenda y completar turnos. |
| RF-11 | El sistema debe permitir al administrador gestionar tratamientos y profesionales. |
| RF-12 | El sistema debe permitir al administrador gestionar horarios y reservas. |
| RF-13 | El sistema debe conservar el historial de reservas. |

## 7. Requerimientos no funcionales

También se identificaron condiciones generales que debe cumplir la aplicación:

- **Seguridad:** las contraseñas deben almacenarse mediante un mecanismo de hash y las operaciones protegidas deben validar la autenticación y los permisos.
- **Disponibilidad:** la aplicación debe poder utilizarse desde internet mediante un navegador.
- **Usabilidad:** la interfaz debe permitir realizar las operaciones principales de manera clara y sencilla.
- **Integridad de la información:** el sistema debe evitar reservas superpuestas y mantener las relaciones entre clientes, profesionales, tratamientos y horarios.
- **Mantenibilidad:** el código debe organizarse en componentes diferenciados para facilitar futuras modificaciones.
- **Persistencia:** la información debe almacenarse en una base de datos para conservar los registros.

## 8. Reglas y restricciones identificadas

Durante el relevamiento se establecieron las siguientes condiciones para el funcionamiento del sistema:

- El establecimiento contará con una única sucursal.
- La versión inicial contempla dos profesionales.
- Cada profesional podrá realizar uno o varios tratamientos.
- Solo podrán reservarse tratamientos activos.
- La duración de cada turno dependerá del tratamiento seleccionado.
- No se permitirán reservas superpuestas para un mismo profesional.
- Las reservas deberán realizarse para fechas futuras y dentro de los próximos 30 días.
- Los clientes podrán cancelar sus reservas con al menos 24 horas de anticipación.
- El administrador podrá cancelar reservas sin esa restricción.
- Las reservas completadas y canceladas deberán conservarse como historial.
- No se contempla la reprogramación directa de una reserva: será necesario cancelar el turno y generar uno nuevo.

## 9. Alcance del proyecto

### Funcionalidades incluidas

La primera versión del sistema contempla:

- Registro e inicio de sesión.
- Administración de roles.
- Catálogo de tratamientos.
- Gestión de profesionales.
- Asociación de tratamientos y profesionales.
- Configuración de horarios.
- Consulta de disponibilidad.
- Creación y cancelación de reservas.
- Consulta de reservas.
- Gestión de estados.
- Paneles diferenciados según el tipo de usuario.
- Almacenamiento persistente de la información.

### Funcionalidades fuera del alcance

Para mantener un alcance definido, no se incluyen en esta versión:

- Pagos en línea ni cobro de señas.
- Notificaciones por SMS o WhatsApp.
- Aplicación móvil nativa.
- Administración de múltiples sucursales.
- Sistema de puntos, promociones o cupones.
- Gestión de feriados, vacaciones o excepciones de agenda.

## 10. Solución propuesta

Como respuesta a las necesidades identificadas, se propone desarrollar Estética Turnos como una aplicación web con arquitectura cliente-servidor.

La solución estará compuesta por:

- **Frontend:** interfaz mediante la cual los usuarios consultan información y realizan operaciones.
- **Backend:** componente encargado de procesar solicitudes, aplicar reglas de negocio y controlar los permisos.
- **Base de datos:** almacenamiento de usuarios, profesionales, tratamientos, horarios y reservas.

La separación de estos componentes permite organizar el desarrollo y mantener centralizadas las validaciones y la información.

## 11. Conclusión

El relevamiento permitió establecer las necesidades del centro de estética ficticio y definir las funcionalidades necesarias para desarrollar una solución de gestión de turnos.

A partir de la problemática identificada, se determinó que resulta conveniente implementar un sistema web que centralice la información, facilite la administración de los profesionales y tratamientos, y permita a los clientes reservar turnos según la disponibilidad existente.

Los requerimientos y restricciones definidos en este documento sirvieron como base para elaborar la especificación funcional y orientar las etapas posteriores de desarrollo de Estética Turnos.