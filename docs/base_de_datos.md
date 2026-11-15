# Diseño de la base de datos – Estética Turnos

**Ubicación en el repositorio:** `docs/base_de_datos.md`  
**Motor:** MariaDB 10.11.16  
**ORM:** Prisma 7.10.1  
**Estado:** Diseño implementado mediante Prisma y primera migración aplicada.

## 1. Objetivo

La base de datos almacena las cuentas de usuario, los profesionales, los tratamientos, los horarios de atención y las reservas.

Se utiliza un diseño relacional de seis tablas principales. Las relaciones y restricciones se implementan mediante Prisma y sus migraciones sobre MariaDB.

## 2. Entidades y relaciones

- Un **usuario** puede tener un perfil de profesional, pero no todos los usuarios son profesionales.
- Un **profesional** puede realizar varios tratamientos.
- Un **tratamiento** puede ser realizado por varios profesionales.
- La relación entre profesionales y tratamientos se representa mediante `profesional_tratamiento`.
- Un **profesional** puede tener varios horarios de atención, uno por cada día que atiende.
- Un **cliente** puede realizar muchas reservas.
- Un **profesional** puede tener muchas reservas.
- Un **tratamiento** puede aparecer en muchas reservas.

## 3. Modelo relacional implementado

### 3.1. `usuarios`

Almacena las cuentas de acceso.

| Campo | Tipo MariaDB | Restricciones | Descripción |
|---|---|---|---|
| `id` | `INT` | PK, AUTO_INCREMENT | Identificador del usuario. |
| `nombre` | `VARCHAR(100)` | NOT NULL | Nombre y apellido. |
| `email` | `VARCHAR(255)` | NOT NULL, UNIQUE | Email de acceso. |
| `password_hash` | `VARCHAR(255)` | NOT NULL | Hash de la contraseña. |
| `rol` | `ENUM` | NOT NULL, DEFAULT CLIENTE | CLIENTE, PROFESIONAL o ADMIN. |
| `activo` | `BOOLEAN` | NOT NULL, DEFAULT TRUE | Indica si la cuenta puede ingresar. |
| `created_at` | `DATETIME(3)` | NOT NULL, DEFAULT CURRENT_TIMESTAMP(3) | Fecha de creación. |

**Reglas:**

- El email debe guardarse normalizado en minúsculas.
- La contraseña nunca se almacena en texto plano.
- El rol se valida en el backend.
- Los valores permitidos para el rol se definen mediante el enum `RolUsuario`.

### 3.2. `profesionales`

Almacena los datos propios de cada profesional y se vincula con una cuenta de usuario.

| Campo | Tipo MariaDB | Restricciones | Descripción |
|---|---|---|---|
| `id` | `INT` | PK, AUTO_INCREMENT | Identificador del profesional. |
| `usuario_id` | `INT` | NOT NULL, UNIQUE, FK → `usuarios.id` | Cuenta asociada. |
| `descripcion` | `TEXT` | NULL | Presentación o especialidad del profesional. |
| `activo` | `BOOLEAN` | NOT NULL, DEFAULT TRUE | Disponibilidad para recibir nuevas reservas. |

La aplicación comenzará con dos profesionales registrados. Cada uno tendrá su propia agenda y sus especialidades.

### 3.3. `tratamientos`

Almacena los servicios que ofrece el centro.

| Campo | Tipo MariaDB | Restricciones | Descripción |
|---|---|---|---|
| `id` | `INT` | PK, AUTO_INCREMENT | Identificador del tratamiento. |
| `nombre` | `VARCHAR(100)` | NOT NULL, UNIQUE | Nombre del tratamiento. |
| `descripcion` | `TEXT` | NULL | Descripción del servicio. |
| `duracion_minutos` | `INT` | NOT NULL | Duración del turno. |
| `precio` | `DECIMAL(10,2)` | NOT NULL | Precio vigente. |
| `activo` | `BOOLEAN` | NOT NULL, DEFAULT TRUE | Indica si se puede reservar. |

El backend debe validar que la duración sea mayor que cero y que el precio no sea negativo.

### 3.4. `profesional_tratamiento`

Resuelve la relación muchos a muchos entre profesionales y tratamientos.

| Campo | Tipo MariaDB | Restricciones | Descripción |
|---|---|---|---|
| `profesional_id` | `INT` | PK compuesta, FK → `profesionales.id` | Profesional. |
| `tratamiento_id` | `INT` | PK compuesta, FK → `tratamientos.id` | Tratamiento habilitado. |

La clave primaria compuesta (`profesional_id`, `tratamiento_id`) evita repetir la misma asociación.

### 3.5. `horarios_atencion`

Define los horarios habituales de cada profesional.

| Campo | Tipo MariaDB | Restricciones | Descripción |
|---|---|---|---|
| `id` | `INT` | PK, AUTO_INCREMENT | Identificador del horario. |
| `profesional_id` | `INT` | NOT NULL, FK → `profesionales.id` | Profesional. |
| `dia_semana` | `ENUM` | NOT NULL | Día de la semana. |
| `hora_inicio` | `TIME` | NOT NULL | Inicio de atención. |
| `hora_fin` | `TIME` | NOT NULL | Fin de atención. |

**Restricciones adicionales:**

- `hora_fin` debe ser posterior a `hora_inicio`.
- Debe existir como máximo un registro por profesional y día: `UNIQUE (profesional_id, dia_semana)`.
- Se utiliza el enum `DiaSemana`, con los valores desde LUNES hasta DOMINGO.

### 3.6. `reservas`

Almacena cada turno solicitado.

| Campo | Tipo MariaDB | Restricciones | Descripción |
|---|---|---|---|
| `id` | `INT` | PK, AUTO_INCREMENT | Identificador de la reserva. |
| `cliente_id` | `INT` | NOT NULL, FK → `usuarios.id` | Usuario que reservó. |
| `profesional_id` | `INT` | NOT NULL, FK → `profesionales.id` | Profesional asignado. |
| `tratamiento_id` | `INT` | NOT NULL, FK → `tratamientos.id` | Tratamiento reservado. |
| `inicio` | `DATETIME(3)` | NOT NULL | Fecha y hora de inicio. |
| `fin` | `DATETIME(3)` | NOT NULL | Fecha y hora de finalización. |
| `precio_aplicado` | `DECIMAL(10,2)` | NOT NULL | Precio guardado al reservar. |
| `estado` | `ENUM` | NOT NULL, DEFAULT CONFIRMADO | Estado actual. |
| `created_at` | `DATETIME(3)` | NOT NULL, DEFAULT CURRENT_TIMESTAMP(3) | Fecha de creación. |

**Restricciones adicionales:**

- `fin` debe ser posterior a `inicio`.
- `estado` solo puede ser CONFIRMADO, COMPLETADO o CANCELADO.
- La reserva conserva `precio_aplicado` aunque luego cambie el precio del tratamiento.
- Las reservas canceladas y completadas no se eliminan.
- Las reservas con estado CONFIRMADO son las que bloquean el horario.

Los valores de estado se definen mediante el enum `EstadoReserva`.

## 4. Diagrama de relaciones

```mermaid
erDiagram
    USUARIOS ||--o| PROFESIONALES : "puede tener perfil"
    USUARIOS ||--o{ RESERVAS : "realiza como cliente"
    PROFESIONALES ||--o{ RESERVAS : "atiende"
    TRATAMIENTOS ||--o{ RESERVAS : "se reserva"
    PROFESIONALES ||--o{ HORARIOS_ATENCION : "tiene"
    PROFESIONALES ||--o{ PROFESIONAL_TRATAMIENTO : "ofrece"
    TRATAMIENTOS ||--o{ PROFESIONAL_TRATAMIENTO : "puede ser realizado por"