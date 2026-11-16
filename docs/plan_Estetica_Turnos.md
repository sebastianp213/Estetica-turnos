# Plan de trabajo – Estética Turnos

**Ubicación en el repositorio:** `docs/plan_Estetica_Turnos.md`  
**Estado:** plan de trabajo inicial  
**Referencia funcional:** `docs/spec.md`

## Objetivo

Organizar el desarrollo de Estética Turnos en tareas pequeñas, verificables y con un commit por tarea completada. Una tarea solo se marcará como hecha cuando esté implementada y se hayan ejecutado las comprobaciones correspondientes.

## Etapa 1. Preparación del repositorio

- [X] **T01 – Revisar la estructura inicial.** Comprobar que existan `frontend/`, `backend/`, `docs/`, `AGENTS.md`, `README.md` y `.gitignore`.
- [X] **T02 – Revisar la documentación.** Verificar que `spec.md`, `base_de_datos.md` y `propuesta_inicial.md` estén en `docs/` y coincidan con el alcance acordado.
- [X] **T03 – Inicializar Git y primer commit.** Revisar `git status`, confirmar que no haya secretos y registrar la estructura y documentación inicial.

## Etapa 2. Configuración del backend y la base de datos

- [X] **T04 – Inicializar el backend.** Crear el proyecto Node.js dentro de `backend/` y definir sus scripts.
- [X] **T05 – Instalar y configurar Express.** Preparar el servidor HTTP y una ruta básica de comprobación.
- [X] **T06 – Configurar variables de entorno.** Crear `.env.example`, configurar `.env` local y verificar que `.env` esté ignorado por Git.
- [X] **T07 – Instalar y configurar Prisma.** Configurar Prisma para MariaDB y ubicar `schema.prisma` en `backend/prisma/`.
- [X] **T08 – Validar el esquema de Prisma.** Ejecutar la validación del esquema y corregir cualquier error.
- [X] **T09 – Configurar MariaDB.** Crear una base de datos de desarrollo en MariaDB y configurar `DATABASE_URL` sin publicar credenciales.
- [X] **T10 – Crear la migración inicial.** Generar y aplicar la migración de las seis entidades del modelo.
- [X] **T11 – Preparar el acceso a datos.** Crear la instancia reutilizable de Prisma Client y comprobar una consulta sencilla.

## Etapa 3. Backend: autenticación y usuarios

- [X] **T12 – Definir la estructura del backend.** Separar rutas, controladores, servicios, middleware y acceso a datos.
- [X] **T13 – Implementar registro.** Validar nombre, email único y contraseña; almacenar el hash.
- [X] **T14 – Implementar inicio de sesión.** Verificar credenciales y emitir el mecanismo de autenticación elegido.
- [X] **T15 – Implementar middleware de autenticación.** Identificar al usuario autenticado en las rutas protegidas.
- [X] **T16 – Implementar autorización por roles.** Restringir operaciones según los roles cliente, profesional y administrador.
- [ ] **T17 – Probar autenticación y permisos.** Cubrir credenciales incorrectas, usuarios inactivos, roles y acceso a datos ajenos.

## Etapa 4. Backend: tratamientos, profesionales y horarios

- [X] **T18 – Implementar consulta de tratamientos.** Exponer el catálogo de tratamientos activos.
- [X] **T19 – Implementar administración de tratamientos.** Permitir al administrador crear, modificar y desactivar tratamientos.
- [X] **T20 – Implementar consulta de profesionales.** Mostrar los profesionales activos y los tratamientos que realizan.
- [X] **T21 – Implementar administración de profesionales.** Permitir al administrador gestionar los perfiles y su estado.
- [X] **T22 – Implementar asociaciones profesional-tratamiento.** Validar qué servicios puede realizar cada profesional.
- [X] **T23 – Implementar horarios de atención.** Permitir al administrador configurar un bloque continuo por día para cada profesional.
- [X] **T24 – Probar reglas de catálogo y agenda.** Verificar duraciones, precios, estados, asociaciones y horarios.

## Etapa 5. Backend: disponibilidad y reservas
    **Estado: COMPLETADA**
- [X] **T25 – Implementar consulta de disponibilidad.** Calcular horarios posibles según jornada, duración del tratamiento y reservas confirmadas.
- [X] **T26 – Implementar creación de reservas.** Validar cliente, profesional, tratamiento, fecha, anticipación y horario.
- [X] **T27 – Evitar superposición de reservas.** Proteger la creación ante solicitudes simultáneas mediante transacciones y controles adecuados en MariaDB.
- [X] **T28 – Implementar consulta de reservas.** Aplicar los permisos de cliente, profesional y administrador.
- [X] **T29 – Implementar cancelación por cliente.** Aplicar el límite de 24 horas y conservar el registro histórico.
- [X] **T30 – Implementar cancelación administrativa.** Permitir al administrador cancelar sin el límite de anticipación.
- [X] **T31 – Implementar finalización de turnos.** Permitir al profesional asignado o al administrador marcar una reserva como completada.
- [X] **T32 – Validar transiciones de estado.** Rechazar cambios de estado no permitidos.
- [X] **T33 – Probar reglas de reservas.** Cubrir casos válidos, errores, límites de tiempo, superposición, permisos e historial.

## Etapa 6. Frontend

- [X] **T34 – Inicializar React.** Crear la aplicación dentro de `frontend/` y configurar sus scripts.
- [X] **T35 – Preparar navegación y diseño general.** Crear estructura de páginas, navegación y componentes compartidos.
- [X] **T36 – Implementar registro e inicio de sesión.** Conectar los formularios con los endpoints de autenticación.
- [X] **T37 – Implementar catálogo.** Mostrar tratamientos y profesionales disponibles desde la API.
- [X] **T38 – Implementar flujo de reserva.** Permitir seleccionar tratamiento, profesional, fecha y horario disponible.
- [X] **T39 – Implementar sección de mis reservas.** Mostrar reservas propias y permitir cancelarlas según las reglas.
- [ ] **T40 – Implementar panel profesional.** Mostrar agenda y permitir completar turnos asignados.
- [ ] **T41 – Implementar panel administrador.** Gestionar tratamientos, profesionales, horarios y reservas.
- [ ] **T42 – Manejar estados de interfaz.** Mostrar carga, errores, confirmaciones y estados vacíos en las pantallas.
- [ ] **T43 – Probar integración frontend-backend.** Verificar los flujos completos con distintos roles.

## Etapa 7. Calidad y documentación

- [ ] **T44 – Ejecutar la suite completa de pruebas.** Registrar resultados reales y corregir fallos.
- [ ] **T45 – Revisar seguridad y configuración.** Comprobar permisos, validaciones, manejo de errores y ausencia de secretos.
- [ ] **T46 – Completar el informe de pruebas.** Documentar qué se probó, cómo se probó y los resultados obtenidos.
- [ ] **T47 – Actualizar el README.** Agregar requisitos, instalación, configuración, ejecución, pruebas y enlaces públicos cuando existan.
- [ ] **T48 – Revisar la documentación final.** Confirmar que spec, plan, tareas y código estén alineados.

## Etapa 8. Publicación

- [ ] **T49 – Publicar la base de datos.** Configurar MariaDB en un servicio accesible desde internet y aplicar las migraciones.
- [ ] **T50 – Publicar el backend.** Desplegar la API y configurar sus variables de entorno.
- [ ] **T51 – Publicar el frontend.** Desplegar la aplicación y configurar la URL de la API.
- [ ] **T52 – Verificar la aplicación pública.** Probar desde un navegador externo los flujos principales y los permisos.
- [ ] **T53 – Preparar la entrega.** Verificar el repositorio público, documentación, pruebas, tareas y enlaces de acceso.

## Convenciones de trabajo

1. Trabajar en una tarea a la vez.
2. Antes de implementar, revisar la regla de `docs/spec.md` relacionada con la tarea.
3. No marcar una tarea como completada hasta que el cambio esté implementado y verificado.
4. Realizar un commit por cada tarea completada, con un mensaje descriptivo. Si una tarea requiere varios commits por una razón justificada, documentarlo.
5. No incluir `.env`, contraseñas, tokens ni credenciales en los commits.
6. Si una decisión necesaria no está definida en la spec, detener esa parte y actualizar la especificación antes de programar.
7. Mantener este plan actualizado a medida que avance el proyecto.

## Formato sugerido para los commits

Usar mensajes claros, por ejemplo:

- `docs: agrega plan de trabajo`
- `chore: inicializa backend`
- `feat: implementa registro de clientes`
- `test: agrega pruebas de cancelacion de reservas`
- `fix: evita superposicion de turnos`

---

**Importante:** todas las tareas permanecen pendientes hasta que se verifique su cumplimiento. No se debe marcar ninguna como completada solo por haber creado documentos o carpetas.