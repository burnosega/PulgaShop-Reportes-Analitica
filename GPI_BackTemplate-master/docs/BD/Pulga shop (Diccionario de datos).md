# Base de Datos

## Tabla de Usuarios

| Campo            | Tipo de Dato | Nulo   | Descripción                      |
|------------------|--------------|--------|----------------------------------|
| id_usuario       | INT          | Not Null | Identificación del usuario       |
| nombre           | STRING       | Not Null | Nombre del usuario               |
| apellido         | STRING       | Not Null | Apellido del usuario             |
| nombre_usuario    | STRING       | Not Null | Nombre de usuario                |
| id_rol          | STRING       | Not Null | Cliente, vendedor, moderador, admin |

## Productos

| Campo            | Tipo de Dato | Nulo   | Descripción                      |
|------------------|--------------|--------|----------------------------------|
| id_producto      | INT          | Not Null | Identificador de producto        |
| nombre           | STRING       | Not Null | Nombre del producto              |
| categoria        | STRING       | Not Null | Electrónica, deporte             |
| precio           | INT          | Not Null | Precio del producto              |
| cantidad         | INT          | Not Null | Cantidad de productos disponible |

## Carrito

| Campo            | Tipo de Dato | Nulo   | Descripción                      |
|------------------|--------------|--------|----------------------------------|
| id_carrito       | INT          | Not Null | Identificador de carrito         |
| items            | STRING       | Not Null | Producto                         |

## Envío

| Campo            | Tipo de Dato | Nulo   | Descripción                      |
|------------------|--------------|--------|----------------------------------|
| region           | STRING       | Not Null | Región del envío del producto    |

## Búsqueda

| Campo            | Tipo de Dato | Nulo   | Descripción                      |
|------------------|--------------|--------|----------------------------------|
| nombre           | STRING       | Not Null | Nombre del producto              |
| id_usuario       | INT          | Not Null | Identificador de usuario         |
| id_producto      | INT          | Not Null | Producto                         |
| fecha            | DATE         | Not Null | Fecha de creación                |
| veces_buscado    | INT          | Not Null | Cantidad de veces que fue buscado el producto |
| veces_vendido     | INT          | Not Null | Cantidad de veces que fue vendido el producto  |
| cantidad         | INT          | Not Null | Cantidad de objetos (stock)     |

## Pagos

| Campo            | Tipo de Dato | Nulo   | Descripción                      |
|------------------|--------------|--------|----------------------------------|
| id_carrito       | STRING       | Not Null | Identificador de carrito         |
| estado           | STRING       | Not Null | Estado del pago                  |
