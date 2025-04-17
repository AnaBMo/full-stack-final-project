# 📬 Cooking Safely – Documentación de API para Postman

Este documento describe las rutas disponibles en el backend del proyecto **Cooking Safely**, que pueden ser utilizadas y probadas fácilmente desde Postman.

---

## 🔐 AUTENTICACIÓN

### 👉 POST /register
Registra un nuevo usuario en Firebase Auth.

**Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "test1234"
}
```

### 👉 POST /login
Verifica el token recibido desde el frontend, y guarda el `idToken` como cookie httpOnly.

**Body (JSON):**
```json
{
  "idToken": "TOKEN_GENERADO_POR_FIREBASE_CLIENT_SDK"
}
```

### 👉 POST /logout
Elimina la cookie del usuario para cerrar la sesión.

---

## 📦 PRODUCTOS

### 👉 GET /products
Devuelve todos los productos registrados.

### 👉 GET /products/:productId
Devuelve un producto por ID.

### 👉 GET /products/category/:category
Filtra productos por categoría (cesta, caja, cono, corazón).

### 👉 POST /dashboard
Crea un nuevo producto.

**Body (JSON):**
```json
{
  "name": "Producto de prueba",
  "entryDate": "2025-04-15",
  "expirationDate": "2025-04-30",
  "batchNumber": "L12345",
  "deliveryNoteNumber": "DN789456"
}
```

### 👉 POST /dashboard/:productId
Actualiza un producto por ID.

### 👉 POST /dashboard/:productId/delete
Elimina un producto por ID.

### 👉 GET /products/expiring-soon
Devuelve productos cuya fecha de caducidad es en los próximos 7 días.

### 👉 GET /products/expired
Devuelve productos cuya fecha de caducidad ya ha pasado.

---

## 🍳 RECETAS

> ⚠️ Requieren autenticación por token (cuando esté activada)

### 👉 POST /recipes
Crea una nueva receta.

**Body (JSON):**
```json
{
  "name": "Tortilla de patata",
  "ingredients": [
    { "product": "ID_PRODUCTO_1" },
    { "product": "ID_PRODUCTO_2" }
  ],
  "preparationDate": "2025-04-20",
  "expirationDate": "2025-04-22",
  "createdBy": "uid-prueba"
}
```

### 👉 GET /recipes
Devuelve todas las recetas.

### 👉 GET /recipes/:recipeId
Devuelve una receta por ID.

### 👉 GET /recipes/date/:date
Devuelve recetas cuya fecha de elaboración coincida con la indicada (formato YYYY-MM-DD).

---

## ✅ NOTAS

- Todas las respuestas vienen en formato JSON.
- Las rutas protegidas estarán activadas una vez se valide la autenticación desde el frontend.
- Para probar rutas protegidas, asegúrate de enviar el token de Firebase desde el frontend o incluirlo en las cookies de Postman.