# Visualización de Analíticas

**Como gerente de ventas**, quiero ver las analíticas de ventas en un dashboard con gráficos y tablas para poder interpretar fácilmente el rendimiento.

---

## Criterios de Aceptación

### Criterio 1: Visualización
- **Dado que** el usuario quiere analizar las ventas  
- **Cuando** accede al módulo de analítica  
- **Entonces** puede ver los datos en forma de gráficos y tablas

###Criterio 2: Visualización de tendencias por región

-**Dado que** el usuario desea identificar patrones geográficos

-**Cuando** se carga el dashboard

-**Entonces** se muestra un gráfico o tabla con la cantidad total de ventas o envíos agrupadas por región, evidenciando tendencias

---

## Definition of Done
- [ ] Existe un endpoint `/api/analytics/ventas` que entrega datos agregados (totales, tendencias, por región).
- [ ] El frontend muestra gráficos y tablas correctamente renderizados en el dashboard de analíticas.
- [ ] Los datos se actualizan con un desfase no mayor a 5 minutos respecto a la base de datos.
- [ ] Se incluye un gráfico o tabla de tendencias de ventas/envíos agrupadas por región.
- [ ] Se implementaron pruebas unitarias del endpoint y pruebas de integración con el frontend.
- [ ] La vista es responsiva y visualmente clara (validado en escritorio y móvil).


---

**Política de seguridad / Autorización**
- Solo gerentes de ventas o roles autorizados pueden acceder al dashboard.  
- Los gráficos y tablas muestran únicamente datos que el rol tiene derecho a consultar.  
- Intentos de acceso no autorizados se registran en logs de seguridad.

---

**Tamaño:** L  
**Riesgo:** Alto
