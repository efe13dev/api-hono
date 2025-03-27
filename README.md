# API REST con Hono y Bun

API REST construida con [Hono](https://hono.dev/) y [Bun](https://bun.sh/), utilizando TypeScript para un desarrollo seguro y mantenible.

## Características

- 🚀 Framework Hono para APIs rápidas y eficientes
- 🔒 Autenticación de usuarios (registro y login)
- 📝 Validación de datos con Zod
- 🗄️ Base de datos SQL con Drizzle ORM
- ✨ Formateo de código con Biome

## Requisitos Previos

- [Bun](https://bun.sh/) instalado en tu sistema

## Instalación

```bash
# Clonar el repositorio
git clone <tu-repositorio>

# Instalar dependencias
bun install
```

## Desarrollo

Para iniciar el servidor en modo desarrollo:

```bash
bun run dev
```

El servidor estará disponible en `http://localhost:3000`

## Tecnologías Principales

- **Hono**: Framework web ultrarrápido
- **Drizzle ORM**: ORM moderno para TypeScript
- **Zod**: Validación de esquemas
- **Biome**: Herramienta de formateo de código
- **LibSQL**: Cliente SQL para la base de datos

## Estructura del Proyecto

```
api-hono/
├── src/
│   ├── db/
│   │   ├── index.ts     # Configuración de la base de datos
│   │   └── schema.ts    # Esquemas de la base de datos
│   ├── routes/
│   │   └── auth.route.ts # Rutas de autenticación
│   ├── schemas/
│   │   └── authSchemas.ts # Esquemas de validación
│   └── server.ts        # Punto de entrada
├── drizzle.config.ts    # Configuración de Drizzle
└── package.json
