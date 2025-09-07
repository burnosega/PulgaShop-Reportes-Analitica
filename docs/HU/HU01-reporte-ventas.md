# Reporte de Ventas

**Como administrador**, quiero obtener un reporte de ventas con filtrados respectivos para analizar ganancias.

---

## Criterios de Aceptación

### Criterio 1: Visualización básica del reporte
- **Dado que** el administrador quiere analizar las ventas  
- **Cuando** accedo al módulo de reportes de ventas  
- **Entonces** puedo ver un listado de ventas con las columnas: fecha, producto, cantidad, precio y total

### Criterio 2: Filtrado por rango de fechas
- **Dado que** el administrador quiere analizar un periodo específico  
- **Cuando** selecciono un rango de fechas y aplico el filtro  
- **Entonces** el reporte muestra únicamente las ventas dentro de ese rango

### Criterio 3: Filtrado por producto
- **Dado que** el administrador quiere analizar un producto específico  
- **Cuando** selecciono el producto y aplico el filtro  
- **Entonces** el reporte muestra solo las ventas de ese producto

---

## Definition of Done
- El módulo permite generar reportes con columnas básicas (fecha, producto, cantidad, precio, total)  
- Los filtros de fechas y productos funcionan correctamente  
- Los datos se muestran de manera clara y exportable (CSV o PDF)
