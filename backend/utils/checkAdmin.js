import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').split(' ')[1];

    if (token){
        try {
            const decoded = jwt.verify(token, 'secretkey');
            req.userId = decoded.id;
            req.token = token;

            if (decoded.role !== 'admin') {
                return res.status(403).json({
                    message: "Вы не являетесь админом"
                })
            }

            next();
        } catch (err) {
            return res.status(403).json({
                message: 'Нет доступа'
            });
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа'
        });
    }
}