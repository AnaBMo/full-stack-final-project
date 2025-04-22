# 🍳 Cooking Safely – Backend

Este proyecto forma parte del sistema "Cooking Safely", diseñado para gestionar productos alimentarios y registrar recetas elaboradas, con trazabilidad y control de autenticación.

---

## 📦 Tecnologías utilizadas

- **Node.js + Express**
- **MongoDB Atlas + Mongoose**
- **Firebase Admin SDK** para autenticación
- **dotenv** para variables de entorno
- **Postman** para pruebas de API (https://documenter.getpostman.com/view/40947339/2sB2cd3ct9)

---

## 🔐 Autenticación

- La autenticación se gestiona con Firebase.
- Los usuarios se registran o inician sesión desde el frontend.
- El backend valida el `idToken` de Firebase y guarda una cookie segura `httpOnly`.

---

## 📚 Rutas principales (API REST)

### 📦 Productos (sin autenticación)
- `GET /products` – Obtener todos los productos
- `GET /products/:id` – Producto por ID
- `POST /products` – Crear producto
- `PUT /products/:id` – Actualizar producto
- `DELETE /products/:id` – Eliminar producto
- `GET /products/expiring-soon` – Productos que caducan pronto
- `GET /products/expired` – Productos caducados

### 🍳 Recetas (autenticación requerida, temporalmente desprotegido para pruebas)
- `POST /recipes` – Crear receta
- `GET /recipes` – Obtener todas las recetas
- `GET /recipes/:id` – Receta por ID
- `GET /recipes/date/:date` – Recetas por fecha de elaboración

---

## 🧪 Tests

Pruebas realizadas con Postman en fase de desarrollo.
Autenticación temporalmente desactivada para pruebas de recetas.

Próximos pasos: Realización de pruebas con **Jest** para los controladores y rutas.

---
