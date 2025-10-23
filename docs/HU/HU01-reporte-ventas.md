# Reporte de Ventas

**Como administrador**, quiero obtener un reporte de ventas con filtrados respectivos para ver ganancias.

---

###  Criterios de Aceptación

- [ ] **Visualización básica del reporte**: El reporte muestra las columnas:
      - Fecha
      - Producto
      - Cantidad
      - Precio unitario
      - Total

- [ ] **Filtrado por rango de fechas**:
      - Al seleccionar un rango de fechas y aplicar el filtro,
        el reporte se actualiza mostrando solo los registros correspondientes al rango.

- [ ] **Filtrado por producto**:
      - Al seleccionar un producto específico,
        se muestran únicamente las ventas asociadas a ese producto.

- [ ] **Tendencia de envío por región**:
      - El reporte incluye un gráfico o tabla que muestra la cantidad total de ventas/envíos agrupadas por región.
---

## Definition of Done
- [ ] Existe un endpoint funcional: **`/api/reportes/ventas`** que entrega los datos requeridos.
- [ ] El frontend muestra una tabla con las columnas: fecha, producto, cantidad, precio y total.
- [ ] El filtro por rango de fechas devuelve los datos correctamente.
- [ ] El filtro por producto actualiza el listado correctamente.
- [ ] El reporte permite exportar datos en formato **CSV** o **PDF**.
- [ ] Se muestra un gráfico o tabla con las tendencias de ventas agrupadas por región.
- [ ] El acceso al módulo está restringido solo a usuarios con rol **"administrador"** o **"autorizado"**.
- [ ] Los intentos de acceso no autorizado quedan registrados en la base de datos o log de auditoría.
- [ ] Las pruebas unitarias y de integración del módulo han sido implementadas y pasan exitosamente.


---

**Política de seguridad / Autorización**
- Solo administradores o roles autorizados pueden acceder al módulo de reportes de ventas.  
- Los filtros y visualizaciones se aplican únicamente a los datos permitidos según el rol.  
- Intentos de acceso no autorizado se registran para auditoría.

---

**Tamaño:** M  
**Riesgo:** Alto (depende de integracion de Base de Datos y filtros) 
