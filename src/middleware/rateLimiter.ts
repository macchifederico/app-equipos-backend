import rateLimit from 'express-rate-limit';
import keys from '../keys';

// Rate limiter general para toda la API
export const apiLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutos por defecto
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // 100 requests por defecto
    message: {
        error: 'Demasiadas solicitudes desde esta IP. Intenta más tarde.',
        retryAfter: Math.ceil(parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') / 1000) // en segundos
    },
    standardHeaders: true, // Incluye headers `RateLimit-*` 
    legacyHeaders: false, // Desactiva headers `X-RateLimit-*`
    handler: (req, res) => {
        console.warn(`Rate limit exceeded for IP: ${req.ip} on ${req.path}`);
        res.status(429).json({
            error: 'Demasiadas solicitudes desde esta IP',
            message: 'Has excedido el límite de solicitudes. Intenta más tarde.',
            retryAfter: Math.ceil(parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') / 1000)
        });
    }
});

// Rate limiter específico para creación de jugadores
export const createPlayerLimiter = rateLimit({
    windowMs: parseInt(process.env.CREATE_PLAYER_WINDOW_MS || '60000'), // 1 minuto
    max: parseInt(process.env.CREATE_PLAYER_MAX_REQUESTS || '10'), // 10 creaciones por minuto
    message: {
        error: 'Demasiadas creaciones de jugadores',
        message: 'No puedes crear tantos jugadores tan rápido. Espera un momento.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        console.warn(`Create player rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            error: 'Límite de creación de jugadores excedido',
            message: 'Has creado demasiados jugadores muy rápido. Espera un minuto.',
            retryAfter: Math.ceil(parseInt(process.env.CREATE_PLAYER_WINDOW_MS || '60000') / 1000)
        });
    }
});

// Rate limiter para eliminación de jugadores
export const deletePlayerLimiter = rateLimit({
    windowMs: parseInt(process.env.DELETE_PLAYER_WINDOW_MS || '60000'), // 1 minuto
    max: parseInt(process.env.DELETE_PLAYER_MAX_REQUESTS || '5'), // 5 eliminaciones por minuto
    message: {
        error: 'Demasiadas eliminaciones de jugadores',
        message: 'No puedes eliminar tantos jugadores tan rápido. Espera un momento.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        console.warn(`Delete player rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            error: 'Límite de eliminación de jugadores excedido',
            message: 'Has eliminado demasiados jugadores muy rápido. Espera un minuto.',
            retryAfter: Math.ceil(parseInt(process.env.DELETE_PLAYER_WINDOW_MS || '60000') / 1000)
        });
    }
});

// Rate limiter para actualizaciones de equipos
export const updateTeamsLimiter = rateLimit({
    windowMs: parseInt(process.env.UPDATE_TEAMS_WINDOW_MS || '60000'), // 1 minuto
    max: parseInt(process.env.UPDATE_TEAMS_MAX_REQUESTS || '20'), // 20 actualizaciones por minuto
    message: {
        error: 'Demasiadas actualizaciones de equipos',
        message: 'No puedes actualizar los equipos tan frecuentemente. Espera un momento.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        console.warn(`Update teams rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            error: 'Límite de actualización de equipos excedido',
            message: 'Has actualizado los equipos demasiado rápido. Espera un minuto.',
            retryAfter: Math.ceil(parseInt(process.env.UPDATE_TEAMS_WINDOW_MS || '60000') / 1000)
        });
    }
});

// Rate limiter más permisivo para consultas (GET-like operations)
export const queryLimiter = rateLimit({
    windowMs: parseInt(process.env.QUERY_WINDOW_MS || '60000'), // 1 minuto
    max: parseInt(process.env.QUERY_MAX_REQUESTS || '50'), // 50 consultas por minuto
    message: {
        error: 'Demasiadas consultas',
        message: 'Has hecho demasiadas consultas muy rápido. Espera un momento.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        console.warn(`Query rate limit exceeded for IP: ${req.ip} on ${req.path}`);
        res.status(429).json({
            error: 'Límite de consultas excedido',
            message: 'Has hecho demasiadas consultas muy rápido. Espera un minuto.',
            retryAfter: Math.ceil(parseInt(process.env.QUERY_WINDOW_MS || '60000') / 1000)
        });
    }
});

// Rate limiter para desarrollo (más permisivo)
export const devLimiter = rateLimit({
    windowMs: 60000, // 1 minuto
    max: 1000, // 1000 requests por minuto (muy permisivo)
    message: {
        error: 'Rate limit en desarrollo',
        message: 'Límite de desarrollo alcanzado (muy alto, solo para debug)'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        console.warn(`Dev rate limit exceeded for IP: ${req.ip} on ${req.path}`);
        res.status(429).json({
            error: 'Límite de desarrollo excedido',
            message: 'Incluso en desarrollo has excedido el límite (1000 req/min). Esto indica un problema.',
            retryAfter: 60
        });
    }
});

// Factory function para crear rate limiters personalizados
export const createCustomLimiter = (options: {
    windowMs: number;
    max: number;
    message: string;
    logPrefix?: string;
}) => {
    return rateLimit({
        windowMs: options.windowMs,
        max: options.max,
        message: {
            error: options.message,
            retryAfter: Math.ceil(options.windowMs / 1000)
        },
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => {
            if (options.logPrefix) {
                console.warn(`${options.logPrefix} rate limit exceeded for IP: ${req.ip}`);
            }
            res.status(429).json({
                error: options.message,
                retryAfter: Math.ceil(options.windowMs / 1000)
            });
        }
    });
};