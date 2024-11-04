import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayloadWithUser extends jwt.JwtPayload {
    user: any;
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('x-auth-token');

    if (!token) {
        res.status(401).json({ msg: 'No token, authorization denied' });
        return;
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret') as JwtPayloadWithUser;
        (req as any).user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};