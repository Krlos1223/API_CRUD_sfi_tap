# Documentación de Endpoints

Esta documentación describe los endpoints disponibles en la API

## 1. Endpoint: Registro de Usuario

**Ruta:** `POST /Log/register`  
**Descripción:** Permite a los usuarios registrarse en la base de datos proporcionando sus datos personales y una contraseña.
**Método:** POST

**Cuerpo de la Solicitud:**
```json
{
  "nombre": "string",
  "apellido": "string",
  "cedula": "string",
  "fecha_de_nacimiento": "YYYY-MM-DD",
  "rol": "string",
  "nombre_de_usuario": "string",
  "contraseña": "string"
}
```

**Respuestas:**

Éxito (201 Created):
```json
{
  "message": "Usuario registrado exitosamente"
}
```
Error (400 Bad Request):
```json
{
  "message": "Error al registrar usuario",
  "error": "detalles del error"
}
```

**Ejemplo de Solicitud:**

curl -X POST http://localhost:3002/Log/register \
  -H "Content-Type: application/json" \
  -d '{
        "nombre": "Juan",
        "apellido": "Pérez",
        "cedula": "12345678",
        "fecha_de_nacimiento": "1990-01-01",
        "rol": "Administrador",
        "nombre_de_usuario": "juanperez",
        "contraseña": "miContraseñaSegura"
      }'


**Ejemplo de Respuesta Exitosa:**
```json
{
  "message": "Usuario registrado exitosamente"
}
```

## 2. Endpoint: inicio de sesion

**Ruta:** `POST /Log/login`

**Descripción:** Permite a los usuarios iniciar sesión proporcionando su nombre de usuario y contraseña.  

**Método:** POST

**Cuerpo de la Solicitud:**
```json
{
  "nombre_de_usuario": "string",
  "contraseña": "string"
}
```

**Respuestas:**
Éxito (200 OK):
```json
{
  "message": "Autenticación satisfactoria"
}
```

Error (400 Bad Request):
```json
{
  "message": "Usuario no encontrado" // o "Contraseña incorrecta"
}
```

Error (500 Internal Server Error):
```json
{
  "message": "Error en la autenticación",
  "error": "detalles del error"
}
```

**Ejemplo de Solicitud:**

curl -X POST http://localhost:3002/Log/login \
  -H "Content-Type: application/json" \
  -d '{
        "nombre_de_usuario": "usuarioExistente",
        "contraseña": "miContraseña"
      }'

**Ejemplo de Respuesta Exitosa:**
```json
{
  "message": "Autenticación satisfactoria"
}
```

## 3. Obtener Usuario por Nombre de Usuario

**Ruta:** `GET /Log/user/:nombre_de_usuario`

**Descripción:** Obtiene los datos de un usuario específico utilizando su nombre de usuario.

**Método:** GET

**Parametros de ruta**
`nombre_de_usuario` (string): El nombre de usuario del usuario que se desea obtener.

**Respuestas:**
Éxito (200 OK):
```json
{
  "usuario_id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "cedula": "12345678",
  "fecha_de_nacimiento": "1990-01-01",
  "rol": "Administrador",
  "nombre_de_usuario": "juanperez",
  "contraseña": "$2b$10$..."
}
```

Error (404 Not Found):
```json
{
  "message": "Usuario no encontrado"
}
```

Error (500 Internal Server Error):
```json
{
  "message": "Error al consultar usuario",
  "error": "detalles del error"
}
```

**Ejemplo de Solicitud:**

curl -X GET http://localhost:3002/Log/user/juanperez


**Ejemplo de Respuesta Exitosa:**
```json
{
  "usuario_id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "cedula": "12345678",
  "fecha_de_nacimiento": "1990-01-01",
  "rol": "Administrador",
  "nombre_de_usuario": "juanperez",
  "contraseña": "$2b$10$..."
}
```

## 4. Eliminar Usuario por Nombre de Usuario

**Ruta:** `DELETE /Log/user/:nombre_de_usuario`

**Descripción:** Elimina un usuario específico de la base de datos utilizando su nombre de usuario.

**Método:** DELETE

**Parametros de ruta**
`nombre_de_usuario` (string): El nombre de usuario del usuario que se desea eliminar.

**Respuestas:**
Éxito (200 OK):
```json
{
  "message": "Usuario eliminado exitosamente"
}
```

Error (404 Not Found):
```json
{
  "message": "Usuario no encontrado"
}
```

Error (500 Internal Server Error):
```json
{
  "message": "Error al eliminar usuario",
  "error": "detalles del error"
}
```

**Ejemplo de Solicitud:**

curl -X DELETE http://localhost:3002/Log/user/juanperez

**Ejemplo de Respuesta Exitosa:**
```json
{
  "message": "Usuario eliminado exitosamente"
}
```

## 5. Actualizar Usuario por Nombre de Usuario (PUT)

**Ruta:** `PUT /Log/user/:nombre_de_usuario`

**Descripción:** Actualiza todos los datos de un usuario específico utilizando su nombre de usuario. Reemplaza todos los campos proporcionados en la solicitud.

**Método:** PUT

**Parametros de ruta**
`nombre_de_usuario` (string): El nombre de usuario del usuario que se desea actualizar.

**Cuerpo de la Solicitud:**
```json
{
  "nombre": "string",
  "apellido": "string",
  "cedula": "string",
  "fecha_de_nacimiento": "YYYY-MM-DD",
  "rol": "string",
  "nombre_de_usuario": "string",
  "contraseña": "string"
}
```

**Respuestas:**
Éxito (200 OK):
```json
{
  "message": "Usuario actualizado exitosamente"
}
```

Error (404 Not Found):
```json
{
  "message": "Usuario no encontrado"
}
```

Error (500 Internal Server Error):
```json
{
  "message": "Error al actualizar usuario",
  "error": "detalles del error"
}
```

**Ejemplo de Solicitud:**

curl -X PUT http://localhost:3002/Log/user/juanperez \
  -H "Content-Type: application/json" \
  -d '{
        "nombre": "Carlos",
        "apellido": "Piedrahita",
        "cedula": "87654321",
        "fecha_de_nacimiento": "1992-05-15",
        "rol": "Usuario",
        "nombre_de_usuario": "carlosp",
        "contraseña": "nuevaContraseña"
      }'

**Ejemplo de Respuesta Exitosa:**
```json
{
  "message": "Usuario actualizado exitosamente"
}
```

## 6. Actualizar Usuario por Nombre de Usuario (PATCH)

**Ruta:** `PATCH /Log/user/:nombre_de_usuario`

**Descripción:** Actualiza algunos datos de un usuario específico utilizando su nombre de usuario. Solo los campos proporcionados en la solicitud serán actualizados.

**Método:** PATCH

**Parametros de ruta**
`nombre_de_usuario` (string): El nombre de usuario del usuario que se desea actualizar.

**Cuerpo de la Solicitud:**
```json
{
  "nombre": "string",
  "apellido": "string",  
}
```

**Respuestas:**
Éxito (200 OK):
```json
{
  "message": "Usuario actualizado exitosamente"
}
```

Error (404 Not Found):
```json
{
  "message": "Usuario no encontrado"
}
```

Error (500 Internal Server Error):
```json
{
  "message": "Error al actualizar usuario",
  "error": "detalles del error"
}
```

**Ejemplo de Solicitud:**

curl -X PATCH http://localhost:3002/Log/user/juanperez \
  -H "Content-Type: application/json" \
  -d '{
        "nombre": "Juan Carlos",
        "contraseña": "otraContraseña"
      }'

**Ejemplo de Respuesta Exitosa:**
```json
{
  "message": "Usuario actualizado exitosamente"
}
```




