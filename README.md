# Estética Turnos

Sistema web de gestión de turnos para un centro de estética.

## Descripción

Estética Turnos es una aplicación web que permite administrar las reservas de un centro de estética. Los clientes pueden consultar los tratamientos, conocer a los profesionales y visualizar los horarios disponibles para reservar sus turnos.

El sistema también cuenta con un sector para profesionales y otro para administradores, con diferentes permisos y funcionalidades.

El proyecto contempla una única sucursal y dos profesionales.

## Funcionalidades

### Clientes

- Registro e inicio de sesión.
- Consulta de tratamientos disponibles.
- Consulta de profesionales.
- Visualización de horarios disponibles.
- Reserva de turnos.
- Cancelación de turnos respetando las condiciones establecidas.
- Consulta de próximas reservas y del historial.

### Profesionales

- Inicio de sesión.
- Consulta de agenda personal.
- Visualización de turnos asignados.
- Actualización del estado de los turnos, permitiendo marcarlos como completados.

### Administradores

- Gestión de tratamientos y precios.
- Gestión de profesionales.
- Configuración de horarios de atención.
- Administración de reservas.
- Gestión de usuarios.

## Tecnologías

- **Frontend:** React.
- **Backend:** Node.js y Express.
- **Base de datos:** MariaDB.
- **ORM:** Prisma.
- **Autenticación:** JWT.
- **Control de versiones:** Git y GitHub.

## Estructura del proyecto

```text
estetica-turnos/
├── frontend/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   └── routes/
│   ├── prisma.config.ts
│   ├── server.js
│   └── package.json
├── docs/
│   ├── base_de_datos.md
│   ├── plan_Estetica_Turnos.md
│   ├── propuesta_inicial.md
│   └── spec.md
├── AGENTS.md
├── README.md
└── .gitignore