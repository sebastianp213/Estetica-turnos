# Especificación funcional -- Estética Turnos

**Archivo:** `docs/spec.md`\
**Estado:** versión inicial actualizada para revisión\
**Proyecto:** Sistema de turnos para un centro de estética\
**Zona horaria de referencia:** `America/Argentina/Buenos_Aires`

## 1. Propósito

Estética Turnos es una aplicación web para administrar las reservas de
un centro de estética. Los clientes podrán consultar tratamientos,
profesionales y horarios disponibles, y reservar o cancelar sus turnos.
Los profesionales podrán consultar su agenda y actualizar el estado de
los turnos que tienen asignados. El administrador podrá gestionar los
datos y la operación del centro.

El sistema tendrá una única sucursal y dos profesionales. El frontend se
comunicará con el backend mediante una API, y el backend será el único
componente que accederá a la base de datos.

## 2. Alcance de esta versión

Esta versión incluye:

-   Una única sucursal del centro de estética.
-   Dos profesionales.
-   Registro e inicio de sesión.
-   Roles de cliente, profesional y administrador.
-   Catálogo de tratamientos.
-   Asociación de profesionales con los tratamientos que pueden
    realizar.
-   Configuración de horarios de atención.
-   Consulta de disponibilidad.
-   Creación, consulta y cancelación de reservas.
-   Gestión del estado de las reservas.
-   Paneles diferenciados según el rol.
-   Persistencia de la información en una base de datos.

Esta versión no incluye:

-   Pagos en línea ni cobro de señas.
-   Envío de mensajes SMS o WhatsApp.
-   Aplicación móvil nativa.
-   Múltiples sucursales.
-   Sistema de puntos, promociones o cupones.
-   Gestión de feriados, vacaciones o excepciones de agenda.

## 3. Tipos de usuario y permisos

### 3.1. Visitante

Puede consultar el catálogo público de tratamientos y la información
general del centro. Para reservar un turno debe registrarse e iniciar
sesión.

### 3.2. Cliente

Puede consultar tratamientos y profesionales, consultar horarios
disponibles, crear reservas, ver sus propias reservas y cancelar sus
propias reservas cuando se cumplan las condiciones de cancelación.

No puede consultar ni modificar reservas pertenecientes a otros
clientes.

### 3.3. Profesional

Puede iniciar sesión y consultar únicamente los turnos que tiene
asignados. Puede marcar sus turnos como completados. No puede gestionar
tratamientos, precios, horarios generales ni reservas de otros
profesionales.

### 3.4. Administrador

Puede gestionar tratamientos, profesionales, horarios y reservas. Puede
consultar la información de los clientes necesaria para administrar el
servicio. Puede cambiar el estado de una reserva y cancelar reservas.

## 4. Reglas de negocio

Las reglas siguientes son requisitos funcionales verificables. Cada una
deberá contemplarse en la implementación y, cuando corresponda, contar
con pruebas.

### Usuarios y autenticación

**RN-01. Registro de clientes.** Una persona debe poder crear una cuenta
proporcionando nombre, email y contraseña.

**RN-02. Email único.** No se pueden registrar dos cuentas con el mismo
email. La comparación debe ignorar diferencias entre mayúsculas y
minúsculas.

**RN-03. Contraseña segura.** La contraseña debe cumplir una longitud
mínima de 8 caracteres. El sistema debe almacenar únicamente un hash de
la contraseña, nunca el texto original.

**RN-04. Acceso autenticado.** Para crear, consultar o cancelar sus
reservas, el cliente debe haber iniciado sesión.

**RN-05. Control de roles.** Cada operación protegida debe verificar en
el backend que el usuario autenticado tenga el rol requerido. Ocultar
una opción en el frontend no reemplaza esta validación.

**RN-06. Acceso a datos propios.** Un cliente solo puede consultar y
cancelar reservas asociadas a su propia cuenta. Un profesional solo
puede consultar y actualizar los turnos que tiene asignados, salvo las
acciones reservadas al administrador.

### Tratamientos y profesionales

**RN-07. Cantidad de profesionales.** En esta versión inicial el centro
contará con dos profesionales registrados.

**RN-08. Datos de un tratamiento.** Cada tratamiento debe tener nombre,
descripción, duración en minutos, precio y estado (activo o inactivo).

**RN-09. Duración válida.** La duración de un tratamiento debe ser mayor
que cero.

**RN-10. Precio válido.** El precio de un tratamiento no puede ser
negativo.

**RN-11. Tratamientos disponibles.** Solo los tratamientos activos
pueden ser reservados por los clientes.

**RN-12. Profesionales habilitados.** Cada profesional puede realizar
uno o más tratamientos. Un cliente solo puede reservar un tratamiento
con un profesional habilitado para realizarlo.

**RN-13. Gestión administrativa.** Solo el administrador puede crear,
modificar o desactivar tratamientos y profesionales.

**RN-14. Desactivación.** Un tratamiento o profesional inactivo no puede
recibir nuevas reservas. La desactivación no debe borrar el historial de
reservas ya existentes.

### Horarios y disponibilidad

**RN-15. Una sucursal.** Todos los profesionales atenderán en una única
sucursal.

**RN-16. Horarios de atención.** Cada profesional tendrá configurados
sus días y horarios habituales de atención.

**RN-17. Un bloque de atención por día.** Para simplificar la agenda,
cada profesional tendrá como máximo un bloque continuo de atención por
día. No se administrarán pausas ni bloques separados en esta versión.

**RN-18. Duración del turno.** La duración de una reserva se obtiene del
tratamiento seleccionado. El cliente no puede modificarla manualmente.

**RN-19. Horarios dentro de la jornada.** Una reserva debe comenzar y
finalizar dentro del horario de atención configurado para el
profesional.

**RN-20. Fecha futura.** No se pueden crear reservas para fechas u
horarios anteriores al momento actual.

**RN-21. Anticipación máxima.** Solo se pueden reservar turnos dentro de
los próximos 30 días.

**RN-22. Sin superposición.** Un profesional no puede tener dos reservas
activas cuyos intervalos horarios se superpongan. Para comprobarlo se
debe considerar la hora de inicio y la hora de finalización, calculada
usando la duración del tratamiento.

**RN-23. Disponibilidad actualizada.** Antes de confirmar una reserva,
el backend debe volver a comprobar la disponibilidad. Si otro cliente
ocupó ese horario mientras se realizaba la operación, la nueva reserva
debe rechazarse.

**RN-24. Disponibilidad no garantiza reserva.** Que un horario aparezca
como disponible no garantiza que siga libre al momento de confirmar. La
confirmación depende de la validación final del backend.

### Reservas

**RN-25. Datos de la reserva.** Cada reserva debe asociar un cliente, un
profesional, un tratamiento, una fecha y hora de inicio, una fecha y
hora de finalización, el precio aplicado y un estado.

**RN-26. Precio histórico.** La reserva debe conservar el precio del
tratamiento al momento de crearla. Un cambio posterior en el precio del
catálogo no debe modificar reservas anteriores.

**RN-27. Estado inicial.** Toda reserva creada correctamente comienza
con estado `confirmado`.

**RN-28. Consulta de reservas.** Un cliente puede consultar sus propias
reservas. Un profesional puede consultar las reservas asignadas a su
agenda. El administrador puede consultar todas las reservas.

**RN-29. Cancelación por el cliente.** El cliente puede cancelar su
reserva hasta 24 horas antes del horario de inicio. Si faltan menos de
24 horas, el sistema debe rechazar la cancelación solicitada por el
cliente.

**RN-30. Cancelación administrativa.** El administrador puede cancelar
una reserva sin la restricción de anticipación de 24 horas.

**RN-31. Liberación del horario.** Una reserva cancelada deja de
bloquear la disponibilidad del profesional.

**RN-32. Historial.** Las reservas canceladas o completadas deben
conservarse en el sistema. No se deben eliminar físicamente como parte
del flujo normal de cancelación.

**RN-33. Finalización.** El profesional asignado o el administrador
puede marcar una reserva confirmada como completada.

**RN-34. Transiciones válidas.** Una reserva cancelada no puede volver a
confirmarse ni marcarse como completada. Una reserva completada no puede
cancelarse mediante el flujo normal.

**RN-35. No modificar reservas ajenas.** Un cliente no puede modificar
ni cancelar una reserva de otro cliente manipulando el identificador
enviado al backend.

**RN-36. Reprogramación.** En esta versión no se permitirá editar
directamente la fecha, hora, profesional o tratamiento de una reserva
existente. Para cambiar un turno, el cliente deberá cancelar la reserva
vigente (si cumple la regla de cancelación) y crear una nueva. El
administrador podrá cancelar una reserva y registrar otra en su lugar.

## 5. Estados de una reserva

En esta versión se utilizarán los siguientes estados:

  Estado         Significado
  -------------- ----------------------------------------------------
  `confirmado`   La reserva fue creada y ocupa el horario.
  `completado`   El servicio fue realizado.
  `cancelado`    La reserva fue cancelada y ya no ocupa el horario.

No se implementará un estado `pendiente` en esta versión porque no habrá
pagos ni aprobación manual para confirmar una reserva.

## 6. Datos principales del sistema

Las entidades iniciales previstas son:

-   **Usuario:** nombre, email, contraseña hasheada, rol y estado.
-   **Profesional:** relación con un usuario, datos del perfil y estado.
-   **Tratamiento:** nombre, descripción, duración, precio y estado.
-   **ProfesionalTratamiento:** relación entre profesionales y
    tratamientos que pueden realizar.
-   **HorarioAtencion:** profesional, día de la semana, hora de inicio y
    hora de fin.
-   **Reserva:** cliente, profesional, tratamiento, inicio, fin, precio
    aplicado y estado.

El sistema tendrá dos registros de profesionales iniciales. La
estructura permitirá asociar tratamientos con cualquiera de ellos.

## 7. Requisitos generales de seguridad y funcionamiento

-   Las validaciones de reglas de negocio deben ejecutarse en el
    backend.
-   Las contraseñas deben almacenarse mediante hash seguro.
-   Las rutas protegidas deben comprobar autenticación y autorización.
-   Las credenciales y claves secretas deben configurarse mediante
    variables de entorno.
-   Los errores de la API no deben exponer contraseñas, tokens ni
    detalles internos de la base de datos.
-   Las operaciones de creación de reservas deben proteger la
    consistencia de los horarios ante solicitudes simultáneas.
-   Las fechas y horas deben interpretarse de forma consistente usando
    la zona horaria `America/Argentina/Buenos_Aires`.

## 8. Criterios de aceptación principales

La aplicación se considerará funcionalmente aceptable cuando se pueda
comprobar que:

1.  Un cliente puede registrarse e iniciar sesión.
2.  Un cliente puede consultar tratamientos activos y los dos
    profesionales disponibles.
3.  El sistema muestra horarios disponibles según la agenda del
    profesional.
4.  Un cliente puede crear una reserva válida.
5.  El backend rechaza reservas pasadas, fuera del horario, con más de
    30 días de anticipación o superpuestas.
6.  El backend evita que dos reservas simultáneas ocupen el mismo
    horario.
7.  Un cliente puede consultar únicamente sus propias reservas.
8.  Un cliente puede cancelar con al menos 24 horas de anticipación y el
    sistema rechaza una cancelación fuera de ese límite.
9.  El administrador puede gestionar tratamientos, profesionales,
    horarios y reservas.
10. Un profesional puede consultar su agenda y marcar sus turnos como
    completados.
11. Las reservas canceladas y completadas permanecen en el historial.
12. La aplicación publicada puede utilizarse desde internet sin ejecutar
    el proyecto localmente.

## 9. Decisiones definidas para esta versión

Para mantener el alcance sencillo y realizable, se establecen estas
decisiones:

-   El centro tendrá una única sucursal.
-   Habrá dos profesionales desde el inicio.
-   Cada profesional podrá realizar uno o más tratamientos.
-   Cada profesional tendrá como máximo un bloque continuo de atención
    por día.
-   No se administrarán feriados, vacaciones ni excepciones de agenda en
    esta versión.
-   No se editarán directamente los datos de una reserva para
    reprogramarla; se cancelará y se creará otra.
-   No habrá pagos en línea ni señas.

Cualquier cambio posterior deberá reflejarse primero en esta
especificación y luego en el plan y las tareas.

------------------------------------------------------------------------

**Importante:** esta es una primera versión de la spec. No se debe
comenzar a implementar una regla ambigua: primero se aclara y se
actualiza este documento.
