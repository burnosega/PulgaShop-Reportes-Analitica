# Diseño de Base de Datos - Microservicio de Reportes y Analítica

## Tabla: Usuario
| Campo       | Tipo de Dato | Tamaño | Nulo     | Clave | Descripción                         |
|------------|-------------|-------|---------|-------|-------------------------------------|
| id_usuario | INT         | 11    | NOT NULL | PK    | Identificador único del usuario     |
| correo     | VARCHAR     | 100   | NOT NULL |       | Correo electrónico del usuario      |
| contraseña | VARCHAR     | 150   | NOT NULL |       | Contraseña encriptada               |
| creado     | VARCHAR     | 255   | NOT NULL |       | Fecha de creación                   |
| rol        | ENUM        | 100   | NOT NULL |       | admin, ...                          |
| id_metrica | INT         | 11    | NOT NULL | FK    | Identificador único de la métrica  |

## Tabla: Busquedas
| Campo        | Tipo de Dato | Tamaño | Nulo     | Clave | Descripción                                 |
|-------------|-------------|-------|---------|-------|---------------------------------------------|
| id_busqueda | INT         | 11    | NOT NULL | PK    | Identificador de búsqueda                  |
| id_usuario  | INT         | 11    | NOT NULL | FK    | Identificador único de usuario             |
| filtrado    | VARCHAR     | 50    | NOT NULL |       | Filtrado por búsquedas                      |
| recomendados| VARCHAR     | 255   | NOT NULL |       | Productos recomendados según búsqueda      |
| producto    | VARCHAR     | 255   | NOT NULL |       | Producto que se busca                       |

## Tabla: Orden
| Campo      | Tipo de Dato | Tamaño | Nulo     | Clave | Descripción                  |
|-----------|-------------|-------|---------|-------|------------------------------|
| id_orden  | INT         | 11    | NOT NULL | PK    | Identificador de orden       |
| estado    | ENUM        | 20    | NOT NULL |       | aprobado, cancelado, en espera |
| id_producto | INT       | 11    | NOT NULL |       | Identificador de producto   |
| precio    | DECIMAL     | 10    | NOT NULL |       | Precio del producto          |
| id_reporte| INT         | 11    | NOT NULL | FK    | Identificador de reporte     |

## Tabla: Pagos
| Campo       | Tipo de Dato | Tamaño | Nulo     | Clave | Descripción                  |
|------------|-------------|-------|---------|-------|------------------------------|
| id_pago    | INT         | 11    | NOT NULL | PK    | Identificador de pago        |
| id_orden   | INT         | 11    | NOT NULL | FK    | Identificador de orden       |
| monto_final| DECIMAL     | 10    | NOT NULL |       | Monto total del pago         |
| comprobante| VARCHAR     | 255   | NOT NULL |       | Comprobante del pago         |
| estado     | ENUM        | 20    | NOT NULL |       | aprobado, cancelado, en espera |

## Tabla: Envios
| Campo        | Tipo de Dato | Tamaño | Nulo     | Clave | Descripción                       |
|-------------|-------------|-------|---------|-------|-----------------------------------|
| id_envio    | INT         | 11    | NOT NULL | PK    | Identificador de envío           |
| direccion   | VARCHAR     | 255   | NOT NULL |       | Dirección de destino             |
| estado_envio| ENUM        | 20    | NOT NULL |       | entregado, en espera, en tránsito, cancelado, devuelto |
| fecha_envio | DATE        | -     | NOT NULL |       | Fecha que inicia el envío        |
| fecha_entrega| DATE       | -     | NOT NULL |       | Fecha de entrega                 |
| id_orden    | INT         | 11    | NOT NULL | FK    | Identificador de orden           |

## Tabla: Reportes Ventas
| Campo                 | Tipo de Dato | Tamaño   | Nulo     | Clave | Descripción                         |
|----------------------|-------------|---------|---------|-------|-------------------------------------|
| id_reporte           | INT         | 11      | NOT NULL | PK    | Identificador del reporte           |
| fecha_reporte        | DATE        | -       | NOT NULL |       | Fecha de generación                 |
| total_ventas         | DECIMAL     | 15,2    | NOT NULL |       | Monto total de ventas               |
| total_ordenes        | INT         | 11      | NOT NULL |       | Cantidad total de órdenes           |
| total_productos_vendidos | INT     | 11      | NOT NULL |       | Total de productos vendidos         |
| id_orden             | INT         | 11      | NOT NULL | FK    | Identificador único de orden        |

## Tabla: Reporte Actividad
| Campo                  | Tipo de Dato | Tamaño   | Nulo     | Clave | Descripción                        |
|------------------------|-------------|---------|---------|-------|------------------------------------|
| id_actividad          | INT         | 11      | NOT NULL | PK    | Identificador del reporte          |
| id_usuario             | INT         | 11      | NOT NULL | FK    | Identificador del usuario          |
| fecha_reporte          | DATE        | -       | NOT NULL |       | Fecha de generación                |
| usuarios_activos       | INT         | 11      | NOT NULL |       | Número de usuarios activos         |
| busquedas_realizadas   | INT         | 11      | NOT NULL |       | Total de búsquedas realizadas      |
| productos_recomendados | INT         | 11      | NOT NULL |       | Total de productos recomendados    |
| promedio_busquedas     | DECIMAL     | 10,2    | NULL     |       | Promedio de búsquedas por usuario |

## Tabla: Reporte Usuarios
| Campo               | Tipo de Dato | Tamaño  | Nulo     | Clave | Descripción                              |
|--------------------|-------------|--------|---------|-------|------------------------------------------|
| id_metrica          | INT         | 11     | NOT NULL | PK    | Identificador de la métrica             |
| fecha_reporte       | DATE        | -      | NOT NULL |       | Fecha de generación                      |
| nuevos_usuarios     | INT         | 11     | NOT NULL |       | Número de nuevos usuarios                |
| usuarios_totales    | INT         | 11     | NOT NULL |       | Total acumulado de usuarios              |
| roles_distribucion  | VARCHAR     | 500    | NULL     |       | Distribución de roles en formato JSON    |
| id_usuarios         | INT         | 11     | NOT NULL | FK    | Identificador de usuario                 |
