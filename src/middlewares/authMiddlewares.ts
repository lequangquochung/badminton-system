
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_REFRESH_SECRET;

function verifyToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    if (!JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret is not configured' });
    }

    jwt.verify(token, JWT_SECRET as string, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = decoded; // { id, role }
        next();
    });
}

function checkRole(roles: string[]) {
    return (req: any, res: any, next: any) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
}

module.exports = { verifyToken, checkRole };