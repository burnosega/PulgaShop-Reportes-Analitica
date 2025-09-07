# Actividad de Usuarios

**Como analista de datos**, quiero conocer las métricas de comportamiento sobre búsquedas de productos realizadas por usuarios para analizar patrones relevantes.

---

## Criterios de Aceptación

### Criterio 1: Filtrado por producto
- **Dado que** el analista quiere centrarse en un producto específico  
- **Cuando** seleccione el producto en el filtro  
- **Entonces** puede ver todas las búsquedas realizadas sobre ese producto

### Criterio 2: Identificación de patrones
- **Dado que** el analista quiere detectar la tendencia de búsqueda  
- **Cuando** visualiza el reporte generado de la semana  
- **Entonces** puede identificar patrones, tendencias de búsquedas y productos más populares en el periodo seleccionado

### Criterio 3: Comparación temporal de búsquedas
- **Dado que** el analista quiere observar cambios en la actividad de búsqueda  
- **Cuando** selecciona dos periodos de tiempo distintos y aplica la comparación  
- **Entonces** puede ver un reporte que muestre la variación en el número de búsquedas por producto entre ambos periodos

---

## Definition of Done
- Se implementa el registro de búsquedas en la base de datos  
- Los reportes permiten filtrar por producto y por periodos de tiempo  
- El sistema genera un dashboard con gráficos o tablas comparativas de tendencias  
