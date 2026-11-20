# Informe de Pruebas – Estética Turnos

## 1. Introducción

El presente documento registra las pruebas realizadas sobre Estética Turnos, una aplicación web destinada a la gestión de turnos de un centro de estética.

El objetivo de las pruebas es comprobar el funcionamiento de las principales funcionalidades, verificar la interacción entre el frontend y el backend e identificar posibles errores que puedan afectar el uso del sistema.

Las verificaciones descriptas corresponden a pruebas funcionales realizadas mediante la utilización de la aplicación. No se consideran pruebas automatizadas ni de carga.

## 2. Entorno de pruebas

Las pruebas se realizaron utilizando el siguiente entorno:

| Elemento | Descripción |
|---|---|
| Aplicación | Estética Turnos |
| Frontend | React y Vite |
| Backend | Node.js y Express |
| Base de datos | MariaDB |
| ORM | Prisma |
| Navegador | Google Chrome |
| Entorno | Aplicación desplegada en Render |
| URL de acceso | https://estetica-turnos-z6fw.onrender.com |

## 3. Metodología

Se utilizó una metodología de pruebas funcionales manuales.

El procedimiento consistió en ingresar a la aplicación, ejecutar las operaciones disponibles según el tipo de usuario y observar los resultados obtenidos.

Se consideraron principalmente los siguientes aspectos:

- Funcionamiento de la autenticación.
- Acceso al panel de administración.
- Gestión de tratamientos y profesionales.
- Asociación entre profesionales y tratamientos.
- Consulta de disponibilidad.
- Creación de reservas.
- Actualización de los estados de las reservas.

## 4. Casos de prueba

### 4.1. Autenticación y acceso

| ID | Prueba | Resultado esperado | Resultado obtenido |
|---|---|---|---|
| P-01 | Iniciar sesión con credenciales válidas de administrador. | Permitir el acceso al sistema. | Correcto. |
| P-02 | Verificar las credenciales del administrador en la base de datos. | Identificar un usuario activo con rol ADMIN. | Correcto. |

### 4.2. Administración

| ID | Prueba | Resultado esperado | Resultado obtenido |
|---|---|---|---|
| P-03 | Ingresar al panel de administración. | Mostrar las opciones de gestión. | Correcto. |
| P-04 | Asociar un tratamiento a un profesional. | Registrar la asociación correctamente. | Correcto. |
| P-05 | Actualizar la información mostrada después de asociar un tratamiento. | Reflejar los cambios en el panel. | Correcto. |

### 4.3. Gestión de reservas

| ID | Prueba | Resultado esperado | Resultado obtenido |
|---|---|---|---|
| P-06 | Seleccionar un tratamiento, profesional, fecha y horario disponibles. | Permitir continuar con la reserva. | Correcto. |
| P-07 | Confirmar una reserva válida. | Crear la reserva y mostrar su información. | Correcto. |
| P-08 | Verificar los datos de la reserva creada. | Conservar tratamiento, profesional, duración, precio y estado. | Correcto. |

### 4.4. Detalle de la reserva verificada

Durante una de las pruebas funcionales se realizó correctamente la siguiente operación:

| Dato | Valor |
|---|---|
| Tratamiento | Limpieza facial |
| Profesional | Laura Martínez |
| Duración | 60 minutos |
| Precio | $20.000 |
| Estado | CONFIRMADO |

La aplicación permitió completar la operación y registrar la reserva con los datos correspondientes.

## 5. Casos de prueba

Se realizaron pruebas funcionales manuales para verificar las principales operaciones del sistema.

### 5.1. Autenticación y acceso

| ID | Prueba | Resultado obtenido |
|---|---|---|
| P-01 | Iniciar sesión con credenciales válidas de administrador. | Correcto. |
| P-02 | Verificar las credenciales y el estado de la cuenta administrativa. | Correcto. |
| P-09 | Registrar un nuevo cliente. | Correcto. |
| P-10 | Intentar iniciar sesión con credenciales incorrectas. | Correcto. El sistema rechaza el acceso. |

### 5.2. Administración

| ID | Prueba | Resultado obtenido |
|---|---|---|
| P-03 | Ingresar al panel de administración. | Correcto. |
| P-04 | Asociar un tratamiento a un profesional. | Correcto. |
| P-05 | Verificar la actualización de la información del panel. | Correcto. |

### 5.3. Gestión de reservas

| ID | Prueba | Resultado obtenido |
|---|---|---|
| P-06 | Seleccionar tratamiento, profesional, fecha y horario disponibles. | Correcto. |
| P-07 | Confirmar una reserva válida. | Correcto. |
| P-08 | Verificar los datos de la reserva creada. | Correcto. |
| P-11 | Consultar las reservas del cliente. | Correcto. |
| P-12 | Cancelar una reserva desde la cuenta del cliente. | Correcto. |
| P-13 | Cancelar una reserva desde la administración. | Correcto. |
| P-14 | Marcar una reserva como completada. | Correcto. |
| P-15 | Intentar generar reservas superpuestas. | Correcto. El sistema evita la superposición. |
| P-16 | Validar fechas y límites permitidos para reservar. | Correcto. |
| P-18 | Verificar la conservación del historial de reservas. | Correcto. |

### 5.4. Control de permisos

| ID | Prueba | Resultado obtenido |
|---|---|---|
| P-17 | Verificar los permisos correspondientes a cada rol. | Correcto. |

### 5.5. Detalle de una reserva verificada

Durante las pruebas se realizó correctamente la siguiente reserva:

| Dato | Valor |
|---|---|
| Tratamiento | Limpieza facial |
| Profesional | Laura Martínez |
| Duración | 60 minutos |
| Precio | $20.000 |
| Estado | CONFIRMADO |

La aplicación permitió completar la operación y registrar la reserva con los datos correspondientes.

## 6. Resultados generales

Las pruebas funcionales permitieron verificar correctamente:

- Registro e inicio de sesión de clientes.
- Validación de credenciales incorrectas.
- Acceso al panel administrativo.
- Asociación de tratamientos y profesionales.
- Consulta y gestión de reservas.
- Cancelación de reservas por clientes y administradores.
- Finalización de turnos.
- Validación de fechas y horarios.
- Prevención de reservas superpuestas.
- Control de permisos según el rol.
- Conservación del historial de reservas.

**Resultado general:** las 18 pruebas contempladas fueron verificadas satisfactoriamente.

## 7. Conclusión

Las pruebas funcionales realizadas sobre Estética Turnos permitieron comprobar el correcto funcionamiento de las funcionalidades principales de la aplicación.

Se verificó la autenticación de usuarios, la administración de tratamientos y profesionales, la configuración de reservas, el control de disponibilidad y las operaciones correspondientes a cada rol.

También se comprobó que el sistema respeta las reglas de negocio definidas, evita la superposición de turnos y conserva los registros históricos.

En conclusión, los resultados obtenidos fueron satisfactorios y permiten considerar que las funcionalidades verificadas cumplen con los requerimientos establecidos para esta versión del proyecto.