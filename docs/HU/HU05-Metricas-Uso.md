# Métricas de Uso

**Como técnico**, quiero monitorear las métricas de uso del microservicio de reportes (consultas, tiempo de respuesta, errores) para asegurar su disponibilidad, rendimiento y detectar problemas a tiempo.

---

## Criterios de Aceptación

### Criterio 1: Cantidad de consultas
- **Dado que** el microservicio recibe solicitudes a `/reportes/ventas` o `/reportes/actividad`  
- **Cuando** un técnico consulte las métricas de uso  
- **Entonces** el sistema debe mostrar la cantidad total de solicitudes procesadas en un rango de tiempo

### Criterio 2: Tiempo de respuesta promedio
- **Dado que** el microservicio procesa solicitudes de reportes  
- **Cuando** el técnico revise las métricas  
- **Entonces** el sistema debe mostrar el tiempo promedio de respuesta por consulta

### Criterio 3: Errores y fallos
- **Dado que** algunas solicitudes puedan fallar  
- **Cuando** el administrador técnico consulte las métricas de uso  
- **Entonces** el sistema debe mostrar el número de errores ocurridos en el rango de tiempo seleccionado

---

## Definition of Done
- Recolección de métricas implementada  
- Monitoreo de tiempos de respuesta  
- Registro de errores y fallos  
- Visualización de métricas  

---

**Política de seguridad / Autorización**
- Solo técnicos o administradores pueden acceder a métricas de uso del microservicio.  
- Información sensible sobre errores o tiempos de respuesta restringida según rol.  
- Intentos de consulta sin permisos se registran para auditoría.

**Tamaño:** M  
**Riesgo:** Medio (requiere un backend estable para la recoleccion de  metrica)
  
