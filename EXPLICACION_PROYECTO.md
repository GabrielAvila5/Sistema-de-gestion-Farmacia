# Sistema de Gestión para Farmacia — Explicación del Proyecto

## 📋 Descripción General

Este proyecto es un **Sistema de Gestión Clínica y Administrativa** diseñado para una farmacia. Su objetivo principal es gestionar de forma integral las operaciones del negocio: control de inventario de productos farmacéuticos, registro de ventas, gestión de pacientes, citas médicas y usuarios del sistema.

El backend está construido como una **API REST** utilizando **Node.js** con el framework **Express**, y se conecta a una base de datos **MongoDB** mediante **Mongoose** como ODM (Object-Document Mapper).

---

## 🚀 Estado Actual del Proyecto

### ✅ Implementado

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| Estructura del proyecto | ✅ Completa | Arquitectura por capas bien organizada |
| Modelos de datos | ✅ Completos | Product, Sale, User, Patient, Appointment |
| CRUD de Productos | ✅ Funcional | Crear, listar, actualizar y eliminar productos |
| Registro de Ventas | ✅ Funcional | Crear ventas con transacciones atómicas de MongoDB |
| Validaciones | ✅ Implementadas | Validadores con `express-validator` para productos, usuarios y ventas |
| Manejo de errores | ✅ Global | Middleware centralizado de errores |
| Seguridad básica | ✅ Activa | Helmet para cabeceras HTTP, CORS habilitado |
| Encriptación de contraseñas | ✅ Activa | bcrypt con hash automático al guardar usuarios |
| Migración de datos | ✅ Disponible | Servicio para importar datos masivos desde archivos JSON |

### 🔲 Pendiente

| Módulo | Descripción |
|--------|-------------|
| Autenticación (Auth) | Middleware de JWT para proteger rutas (las dependencias ya están instaladas) |
| Rutas de Usuarios | Endpoints para registro, login y gestión de usuarios |
| Rutas de Pacientes | CRUD completo para gestionar pacientes |
| Rutas de Citas | Endpoints para agendar, consultar y cancelar citas |
| Frontend | Interfaz de usuario (aún no iniciado) |

---

## 🏗️ Estructura del Proyecto

```
Anti/
├── backend/
│   ├── .env                      ← Variables de entorno (puerto, URI de MongoDB, etc.)
│   ├── package.json              ← Dependencias y scripts del proyecto
│   └── src/
│       ├── server.js             ← Punto de entrada: conecta la BD e inicia el servidor
│       ├── app.js                ← Configuración de Express: middlewares y rutas
│       ├── config/
│       │   └── db.js             ← Conexión a MongoDB con Mongoose
│       ├── models/               ← Esquemas de datos (Mongoose)
│       │   ├── Product.js        ← Modelo de Producto
│       │   ├── Sale.js           ← Modelo de Venta
│       │   ├── User.js           ← Modelo de Usuario (con encriptación de contraseña)
│       │   ├── Patient.js        ← Modelo de Paciente (con historial clínico)
│       │   └── Appointment.js    ← Modelo de Cita Médica
│       ├── controllers/          ← Lógica de los endpoints (reciben peticiones HTTP)
│       │   ├── productController.js  ← CRUD de productos
│       │   └── saleController.js     ← Creación de ventas
│       ├── services/             ← Lógica de negocio compleja
│       │   ├── SaleService.js        ← Transacciones atómicas para ventas
│       │   └── MigrationService.js   ← Importación masiva de datos JSON
│       ├── routes/               ← Definición de rutas HTTP
│       │   ├── productRoutes.js  ← Rutas GET/POST/PUT/DELETE de productos
│       │   └── saleRoutes.js     ← Ruta POST de ventas
│       ├── validators/           ← Reglas de validación de datos
│       │   ├── product.validator.js  ← Validaciones de producto
│       │   ├── user.validator.js     ← Validaciones de usuario
│       │   └── index.js              ← Archivo de barril (re-exporta todo)
│       ├── middlewares/          ← Funciones intermedias reutilizables
│       │   ├── errorHandler.js       ← Manejo global de errores
│       │   └── validateRequest.js    ← Verifica errores de validación
│       ├── repositories/         ← (Reservado para futuras consultas a BD)
│       └── utils/                ← (Reservado para funciones utilitarias)
```

---

## 🔧 ¿Cómo Funciona?

### 1. Inicio del Servidor (`server.js`)
Cuando se ejecuta `npm run dev`, el sistema:
1. Carga las variables de entorno desde `.env` usando `dotenv`.
2. Establece la conexión con MongoDB llamando a `connectDB()`.
3. Levanta el servidor HTTP en el puerto configurado (por defecto `5000`).

### 2. Configuración de la App (`app.js`)
La aplicación Express se configura con los siguientes **middlewares** en este orden:
1. **`express.json()`** — Permite recibir datos JSON en el cuerpo de las peticiones.
2. **`cors()`** — Habilita peticiones desde otros dominios (necesario para el futuro frontend).
3. **`helmet()`** — Agrega cabeceras HTTP de seguridad automáticamente.
4. **`morgan('dev')`** — Registra cada petición HTTP en la consola para depuración.

Después monta las rutas:
- `GET/POST /api/products` → rutas de productos
- `POST /api/sales` → ruta de ventas

Al final, se coloca el middleware de manejo de errores (`errorHandler`).

### 3. Flujo de una Petición (ejemplo: crear un producto)

```
Cliente (Postman/Frontend)
    │
    │  POST /api/products  { name, sku, price, stock, category }
    ▼
productRoutes.js
    │
    │  1. productValidator  → Valida los campos requeridos
    │  2. validateRequest   → Si hay errores, responde 400
    │  3. createProduct     → Controlador que crea el producto
    ▼
productController.js
    │
    │  Verifica si ya existe un producto con el mismo SKU
    │  Crea el producto en MongoDB con Product.create()
    ▼
MongoDB → Guarda el documento y responde con el producto creado (201)
```

### 4. Flujo de una Venta (con transacción atómica)

```
Cliente
    │
    │  POST /api/sales  { user, items: [{ product, quantity }] }
    ▼
saleRoutes.js
    │
    │  1. saleValidator     → Valida usuario e ítems
    │  2. validateRequest   → Si hay errores, responde 400
    │  3. createSale        → Controlador que delega al servicio
    ▼
SaleService.js  (transacción de MongoDB)
    │
    │  Para cada ítem:
    │    ├─ Busca el producto
    │    ├─ Verifica stock suficiente
    │    ├─ Descuenta stock
    │    └─ Calcula subtotal
    │
    │  Crea el documento Sale con el total calculado
    │  Si todo es exitoso → commitTransaction()
    │  Si algo falla      → abortTransaction() (revierte todo)
    ▼
MongoDB → Venta registrada + stock actualizado atómicamente
```

---

## 🧱 ¿Por Qué Esta Arquitectura?

El proyecto sigue una **arquitectura por capas** (Layered Architecture), que es una de las más utilizadas en aplicaciones backend profesionales. Cada capa tiene una responsabilidad específica:

### Separación de Responsabilidades

| Capa | Carpeta | Responsabilidad |
|------|---------|-----------------|
| **Rutas** | `routes/` | Define los endpoints HTTP y encadena middlewares con controladores |
| **Validadores** | `validators/` | Declara las reglas de validación de datos de entrada |
| **Middlewares** | `middlewares/` | Funciones reutilizables que procesan peticiones antes de llegar al controlador |
| **Controladores** | `controllers/` | Recibe la petición HTTP, extrae datos, llama al servicio/modelo y responde |
| **Servicios** | `services/` | Contiene la lógica de negocio compleja (ej: transacciones de ventas) |
| **Modelos** | `models/` | Define la estructura de datos y reglas de la base de datos |
| **Configuración** | `config/` | Conexiones externas (base de datos, variables de entorno) |

### Ventajas de esta estructura:

1. **Mantenibilidad** — Cada archivo tiene una sola responsabilidad. Si necesitas cambiar la lógica de ventas, solo tocas `SaleService.js`, no las rutas ni los controladores.

2. **Escalabilidad** — Agregar un nuevo módulo (ej: pacientes) solo requiere crear sus archivos en cada capa sin modificar los existentes.

3. **Testabilidad** — Los servicios pueden probarse independientemente de las rutas y de la base de datos.

4. **Reutilización** — Los middlewares (`errorHandler`, `validateRequest`) se usan en todas las rutas sin duplicar código.

5. **Seguridad** — La validación ocurre *antes* del controlador, evitando que datos incorrectos lleguen a la lógica de negocio.

---

## 📦 Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| **Node.js** | — | Entorno de ejecución del servidor |
| **Express** | 5.2.1 | Framework web para crear la API REST |
| **MongoDB** | — | Base de datos NoSQL orientada a documentos |
| **Mongoose** | 9.2.1 | ODM para modelar datos y conectar con MongoDB |
| **bcryptjs** | 3.0.3 | Encriptación segura de contraseñas (hash + salt) |
| **jsonwebtoken** | 9.0.3 | Generación de tokens JWT (preparado para autenticación) |
| **express-validator** | 7.3.1 | Validación y saneamiento de datos de entrada |
| **helmet** | 8.1.0 | Cabeceras HTTP de seguridad |
| **cors** | 2.8.6 | Habilitar peticiones cross-origin |
| **morgan** | 1.10.1 | Registro de peticiones HTTP en consola |
| **dotenv** | 17.3.1 | Carga de variables de entorno desde `.env` |
| **nodemon** | 3.1.11 | Reinicio automático del servidor en desarrollo |

---

## 📡 Endpoints Disponibles

### Productos (`/api/products`)

| Método | Ruta | Descripción | Validación |
|--------|------|-------------|------------|
| `GET` | `/api/products` | Obtener todos los productos | No |
| `POST` | `/api/products` | Crear un producto nuevo | Sí (nombre, SKU, precio, stock, categoría) |
| `PUT` | `/api/products/:id` | Actualizar un producto por ID | No |
| `DELETE` | `/api/products/:id` | Eliminar un producto por ID | No |

### Ventas (`/api/sales`)

| Método | Ruta | Descripción | Validación |
|--------|------|-------------|------------|
| `POST` | `/api/sales` | Registrar una nueva venta | Sí (usuario, ítems con producto y cantidad) |

---

## 🗄️ Modelos de Datos

### Product (Producto)
Representa un medicamento o artículo de la farmacia.
- `name` — Nombre del producto (obligatorio)
- `description` — Descripción (opcional)
- `sku` — Código único del producto (obligatorio, único)
- `price` — Precio unitario (obligatorio, mínimo 0)
- `stock` — Cantidad en inventario (obligatorio, mínimo 0)
- `category` — Categoría (ej: analgésicos, antibióticos)
- `expiryDate` — Fecha de caducidad (opcional)

### Sale (Venta)
Registra cada transacción de venta.
- `user` — Referencia al usuario que realizó la venta
- `items[]` — Lista de productos vendidos (producto, cantidad, precio histórico)
- `totalAmount` — Total calculado de la venta
- `status` — Estado: `completed`, `cancelled`, o `refunded`

### User (Usuario)
Usuarios del sistema con roles.
- `name`, `email` (único), `password` (encriptado con bcrypt)
- `role` — Uno de: `admin`, `doctor`, `employee`
- Contraseña se encripta automáticamente antes de guardarse

### Patient (Paciente)
Registro de pacientes clínicos.
- `firstName`, `lastName`, `email` (único), `phone`, `dob`
- `history[]` — Historial clínico embebido (fecha, notas, diagnóstico, doctor)

### Appointment (Cita Médica)
Agenda de citas.
- `patient` — Referencia al paciente
- `doctor` — Referencia al usuario con rol doctor
- `date` — Fecha y hora de la cita
- `status` — `pending`, `completed`, o `cancelled`
- `reason` — Motivo de consulta

---

## ▶️ Cómo Ejecutar el Proyecto

```bash
# 1. Instalar dependencias
cd backend
npm install

# 2. Configurar variables de entorno
# Crear archivo .env con:
#   PORT=5000
#   MONGO_URI=mongodb+srv://...
#   NODE_ENV=development

# 3. Iniciar en modo desarrollo (reinicio automático con nodemon)
npm run dev

# 4. Iniciar en modo producción
npm start
```

---

*Documento generado el 25 de febrero de 2026.*
