# AGENTS.md – Estética Turnos

## 1. Contexto del proyecto

Estética Turnos es una aplicación web para gestionar las reservas de un centro de estética.

El proyecto cuenta con:
- Una única sucursal.
- Dos profesionales.
- Clientes que pueden reservar y cancelar turnos.
- Profesionales que pueden consultar su agenda.
- Administradores que gestionan el sistema.

## 2. Tecnologías

- Frontend: React.
- Backend: Node.js y Express.
- Base de datos: MariaDB.
- ORM: Prisma.
- Control de versiones: Git y GitHub.

## 3. Documentación obligatoria

Antes de implementar una funcionalidad, consultar:

- `docs/spec.md`: especificación funcional y reglas de negocio.
- `docs/base_de_datos.md`: diseño de la base de datos.
- `backend/prisma/schema.prisma`: modelos y relaciones.
- `docs/plan_Estetica_Turnos.md`: tareas y etapas del desarrollo.

La especificación es la referencia principal para determinar cómo debe comportarse el sistema.

Si una funcionalidad no está definida o existe una contradicción, no inventar una regla. Informar la duda y solicitar una decisión antes de implementarla.

## 4. Reglas de desarrollo

- Respetar la arquitectura y la separación de responsabilidades entre frontend y backend.
- No colocar reglas de negocio únicamente en el frontend.
- Validar los datos y permisos en el backend.
- Utilizar Prisma para acceder a MariaDB.
- No duplicar lógica innecesariamente.
- Mantener el código organizado y fácil de comprender.
- No agregar funcionalidades que no estén contempladas en la especificación sin autorización.
- No modificar reglas de negocio sin actualizar primero `docs/spec.md`.

## 5. Seguridad

- Nunca guardar contraseñas en texto plano.
- No exponer contraseñas, tokens ni credenciales.
- No subir archivos `.env` a GitHub.
- Utilizar variables de entorno para los datos sensibles.
- Verificar autenticación y autorización en las rutas protegidas.
- No confiar en los datos enviados por el frontend.
- Evitar que los usuarios accedan a información que no les corresponde.

## 6. Base de datos

- Mantener los modelos de Prisma coherentes con `docs/base_de_datos.md`.
- No modificar el esquema sin revisar las consecuencias sobre las relaciones existentes.
- Utilizar migraciones de Prisma para registrar los cambios de estructura.
- Conservar el historial de reservas canceladas y completadas.
- Mantener el precio aplicado en cada reserva aunque cambie el precio del tratamiento.
- No modificar manualmente la estructura de la base de datos sin actualizar el esquema y las migraciones correspondientes.

## 7. Pruebas

- Crear pruebas para las reglas de negocio importantes.
- Comprobar los casos correctos y los casos de error.
- Verificar especialmente la disponibilidad y la superposición de turnos.
- Ejecutar las pruebas después de modificar una funcionalidad.
- No afirmar que una prueba pasó si no fue ejecutada.

## 8. Git y documentación

- Realizar un commit por cada tarea completada.
- Utilizar mensajes de commit descriptivos.
- No subir dependencias instaladas ni archivos generados.
- Mantener actualizado el README y la documentación.
- Marcar las tareas como completadas únicamente cuando estén implementadas y verificadas.
- No incluir archivos `.env`, contraseñas, tokens ni credenciales en los commits.

## 9. Forma de trabajo

Antes de realizar cambios:

1. Revisar la tarea y la documentación relacionada.
2. Identificar los archivos que necesitan modificarse.
3. Explicar brevemente qué cambios se realizarán.

Después de realizar cambios:

1. Revisar que la implementación respete la especificación.
2. Ejecutar las pruebas correspondientes.
3. Informar qué archivos se modificaron y qué pruebas se ejecutaron.
4. No modificar archivos ajenos a la tarea sin justificación.