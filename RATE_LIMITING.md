# Rate Limiting Configuration

Este proyecto implementa rate limiting para proteger la API contra abuso y ataques DDoS.

## 🎯 Configuración por Endpoint

### General API
- **Límite:** 100 requests / 15 minutos por IP
- **Aplica a:** Todas las rutas `/api/*`

### Consultas (Query Operations)
- **Límite:** 50 requests / minuto por IP
- **Aplica a:** 
  - `POST /api/jugadores` (obtener jugadores)
  - `POST /api/jugadores/teams` (obtener equipos)

### Creación de Jugadores
- **Límite:** 10 requests / minuto por IP
- **Aplica a:** `POST /api/jugadores/create`

### Eliminación de Jugadores
- **Límite:** 5 requests / minuto por IP
- **Aplica a:** `POST /api/jugadores/delete`

### Actualización de Equipos
- **Límite:** 20 requests / minuto por IP
- **Aplica a:** `POST /api/jugadores/update`

## 🔧 Variables de Entorno

```env
# Rate Limiting Configuration (in milliseconds)
RATE_LIMIT_WINDOW_MS=900000       # 15 minutes - General API
RATE_LIMIT_MAX_REQUESTS=100       # Max requests per window

CREATE_PLAYER_WINDOW_MS=60000     # 1 minute
CREATE_PLAYER_MAX_REQUESTS=10     # Max player creations per minute

DELETE_PLAYER_WINDOW_MS=60000     # 1 minute
DELETE_PLAYER_MAX_REQUESTS=5      # Max player deletions per minute

UPDATE_TEAMS_WINDOW_MS=60000      # 1 minute
UPDATE_TEAMS_MAX_REQUESTS=20      # Max team updates per minute

QUERY_WINDOW_MS=60000             # 1 minute
QUERY_MAX_REQUESTS=50             # Max queries per minute
```

## 📊 Headers de Respuesta

Cuando un cliente hace una request, recibe estos headers informativos:

```http
RateLimit-Limit: 100
RateLimit-Remaining: 85
RateLimit-Reset: 1640995200
```

## 🚫 Respuesta cuando se excede el límite

```http
HTTP/1.1 429 Too Many Requests
RateLimit-Limit: 100
RateLimit-Remaining: 0
RateLimit-Reset: 1640995200

{
  "error": "Demasiadas solicitudes desde esta IP",
  "message": "Has excedido el límite de solicitudes. Intenta más tarde.",
  "retryAfter": 900
}
```

## 🔄 Diferencias por Ambiente

### Desarrollo
- Rate limiting muy permisivo (1000 req/min)
- Logs detallados para debugging
- Headers informativos habilitados

### Producción
- Rate limiting estricto según configuración
- Logs de seguridad
- Headers informativos habilitados

## 🛠️ Personalización

Para crear rate limiters personalizados, usa la función factory:

```typescript
import { createCustomLimiter } from '../middleware/rateLimiter';

const customLimiter = createCustomLimiter({
    windowMs: 60000, // 1 minuto
    max: 15, // 15 requests por minuto
    message: 'Límite personalizado excedido',
    logPrefix: 'CUSTOM'
});
```

## 📈 Monitoreo

Los logs de rate limiting aparecen en consola:

```
✓ Development rate limiting enabled (permissive)
WARN: Create player rate limit exceeded for IP: 192.168.1.100
WARN: Query rate limit exceeded for IP: 192.168.1.50 on /api/jugadores
```

## 🔍 Troubleshooting

### Cliente recibe muchos 429
1. Verificar que el frontend no esté haciendo requests duplicados
2. Revisar loops infinitos en el código cliente
3. Considerar aumentar límites en `.env`

### Rate limiting no funciona
1. Verificar que `express-rate-limit` esté instalado
2. Confirmar que los middlewares estén en el orden correcto
3. Revisar variables de entorno

### Performance issues
1. Rate limiting se ejecuta en memoria por defecto
2. Para múltiples instancias, considera usar Redis store
3. Monitorear uso de memoria del servidor