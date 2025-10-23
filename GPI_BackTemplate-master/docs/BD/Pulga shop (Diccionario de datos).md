|           |                 |              |          |       |                                      |   |
|-----------|-----------------|--------------|----------|-------|--------------------------------------|---|
| Tabla     |                 |              |          |       |                                      |   |
| Usuario   | Campo           | Tipo de Dato | Nulo     | Clave | Descripción                          |   |
|           | id_usuario      | INT          | Not Null | PK    | identificacion del usuario           |   |
|           | nombre          | STRING       | Not Null |       | nombre del usuario                   |   |
|           | rut             | STRING       | Not Null |       | Rutificador del usuario              |   |
|           | pais            | STRING       | Not Null |       | Pais del usuario                     |   |
|           | region          | STRING       | Not Null |       | Region de vivienda del usuario       |   |
|           | cuidad          | STRING       | Not Null |       | Cuidad de vivienda del usuario       |   |
|           | correo          | STRING       | Not Null |       | Correo del usuario                   |   |
|           | codigo_rol      | STRING       | Not Null |       | Administrador, usuario , analista    |   |
|           | fecha_creacion  | DATE         | Not Null |       | Fecha creacion de cuenta             |   |
|           |                 |              |          |       |                                      |   |
| Productos |                 |              |          |       |                                      |   |
|           | id_producto     | INT          | Not Null | PK    | identificador de producto            |   |
|           | nombre_producto | STRING       | Not Null |       | nombre del producto                  |   |
|           | categoria       | STRING       | Not Null |       | electronica , deporte,               |   |
|           | precio          | INT          | Not Null |       | precio del producto                  |   |
|           | stock           | INT          | Not Null |       | cantidada de productos disponible    |   |
|           | cant_ventas     | INT          | Not Null |       | cantidad de ventas de producto       |   |
|           | cant_busquedas  | INT          | Not Null |       | cantidad de busquedas al producto    |   |
|           |                 |              |          |       |                                      |   |
| Carrito   |                 |              |          |       |                                      |   |
|           | id_usuario      | INT          | Not Null | fk    | identificador de usuario             |   |
|           | id_producto     | INT          | Not Null | fk    | identificador de producto            |   |
|           | monto_total     | INT          | Not Null |       | monto total del carrito              |   |
|           | estado          | STRING       | Not Null |       | entregado , cancelado , en camino    |   |
|           | id_order        | INT          | Not Null |       | identificador de orden               |   |
|           | fecha           | DATE         | Not Null |       | fecha de creacion del carrito        |   |
|           |                 |              |          |       |                                      |   |
| Envio     |                 |              |          |       |                                      |   |
|           | id_usuario      | INT          | Not Null | FK    | identificador de usuario             |   |
|           | id_order        | INT          | Not Null | FK    | identificador de orden               |   |
|           | region          | STRING       | Not Null |       | region del usuario                   |   |
|           | cuidad          | STRING       | Not Null |       | cuidad del usaurio                   |   |
|           | direccion       | STRING       | Not Null |       | direccion del usuario                |   |
|           | estado          | STRING       | Not Null | FK    | emtregado. en camino , cancelado     |   |
|           | fecha_envio     | DATE         | Not Null |       | fecha de envio del producto          |   |
|           | fecha_entrega   | DATE         | Not Null |       | fecha de entrega del producto        |   |
|           |                 |              |          |       |                                      |   |
| Busqueda  |                 |              |          |       |                                      |   |
|           | id_busqueda     | INT          | Not null | PK    | identificador de busqueda            |   |
|           | id_usuario      | INT          | Not null | FK    | identificador de usuario             |   |
|           | producto        | STRING       | Not null |       | producto que busca el usuario        |   |
|           | fecha_busqueda  | DATE         | Not null |       | fecha en la que realiza una busqueda |   |
