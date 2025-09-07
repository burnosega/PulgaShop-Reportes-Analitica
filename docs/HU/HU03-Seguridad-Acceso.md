# Seguridad de Acceso

**Como seguridad**, quiero que el acceso a los reportes sea restringido según roles para proteger la información del sistema.

---

## Criterios de Aceptación

### Criterio 1: Acceso solo a usuarios autorizados
- **Dado que** un usuario intenta acceder al módulo de reportes  
- **Cuando** no tiene un rol asignado con permisos  
- **Entonces** el sistema le muestra un mensaje de “Acceso denegado” y no permite visualizar información sensible

### Criterio 2: Visualización de reportes según rol
- **Dado que** un usuario inicia sesión en el sistema  
- **Cuando** accede al módulo de reportes  
- **Entonces** solo puede visualizar los reportes correspondientes a su rol

### Criterio 3: Registro de intentos de acceso no autorizado
- **Dado que** un usuario intenta acceder a un reporte sin tener permisos  
- **Cuando** el sistema detecta el intento  
- **Entonces** se registra el evento en un log de seguridad para futuras auditorías

### Criterio 4: Administración de roles
- **Dado que** el administrador necesita modificar los permisos de un rol  
- **Cuando** actualiza la configuración de roles en el sistema  
- **Entonces** los cambios se aplican inmediatamente y afectan el acceso de los usuarios en su siguiente inicio de sesión

---

## Definition of Done
- Control de acceso implementado  
- Visualización restringida por rol  
- Registro de intentos no autorizados  
- Gestión dinámica de roles asegurada  
