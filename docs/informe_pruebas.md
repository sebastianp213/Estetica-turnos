# Informe de pruebas – Estética Turnos

## 1. Objetivo

El presente informe tiene como objetivo documentar las validaciones técnicas y pruebas funcionales realizadas sobre el sistema Estética Turnos, con el fin de comprobar el correcto funcionamiento de sus componentes, la integridad de su configuración y el cumplimiento de las principales reglas de seguridad y acceso.

## 2. Entorno de pruebas

El sistema fue probado en un entorno local de desarrollo.

**Tecnologías utilizadas:**
- Frontend: React y Vite.
- Backend: Node.js y Express.
- ORM: Prisma.
- Base de datos: MariaDB.
- Entorno de desarrollo: Windows.

## 3. Validaciones técnicas

### 3.1. Backend

Se realizaron las siguientes verificaciones:

- Validación de sintaxis de los archivos JavaScript del backend mediante Node.js.
- Verificación de sintaxis del archivo principal `server.js`.
- Validación del esquema de Prisma.
- Auditoría de dependencias mediante npm.

**Resultados:**

- No se detectaron errores de sintaxis en los archivos analizados.
- El esquema de Prisma fue validado correctamente.
- La auditoría de dependencias del backend finalizó sin vulnerabilidades detectadas.

### 3.2. Frontend

Se realizaron las siguientes comprobaciones:

- Ejecución de ESLint para detectar errores y problemas en el código.
- Generación de la compilación de producción mediante Vite.

**Resultados:**

- ESLint finalizó sin errores.
- La compilación de producción se generó correctamente.
- Se comprobó que el frontend puede prepararse para su distribución en producción.

## 4. Pruebas funcionales

Se realizaron pruebas funcionales sobre los principales comportamientos del sistema.

### 4.1. Autenticación y registro

Se verificaron los siguientes escenarios:

- Registro de nuevos usuarios.
- Rechazo del registro con un correo electrónico ya existente.
- Rechazo del inicio de sesión con contraseña incorrecta.
- Rechazo del inicio de sesión con un usuario inexistente.

Los resultados obtenidos fueron satisfactorios, verificándose el correcto funcionamiento de las validaciones correspondientes.

### 4.2. Control de acceso y permisos

Se comprobaron los permisos asociados a los distintos roles del sistema:

- Acceso de clientes a sus funcionalidades correspondientes.
- Restricción del acceso de clientes a paneles administrativos.
- Restricción del acceso de clientes al panel profesional.
- Acceso de profesionales a las funcionalidades correspondientes a su rol.

Los controles de acceso funcionaron según lo esperado durante las pruebas realizadas.

### 4.3. Gestión y privacidad de turnos

Se verificaron los siguientes comportamientos:

- Acceso del cliente a su sección de turnos.
- Restricción del acceso a turnos pertenecientes a otros clientes.
- Separación de la información de turnos según el usuario autenticado.

Los resultados fueron satisfactorios, comprobándose que los usuarios no pueden acceder libremente a información de turnos perteneciente a otros clientes.

## 5. Seguridad y configuración

Durante la revisión de seguridad se verificaron e incorporaron medidas relacionadas con:

- Protección de encabezados HTTP.
- Configuración de CORS.
- Limitación de solicitudes mediante rate limiting.
- Limitación del tamaño de las solicitudes JSON.
- Protección de rutas según autenticación y permisos.
- Manejo de errores y respuestas HTTP.
- Configuración de conexión a la base de datos mediante variables de entorno.

También se incorporaron respuestas controladas para rutas inexistentes y errores internos del servidor, evitando exponer innecesariamente detalles de implementación al cliente.

## 6. Observaciones y limitaciones

Durante las auditorías de dependencias se identificaron diferencias entre el estado del backend y el frontend.

- **Backend:** la auditoría de npm no detectó vulnerabilidades.
- **Frontend:** se detectaron vulnerabilidades de dependencias relacionadas con herramientas del entorno de desarrollo y compilación.

Se evaluó la posibilidad de corregirlas automáticamente, pero la solución propuesta implicaba cambios potencialmente incompatibles en las versiones de las herramientas utilizadas. Por este motivo, no se aplicaron actualizaciones forzadas que pudieran comprometer el funcionamiento del proyecto.

Estas observaciones deberán ser revisadas antes de realizar el despliegue definitivo.

## 7. Conclusión

Las validaciones técnicas y pruebas funcionales realizadas sobre Estética Turnos obtuvieron resultados satisfactorios.

El backend y el frontend superaron las comprobaciones de sintaxis, validación, linting y compilación. Asimismo, las pruebas funcionales realizadas permitieron verificar el comportamiento de los mecanismos de autenticación, registro, permisos y protección de información de turnos.

El sistema se encuentra en condiciones de continuar con la revisión final de documentación y la etapa de preparación para el despliegue, manteniendo pendientes las observaciones de seguridad de dependencias identificadas en el frontend y las verificaciones específicas propias del entorno de producción.
