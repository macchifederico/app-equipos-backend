import { Request, Response, NextFunction } from 'express';

export interface ValidationRule {
    field: string;
    required?: boolean;
    type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

export const validateRequest = (rules: ValidationRule[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const errors: string[] = [];
        const data = { ...req.body, ...req.params, ...req.query };

        for (const rule of rules) {
            const value = data[rule.field];

            // Check if required field is missing
            if (rule.required && (value === undefined || value === null || value === '')) {
                errors.push(`${rule.field} is required`);
                continue;
            }

            // Skip validation if field is not required and not provided
            if (!rule.required && (value === undefined || value === null || value === '')) {
                continue;
            }

            // Type validation
            if (rule.type) {
                const actualType = Array.isArray(value) ? 'array' : typeof value;
                if (actualType !== rule.type) {
                    errors.push(`${rule.field} must be of type ${rule.type}`);
                    continue;
                }
            }

            // String validations
            if (rule.type === 'string' && typeof value === 'string') {
                if (rule.minLength && value.length < rule.minLength) {
                    errors.push(`${rule.field} must be at least ${rule.minLength} characters long`);
                }
                if (rule.maxLength && value.length > rule.maxLength) {
                    errors.push(`${rule.field} must not exceed ${rule.maxLength} characters`);
                }
            }

            // Number validations
            if (rule.type === 'number' && typeof value === 'number') {
                if (rule.min !== undefined && value < rule.min) {
                    errors.push(`${rule.field} must be at least ${rule.min}`);
                }
                if (rule.max !== undefined && value > rule.max) {
                    errors.push(`${rule.field} must not exceed ${rule.max}`);
                }
            }
        }

        if (errors.length > 0) {
            res.status(400).json({
                error: 'Validation failed',
                details: errors
            });
            return;
        }

        next();
    };
};

// Specific validation rules for common use cases
export const validateUserId = validateRequest([
    { field: 'id_usuario', required: true, type: 'number', min: 1 }
]);

export const validatePlayerCreation = validateRequest([
    { field: 'jugador', required: true, type: 'object' }
]);

export const validatePlayerDeletion = validateRequest([
    { field: 'id_jugador', required: true, type: 'number', min: 1 },
    { field: 'id_usuario', required: true, type: 'number', min: 1 }
]);

export const validateTeamUpdate = validateRequest([
    { field: 'teamOne', required: true, type: 'array' },
    { field: 'teamTwo', required: true, type: 'array' }
]);