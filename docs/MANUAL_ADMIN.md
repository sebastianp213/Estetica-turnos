# Manual de Administración – Estética Turnos

## 1. Introducción

El presente manual describe el funcionamiento del panel de administración del sistema Estética Turnos. Está dirigido a las personas responsables de gestionar los tratamientos, profesionales, horarios de atención y reservas del establecimiento.

El acceso al panel está restringido a usuarios que tengan asignado el rol de administrador.

**Sistema:** [Estética Turnos](https://estetica-turnos-z6fw.onrender.com)

## 2. Acceso al panel de administración

Para ingresar al panel:

1. Abrir el sistema desde el navegador.
2. Seleccionar la opción de inicio de sesión.
3. Ingresar el correo electrónico y la contraseña de una cuenta administradora.
4. Una vez iniciada la sesión, acceder al panel de administración.

El sistema identifica el rol del usuario y habilita las funciones correspondientes.

## 3. Gestión de tratamientos

Desde la sección de tratamientos, el administrador puede gestionar los servicios ofrecidos por el establecimiento.

Las operaciones disponibles son:

- **Crear un tratamiento:** permite incorporar un nuevo servicio.
- **Modificar un tratamiento:** permite actualizar sus datos.
- **Activar o desactivar:** permite controlar si un tratamiento está disponible para nuevas reservas.

Los datos principales de un tratamiento son:

- Nombre.
- Descripción.
- Duración en minutos.
- Precio.
- Estado de actividad.

Los tratamientos desactivados dejan de estar disponibles para las nuevas reservas.

## 4. Gestión de profesionales

En esta sección se administran los profesionales que trabajan en el establecimiento.

El administrador puede:

- Registrar nuevos profesionales.
- Modificar sus datos.
- Activar o desactivar profesionales.
- Consultar los tratamientos asociados a cada profesional.

La desactivación permite impedir que un profesional siga participando en nuevas reservas sin necesidad de eliminar sus registros históricos.

### 4.1. Asociación de tratamientos

Cada profesional puede estar asociado a uno o varios tratamientos.

Para administrar estas asociaciones:

1. Ingresar a la sección de profesionales.
2. Seleccionar el profesional correspondiente.
3. Elegir el tratamiento que se desea asociar.
4. Confirmar la operación.

También es posible quitar una asociación existente.

Esta configuración determina qué tratamientos puede realizar cada profesional y, por lo tanto, qué opciones estarán disponibles para los clientes al momento de reservar.

## 5. Gestión de horarios

La sección de horarios permite configurar los días y horarios de atención de cada profesional.

El administrador puede:

- Crear un horario de atención.
- Modificar un horario existente.
- Eliminar un horario.

Para configurar un horario se debe seleccionar el profesional, el día de la semana y las horas de inicio y finalización.

El sistema utiliza esta información para determinar qué turnos pueden ofrecerse a los clientes.

**Importante:** el sistema contempla un único bloque continuo de atención por profesional para cada día de la semana.

## 6. Gestión de reservas

Desde la sección de reservas, el administrador puede consultar las reservas registradas en el sistema y realizar determinadas acciones sobre ellas.

Las operaciones disponibles son:

- Consultar las reservas.
- Cancelar una reserva.
- Marcar una reserva como completada.

### 6.1. Cancelación de reservas

El administrador puede cancelar una reserva confirmada sin estar sujeto al límite de anticipación de 24 horas que se aplica a los clientes.

Al cancelar una reserva, el horario correspondiente vuelve a quedar disponible, siempre que se cumplan las demás condiciones de disponibilidad.

### 6.2. Finalización de reservas

Una reserva confirmada puede marcarse como completada cuando el servicio ya fue realizado.

Esta operación actualiza el estado de la reserva y permite conservar un registro de los servicios realizados.

## 7. Estados de las reservas

El sistema contempla los siguientes estados:

| Estado | Descripción |
|---|---|
| CONFIRMADO | La reserva fue creada correctamente y está vigente. |
| COMPLETADO | El servicio fue realizado. |
| CANCELADO | La reserva fue anulada. |

Los registros históricos se conservan, incluso cuando una reserva se cancela o se completa.

## 8. Consideraciones importantes

- La administración del sistema corresponde exclusivamente a usuarios con rol ADMIN.
- Los tratamientos deben estar activos para poder reservarse.
- Los profesionales deben tener asociados los tratamientos que realizan.
- Los horarios configurados determinan la disponibilidad de los profesionales.
- La cancelación administrativa no tiene la restricción de 24 horas.
- Las reservas completadas y canceladas se conservan como historial.
- El sistema está diseñado para una única sucursal.

## 9. Recomendaciones de uso

- Mantener actualizados los precios y las duraciones de los tratamientos.
- Verificar las asociaciones entre profesionales y tratamientos.
- Revisar los horarios de atención antes de habilitar nuevas reservas.
- Consultar periódicamente las reservas registradas.
- Utilizar la opción de desactivar cuando un tratamiento o profesional deje de ofrecerse temporalmente, en lugar de eliminar información innecesariamente.

## 10. Acceso al sistema

El sistema se encuentra disponible en:

https://estetica-turnos-z6fw.onrender.com

Repositorio del proyecto:

https://github.com/sebastianp213/Estetica-Turnos.git
