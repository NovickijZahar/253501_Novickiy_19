import { validationResult } from "express-validator";

export default (req, res, next) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()){
        console.log(errors.errors[0].msg);
        return res.status(400).json(errors.errors[0].msg);
    }

    next();
}