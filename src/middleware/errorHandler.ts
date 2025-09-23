import { Request, Response, NextFunction } from 'express';
import keys from '../keys';

export interface CustomError extends Error {
    statusCode?: number;
    code?: string;
}

export const errorHandler = (
    error: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error:', {
        message: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
    });

    // Default error
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal server error';

    // Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
        statusCode = 400;
        message = 'Validation error';
    }

    // Sequelize unique constraint error
    if (error.name === 'SequelizeUniqueConstraintError') {
        statusCode = 409;
        message = 'Resource already exists';
    }

    // Sequelize foreign key constraint error
    if (error.name === 'SequelizeForeignKeyConstraintError') {
        statusCode = 400;
        message = 'Foreign key constraint violation';
    }

    // JWT errors
    if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (error.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    // Send error response
    const response: any = {
        error: message
    };

    // Include error details in development
    if (keys.nodeEnv === 'development') {
        response.details = {
            stack: error.stack,
            code: error.code
        };
    }

    res.status(statusCode).json(response);
};

export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        error: `Route ${req.originalUrl} not found`
    });
};

export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};