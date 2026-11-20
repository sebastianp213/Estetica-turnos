# Manual de Usuario — Estética Turnos

## 1. Introducción

Estética Turnos es una aplicación web que permite a los clientes consultar los tratamientos disponibles de un centro de estética, conocer a los profesionales que los realizan y reservar turnos según los horarios disponibles.

El sistema permite gestionar las reservas personales y consultar su estado desde cualquier dispositivo con acceso a internet.

**Acceso a la aplicación:**

https://estetica-turnos-z6fw.onrender.com

## 2. Requisitos para utilizar el sistema

Para utilizar Estética Turnos se necesita:

- Una computadora, tablet o teléfono celular.
- Conexión a internet.
- Un navegador web actualizado.
- Una cuenta registrada para realizar reservas.

No es necesario instalar ningún programa adicional.

## 3. Acceso al sistema

### 3.1. Ingresar a la aplicación

1. Abrir un navegador web.
2. Ingresar a https://estetica-turnos-z6fw.onrender.com.
3. Se mostrará la página principal del sistema.
4. Desde allí se podrán consultar los tratamientos y la información disponible.

### 3.2. Registrarse

Para reservar turnos es necesario contar con una cuenta.

1. Ingresar a la opción de registro.
2. Completar los datos solicitados:
   - Nombre.
   - Correo electrónico.
   - Contraseña.
3. Confirmar el registro.
4. Una vez creada la cuenta, ingresar al sistema utilizando el correo electrónico y la contraseña registrados.

**Importante:** el correo electrónico debe ser único y la contraseña debe tener al menos 8 caracteres.

### 3.3. Iniciar sesión

1. Seleccionar la opción de inicio de sesión.
2. Ingresar el correo electrónico.
3. Ingresar la contraseña.
4. Confirmar el acceso.

Si las credenciales son correctas, el sistema permitirá acceder a las funcionalidades correspondientes al perfil del usuario.

## 4. Consultar tratamientos

Los visitantes y clientes pueden consultar el catálogo de tratamientos disponibles.

La información de cada tratamiento incluye:

- Nombre.
- Descripción.
- Duración aproximada en minutos.
- Precio.

Solamente los tratamientos que se encuentren activos estarán disponibles para realizar nuevas reservas.

## 5. Consultar profesionales

El sistema permite conocer los profesionales registrados y los tratamientos que realiza cada uno.

Cada profesional puede estar asociado a uno o más tratamientos.

Al seleccionar un tratamiento para reservar, solamente se podrán elegir profesionales habilitados para realizarlo.

## 6. Reservar un turno

Para realizar una reserva es necesario haber iniciado sesión como cliente.

El procedimiento es el siguiente:

1. Ingresar al sistema con la cuenta personal.
2. Seleccionar el tratamiento deseado.
3. Seleccionar un profesional que realice ese tratamiento.
4. Consultar las fechas y horarios disponibles.
5. Elegir el día y horario deseados.
6. Revisar los datos de la reserva.
7. Confirmar la operación.

Una vez confirmada correctamente, el sistema registra la reserva y muestra la información correspondiente.

### 6.1. Información de la reserva

La reserva contiene:

- Tratamiento seleccionado.
- Profesional asignado.
- Fecha y hora de inicio.
- Hora de finalización.
- Duración del tratamiento.
- Precio aplicado.
- Estado de la reserva.

Las reservas creadas correctamente comienzan con el estado **CONFIRMADO**.

### 6.2. Disponibilidad de horarios

Los horarios disponibles dependen de:

- Los días y horarios de atención configurados para el profesional.
- La duración del tratamiento seleccionado.
- Las reservas existentes.
- La disponibilidad real al momento de confirmar.

El sistema no permite reservar horarios anteriores al momento actual ni turnos que se superpongan con otras reservas del profesional.

Las reservas se pueden realizar con una anticipación máxima de 30 días.

**Importante:** un horario que aparece disponible puede ser reservado por otra persona antes de confirmar. Por eso, el sistema vuelve a comprobar la disponibilidad al finalizar la operación.

## 7. Consultar mis reservas

El cliente puede consultar las reservas asociadas a su cuenta desde la sección correspondiente a sus turnos.

En esta sección podrá visualizar información como:

- Tratamiento reservado.
- Profesional asignado.
- Fecha y horario.
- Precio.
- Estado de la reserva.

Cada cliente solamente puede consultar sus propias reservas.

## 8. Cancelar una reserva

El cliente puede cancelar una reserva desde la sección de sus turnos.

Para hacerlo:

1. Iniciar sesión.
2. Ingresar a la sección de reservas personales.
3. Identificar el turno que desea cancelar.
4. Seleccionar la opción de cancelación.
5. Confirmar la operación, si el sistema lo solicita.

### 8.1. Condiciones de cancelación

El cliente puede cancelar un turno siempre que falten al menos 24 horas para su horario de inicio.

Si faltan menos de 24 horas, el sistema rechazará la cancelación.

Cuando una reserva se cancela:

- Su estado cambia a **CANCELADO**.
- El horario deja de estar ocupado.
- La reserva permanece en el historial del sistema.

## 9. Estados de las reservas

Las reservas pueden presentar los siguientes estados:

| Estado | Descripción |
|---|---|
| CONFIRMADO | La reserva fue creada correctamente y ocupa el horario. |
| COMPLETADO | El tratamiento fue realizado. |
| CANCELADO | La reserva fue cancelada y el horario quedó liberado. |

## 10. Recomendaciones

- Verificar el tratamiento seleccionado antes de confirmar.
- Comprobar que el profesional elegido sea el correcto.
- Revisar la fecha y el horario de la reserva.
- Consultar periódicamente la sección de reservas personales.
- Realizar las cancelaciones con al menos 24 horas de anticipación.
- No compartir las credenciales de acceso con otras personas.

## 11. Consideraciones generales

En esta versión del sistema:

- No se realizan pagos en línea.
- No se permite modificar directamente una reserva existente para cambiar su fecha, horario, profesional o tratamiento.
- Para cambiar un turno, se debe cancelar la reserva vigente cuando las condiciones lo permitan y generar una nueva.
- El sistema funciona para una única sucursal.

## 12. Acceso a la aplicación

**Estética Turnos:**

https://estetica-turnos-z6fw.onrender.com

**Repositorio del proyecto:**

https://github.com/sebastianp213/Estetica-Turnos